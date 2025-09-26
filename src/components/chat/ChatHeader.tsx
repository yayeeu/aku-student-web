import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardTitle } from '@/components/ui/card';
import { EyeOff, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import teacherAvatar from '@/assets/teacher-avatar.png';

interface ChatHeaderProps {
  isAvatarVisible?: boolean;
  onToggleAvatarVisibility?: () => void;
  isAvatarMuted?: boolean;
  onToggleAvatarMute?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isAvatarVisible = true,
  onToggleAvatarVisibility = () => {},
  isAvatarMuted = false,
  onToggleAvatarMute = () => {}
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={teacherAvatar} alt="Aku - AI Teacher" />
          <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">Aku - Your Teacher</CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Ready to Help</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleAvatarVisibility} 
          className={cn("transition-colors", !isAvatarVisible && "bg-muted text-muted-foreground")} 
          title={isAvatarVisible ? "Hide Avatar" : "Show Avatar"}
        >
          <EyeOff className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleAvatarMute} 
          className={cn("transition-colors", isAvatarMuted && "bg-muted text-muted-foreground")} 
          title={isAvatarMuted ? "Unmute Avatar" : "Mute Avatar"}
        >
          <VolumeX className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};