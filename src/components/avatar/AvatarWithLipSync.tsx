import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type VisemeEvent = { id: string; t: number; d: number }; // id, start(ms), duration(ms)

type Gaze =
  | "none"                 // do nothing
  | "forward"              // look straight ahead (camera direction)
  | "camera"               // always look at camera position
  | "up"                   // look straight up
  | { target: [number, number, number] }; // custom world target

const OCULUS_TO_RPM: Record<string, string | null> = {
  aa: "viseme_aa",
  E: "viseme_E",
  I: "viseme_I",
  O: "viseme_O",
  U: "viseme_U",
  PP: "viseme_PP",
  SS: "viseme_SS",
  TH: "viseme_TH",
  CH: "viseme_CH",
  FF: "viseme_FF",
  kk: "viseme_kk",
  nn: "viseme_nn",
  RR: "viseme_RR",
  DD: "viseme_DD",
  sil: null
};

export function AvatarWithLipSync({
  url,
  timeline,         // { visemes: string[], vtimes: number[], vdurations: number[] }
  getAudioTimeSec,   // () => current audio time in seconds (AudioContext.currentTime - t0)
  gaze = "forward"   // gaze direction control
}: {
  url: string;
  timeline?: { visemes: string[]; vtimes: number[]; vdurations: number[] };
  getAudioTimeSec?: () => number;
  gaze?: Gaze;
}) {
  const gltf = useGLTF(url) as any;
  const root = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  // Debug logging
  React.useEffect(() => {
    console.log('AvatarWithLipSync loaded:', { url, gltf: !!gltf?.scene });
    if (gltf?.scene) {
      console.log('GLB scene:', gltf.scene);
    }
  }, [gltf, url]);

  // Filter to show only head parts
  useEffect(() => {
    gltf.scene.traverse((o: any) => {
      if (!o.isMesh) return;
      const keep = ["Head","HeadTop_End","EyeLeft","LeftEye","RightEye","EyeRight","Teeth","Hair","Beard","Glasses","Headwear"];
      o.visible = keep.some(k => (o.name||"").includes(k));
    });
  }, [gltf]);

  // Find head and neck bones for gaze control
  useEffect(() => {
    if (!gltf?.scene) return;
    
    gltf.scene.traverse((object: any) => {
      if (object.isBone) {
        const name = object.name.toLowerCase();
        if (name.includes('head') && !headBone.current) {
          headBone.current = object;
          originalHeadRotation.current.copy(object.rotation);
          console.log('Found head bone:', object.name);
        }
        if (name.includes('neck') && !neckBone.current) {
          neckBone.current = object;
          originalNeckRotation.current.copy(object.rotation);
          console.log('Found neck bone:', object.name);
        }
      }
    });
  }, [gltf]);

  // Gather all meshes with morph targets (typ. "Wolf3D_Head")
  const morphMeshes = useMemo(() => {
    const arr: THREE.Mesh[] = [];
    gltf.scene.traverse((obj: any) => {
      if (obj.isMesh && obj.morphTargetDictionary && obj.morphTargetInfluences) {
        arr.push(obj);
      }
    });
    return arr;
  }, [gltf]);

  // Build mapping from viseme name -> { mesh, index } for quick writes
  const visemeTargets = useMemo(() => {
    const map: Record<string, { mesh: THREE.Mesh; index: number }[]> = {};
    for (const mesh of morphMeshes) {
      const dict = mesh.morphTargetDictionary as Record<string, number>;
      for (const [oculus, rpmName] of Object.entries(OCULUS_TO_RPM)) {
        if (!rpmName) continue;
        if (dict[rpmName] !== undefined) {
          if (!map[oculus]) map[oculus] = [];
          map[oculus].push({ mesh, index: dict[rpmName] });
        }
      }
      // Helpful fallback: if your mesh uses ARKit names, map "jawOpen" to neutral mouth open, etc.
    }
    return map;
  }, [morphMeshes]);

  // Convert arrays into a compact event list
  const events = useMemo<VisemeEvent[] | null>(() => {
    if (!timeline) return null;
    const { visemes, vtimes, vdurations } = timeline;
    return visemes.map((id, i) => ({ id, t: vtimes[i] ?? 0, d: vdurations[i] ?? 80 }));
  }, [timeline]);

  // State refs
  const activeRef = useRef<{ id: string; startMs: number; endMs: number } | null>(null);
  const lastTimeRef = useRef(0);
  
  // Gaze control refs
  const headBone = useRef<THREE.Bone | null>(null);
  const neckBone = useRef<THREE.Bone | null>(null);
  const originalHeadRotation = useRef<THREE.Euler>(new THREE.Euler());
  const originalNeckRotation = useRef<THREE.Euler>(new THREE.Euler());

  // Helper to zero all morphs quickly
  const zeroAll = () => {
    for (const mesh of morphMeshes) {
      const infl = mesh.morphTargetInfluences!;
      for (let i = 0; i < infl.length; i++) infl[i] = infl[i] * 0.7; // decay
    }
  };

  useFrame(() => {
    // Handle lip sync animation
    if (events && getAudioTimeSec) {
      const nowMs = getAudioTimeSec() * 1000;
      lastTimeRef.current = nowMs;

      // find current event (linear scan is fine; you can index by time for longer clips)
      let current: VisemeEvent | undefined;
      for (let i = 0; i < events.length; i++) {
        const e = events[i];
        if (nowMs >= e.t && nowMs < e.t + e.d) { current = e; break; }
      }

      zeroAll();

      if (current && visemeTargets[current.id]) {
        const targets = visemeTargets[current.id];
        // ease in/out within the event window
        const p = (nowMs - current.t) / Math.max(1, current.d);
        const weight = smoothStep(0, 1, Math.sin(Math.PI * p)); // soft bell curve
        for (const { mesh, index } of targets) {
          mesh.morphTargetInfluences![index] = Math.max(
            mesh.morphTargetInfluences![index] || 0,
            weight
          );
        }
      }
    }

    // Handle gaze control
    if (gaze !== "none" && (headBone.current || neckBone.current)) {
      let targetPosition = new THREE.Vector3();
      
      if (gaze === "camera") {
        targetPosition.copy(camera.position);
      } else if (gaze === "forward") {
        targetPosition.set(0, 0, 5); // Look forward
      } else if (gaze === "up") {
        targetPosition.set(0, 5, 0); // Look up
      } else if (typeof gaze === "object" && gaze.target) {
        targetPosition.set(...gaze.target);
      }

      // Apply gaze to head bone
      if (headBone.current && gaze !== "forward") {
        const headWorldPos = new THREE.Vector3();
        headBone.current.getWorldPosition(headWorldPos);
        
        const direction = new THREE.Vector3().subVectors(targetPosition, headWorldPos).normalize();
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1), // Default forward direction
          direction
        );
        
        // Mix with original rotation for natural movement
        const mixFactor = 0.3; // Subtle adjustment
        headBone.current.quaternion.slerp(targetQuaternion, mixFactor);
      }
    }
  });

  return <primitive ref={root} object={gltf.scene} />;
}

function smoothStep(a: number, b: number, t: number) {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

// Preload the GLB model
useGLTF.preload("/models/aitutor.glb");
