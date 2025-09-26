import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { ProgressSidebar } from '@/components/dashboard/ProgressSidebar';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';
import { useStudentData } from '@/hooks/useStudentData';
import { SAMPLE_ACHIEVEMENTS } from '@/constants/achievements';
import { StudentData } from '@/types';

interface HomePageProps {
  studentData: StudentData;
  isAvatarVisible?: boolean;
  onToggleAvatarVisibility?: () => void;
  isAvatarMuted?: boolean;
  onToggleAvatarMute?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  studentData,
  isAvatarVisible = true,
  onToggleAvatarVisibility = () => {},
  isAvatarMuted = false,
  onToggleAvatarMute = () => {}
}) => {
  const { messages, isTyping, sendMessage } = useChat();
  const { getInitials } = useStudentData();

  return (
    <div className="min-h-screen bg-soft-surface">
      {/* Welcome Banner */}
      <WelcomeBanner 
        firstName={studentData.firstName}
        initials={getInitials()}
      />

      {/* Main Content Area - Chat + Right Sidebar */}
      <div className="flex gap-6 px-6 pb-6">
        {/* Chat Section - Fills remaining space */}
        <div className="flex-1 min-w-0">
          <Card className="card-elevated flex flex-col min-h-[600px]">
            {/* Chat Header */}
            <CardHeader className="border-b border-border flex-shrink-0">
              <ChatHeader
                isAvatarVisible={isAvatarVisible}
                onToggleAvatarVisibility={onToggleAvatarVisibility}
                isAvatarMuted={isAvatarMuted}
                onToggleAvatarMute={onToggleAvatarMute}
              />
            </CardHeader>

            {/* Chat Messages - Fixed height with scroll */}
            <ScrollArea className="h-[500px] p-4">
              <div className="space-y-4">
                {messages.map(message => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    studentInitials={getInitials()}
                  />
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                      A
                    </div>
                    <div className="bg-muted rounded-2xl p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Chat Input - Fixed at bottom */}
            <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
          </Card>
        </div>

        {/* Right Sidebar - No separate scroll, part of main page flow */}
        <ProgressSidebar
          achievements={SAMPLE_ACHIEVEMENTS}
        />
      </div>
    </div>
  );
};