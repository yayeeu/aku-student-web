import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { synthesizeHeadTTS, playAudioBuffer } from "../../services/headttsClient";
import { AvatarWithLipSync } from "./AvatarWithLipSync";
import { ThreeErrorBoundary } from "../ThreeErrorBoundary";

export default function TalkDemo() {
  const [timeline, setTimeline] = useState<any>(null);
  const audioRef = useRef<{ ctx: AudioContext; t0: number } | null>(null);

  const speak = async (text: string) => {
    const { audioBuf, meta } = await synthesizeHeadTTS(text, {
      voice: "af_bella",
      language: "en-us",
      speed: 1
    });
    const { ctx, src, t0 } = await playAudioBuffer(audioBuf);
    audioRef.current = { ctx, t0 };
    setTimeline({ visemes: meta.visemes, vtimes: meta.vtimes, vdurations: meta.vdurations });

    src.onended = () => { audioRef.current = null; };
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <button onClick={() => speak("Hello! I am your AI tutor. How can I help you today?")}>
        Speak sample
      </button>
      <ThreeErrorBoundary
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <p className="text-gray-600">3D Avatar unavailable</p>
              <p className="text-xs text-gray-500">Install dependencies and refresh</p>
            </div>
          </div>
        }
      >
        <Canvas camera={{ position: [0, 1.5, 2.3], fov: 35 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 2]} intensity={0.8} />
          <OrbitControls enablePan={false} />
          <AvatarWithLipSync
            url="/models/aitutor.glb"
            timeline={timeline ?? undefined}
            getAudioTimeSec={() =>
              audioRef.current ? (audioRef.current.ctx.currentTime - audioRef.current.t0) : 0
            }
            gaze="camera"
          />
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
}
