import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Target, Star } from 'lucide-react';

interface WelcomeBannerProps {
  firstName: string;
  level: number;
  initials: string;
  avatarSrc?: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ 
  firstName, 
  level,
  initials, 
  avatarSrc 
}) => {
  return (
    <div className="px-6 py-6">
      <Card className="bg-gradient-hero text-white border-0 shadow-strong overflow-hidden relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-4 border-white/20">
                <AvatarImage src={avatarSrc} />
                <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  Welcome back, {firstName}!
                </h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>Level {level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>12 Achievements</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm mt-1">
                  Ready to continue learning? Your AI tutor Aku is here to help.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-white/80 text-sm mb-1">Today's Goal</div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                <Target className="w-4 h-4" />
                <span className="font-medium">3/5 Lessons</span>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/10 rounded-full" />
      </Card>
    </div>
  );
};