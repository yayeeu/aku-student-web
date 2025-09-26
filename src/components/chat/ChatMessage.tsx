import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChatMessage as ChatMessageType } from '@/types';
import teacherAvatar from '@/assets/teacher-avatar.png';
import studentAvatar from '@/assets/student-avatar.png';

interface ChatMessageProps {
  message: ChatMessageType;
  studentInitials: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, studentInitials }) => {
  const isUser = message.type === 'user';

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage 
          src={isUser ? studentAvatar : teacherAvatar} 
          alt={isUser ? "Student" : "Aku"} 
        />
        <AvatarFallback className={cn(
          isUser ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
        )}>
          {isUser ? studentInitials : 'A'}
        </AvatarFallback>
      </Avatar>
      <div className={cn(
        "max-w-[70%] rounded-2xl p-3 relative",
        isUser ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
      )}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div className={cn(
          "text-xs mt-1",
          isUser ? "text-accent-foreground/70" : "text-muted-foreground"
        )}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};