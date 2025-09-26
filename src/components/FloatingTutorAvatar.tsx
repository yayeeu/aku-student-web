import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import teacherAvatar from '@/assets/teacher-avatar.png';
interface FloatingTutorAvatarProps {
  isVisible: boolean;
  onToggleVisibility: () => void;
  isVoiceEnabled: boolean;
  onToggleVoice: () => void;
  isResponding?: boolean;
  className?: string;
}
export const FloatingTutorAvatar: React.FC<FloatingTutorAvatarProps> = ({
  isVisible,
  onToggleVisibility,
  isVoiceEnabled,
  onToggleVoice,
  isResponding = false,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 400,
    // Position near the chat controls
    y: 80 // Below the top navigation
  });
  
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({
    x: 0,
    y: 0
  });
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      dragStart.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;

      // Keep within viewport bounds
      const maxX = window.innerWidth - 120;
      const maxY = window.innerHeight - 120;
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);
  if (!isVisible) return null;
  return <div ref={dragRef} className={cn("fixed z-50 select-none", isDragging && "cursor-grabbing", !isDragging && "cursor-grab", className)} style={{
    left: `${position.x}px`,
    top: `${position.y}px`
  }} onMouseDown={handleMouseDown}>
      <div className={cn("relative transition-all duration-300 w-20 h-20")}>
        {/* Avatar Image */}
        <div className="relative w-full h-full">
          <img src={teacherAvatar} alt="Aku - AI Teacher" className={cn("w-full h-full object-cover rounded-full transition-transform duration-300", isResponding && "animate-bounce-gentle", "hover:scale-110")} />
          
          {/* Status indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-background" />
        </div>
      </div>
    </div>;
};