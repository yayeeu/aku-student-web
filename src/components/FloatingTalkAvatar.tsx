import React, { useState, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { cn } from '@/lib/utils';
import { AvatarWithLipSync } from '@/components/avatar/AvatarWithLipSync';
import { synthesizeHeadTTS, playAudioBuffer } from '@/services/headttsClient';
import { ThreeErrorBoundary } from '@/components/ThreeErrorBoundary';

interface FloatingTalkAvatarProps {
  isVisible: boolean;
  isVoiceEnabled: boolean;
  className?: string;
}

export const FloatingTalkAvatar: React.FC<FloatingTalkAvatarProps> = ({
  isVisible,
  isVoiceEnabled,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [timeline, setTimeline] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<{ ctx: AudioContext; t0: number } | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
  
  // Responsive avatar size based on screen size
  const getAvatarSize = () => {
    const width = window.innerWidth;
    if (width < 640) return 240; // Mobile: half size
    if (width < 1024) return 320; // Tablet: 2/3 size
    return 480; // Desktop: full size
  };
  
  const [avatarSize, setAvatarSize] = useState(480); // Default to desktop size
  
  // Smart initial positioning
  const getInitialPosition = (size: number) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      x: Math.max(20, width - size - 20), // 20px margin from edges
      y: Math.max(80, Math.min(height - size - 20, 120)) // Below nav, above fold
    };
  };
  
  const [position, setPosition] = useState({ x: 40, y: 80 }); // Default position
  
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({
    x: 0,
    y: 0
  });
  const mouseStart = useRef({
    x: 0,
    y: 0
  });

  // Unified event handling for mouse and touch
  const getEventCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent default touch behaviors
    setIsMouseDown(true);
    const coords = getEventCoordinates(e);
    mouseStart.current = coords;
    
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      dragStart.current = {
        x: coords.x - rect.left,
        y: coords.y - rect.top
      };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => handleStart(e);
  const handleTouchStart = (e: React.TouchEvent) => handleStart(e);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (isMouseDown) {
      const coords = 'touches' in e ? 
        { x: e.touches[0].clientX, y: e.touches[0].clientY } : 
        { x: e.clientX, y: e.clientY };
      
      const deltaX = Math.abs(coords.x - mouseStart.current.x);
      const deltaY = Math.abs(coords.y - mouseStart.current.y);
      
      // Start dragging if moved more than 5 pixels
      if (!isDragging && (deltaX > 5 || deltaY > 5)) {
        setIsDragging(true);
      }
      
      if (isDragging) {
        const newX = coords.x - dragStart.current.x;
        const newY = coords.y - dragStart.current.y;

        // Keep within viewport bounds with current avatar size
        const maxX = window.innerWidth - avatarSize;
        const maxY = window.innerHeight - avatarSize;
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => handleMove(e);
  const handleTouchMove = (e: TouchEvent) => handleMove(e);

  const handleEnd = () => {
    setIsMouseDown(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => handleEnd();
  const handleTouchEnd = () => handleEnd();

  // Auto-speak welcome message when component mounts and voice is enabled (only once)
  const speakWelcomeMessage = React.useCallback(async () => {
    if (isVoiceEnabled && !isSpeaking && !hasSpokenWelcome) {
      setIsSpeaking(true);
      setHasSpokenWelcome(true); // Mark as spoken to prevent repeats
      
      try {
        const { audioBuf, meta } = await synthesizeHeadTTS("Hello! I'm Aku, your AI tutor. I'm here to help you with your studies!", {
          language: "en-us",
          speed: 1
        });
        const { ctx, src, t0 } = await playAudioBuffer(audioBuf);
        audioRef.current = { ctx, t0 };
        setTimeline({ visemes: meta.visemes, vtimes: meta.vtimes, vdurations: meta.vdurations });

        src.onended = () => { 
          audioRef.current = null; 
          setTimeline(null);
          setIsSpeaking(false);
        };
      } catch (error) {
        console.error('Speech synthesis failed:', error);
        setIsSpeaking(false);
      }
    }
  }, [isVoiceEnabled, isSpeaking, hasSpokenWelcome]);

  // Handle mouse and touch events
  React.useEffect(() => {
    if (isMouseDown) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isMouseDown, isDragging]);

  // Initialize size and position on mount, handle window resize
  React.useEffect(() => {
    const initializeAvatar = () => {
      const newSize = getAvatarSize();
      setAvatarSize(newSize);
      setPosition(getInitialPosition(newSize));
    };

    const handleResize = () => {
      const newSize = getAvatarSize();
      setAvatarSize(newSize);
      
      // Adjust position if avatar is now outside viewport
      setPosition(prevPos => {
        const maxX = window.innerWidth - newSize;
        const maxY = window.innerHeight - newSize;
        return {
          x: Math.max(0, Math.min(prevPos.x, maxX)),
          y: Math.max(0, Math.min(prevPos.y, maxY))
        };
      });
    };

    // Initialize on mount
    initializeAvatar();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Auto-speak on mount when avatar becomes visible and voice is enabled (only once)
  React.useEffect(() => {
    if (isVisible && isVoiceEnabled && !hasSpokenWelcome) {
      // Add small delay to ensure avatar is fully loaded
      const timer = setTimeout(() => {
        speakWelcomeMessage();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isVoiceEnabled, hasSpokenWelcome, speakWelcomeMessage]);

  // Debug visibility state
  React.useEffect(() => {
    console.log('FloatingTalkAvatar visibility changed:', isVisible);
  }, [isVisible]);

  if (!isVisible) return null;

  // Calculate head-only drag area (positioned where head appears in original view)
  const headSize = Math.round(avatarSize * 0.3); // 30% of container for head area
  const headOffsetX = Math.round((avatarSize - headSize) / 2); // Center horizontally  
  const headOffsetY = Math.round(avatarSize * 0.2); // Position where head appears in 3D scene

  return (
    <div 
      className="fixed z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${avatarSize}px`,
        height: `${avatarSize}px`
      }}
    >
      {/* 3D Avatar Canvas - Full size but not draggable */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <ThreeErrorBoundary>
          <Canvas 
            camera={{ position: [0, 1.6, 1.2], fov: 35 }}
            className="w-full h-full rounded-full"
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[1, 2, 1]} intensity={1} />
            <pointLight position={[0, 1.5, 0]} intensity={0.5} />
            
            <React.Suspense fallback={
              <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.2]} />
                <meshStandardMaterial color="lightblue" />
              </mesh>
            }>
              <group position={[0, -1, 0]} scale={[1, 1, 1]}>
                <AvatarWithLipSync
                  url="/models/aitutor.glb"
                  timeline={timeline ?? undefined}
                  getAudioTimeSec={() =>
                    audioRef.current ? (audioRef.current.ctx.currentTime - audioRef.current.t0) : 0
                  }
                  gaze="camera"
                />
              </group>
            </React.Suspense>
          </Canvas>
        </ThreeErrorBoundary>
      </div>

      {/* Head-only drag area - smaller, positioned over the head */}
      <div
        ref={dragRef}
        className={cn(
          "absolute select-none rounded-full",
          isDragging && "cursor-grabbing", 
          !isDragging && "cursor-grab",
          className
        )}
        style={{
          left: `${headOffsetX}px`,
          top: `${headOffsetY}px`,
          width: `${headSize}px`,
          height: `${headSize}px`,
          backgroundColor: 'transparent'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
};
