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

interface HomePageProps {
  userId?: string;
  isAvatarVisible?: boolean;
  onToggleAvatarVisibility?: () => void;
  isAvatarMuted?: boolean;
  onToggleAvatarMute?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  userId,
  isAvatarVisible = true,
  onToggleAvatarVisibility = () => {},
  isAvatarMuted = false,
  onToggleAvatarMute = () => {}
}) => {
  const { messages, isTyping, sendMessage } = useChat();
  const { studentData, isLoading, error, getInitials, getFullName } = useStudentData(userId);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Unable to load your data</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show nothing if no student data (shouldn't happen with proper session management)
  if (!studentData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-soft-surface">
      {/* Welcome Banner */}
      <WelcomeBanner 
        firstName={studentData.firstName}
        level={studentData.student_competency_level_theta}
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