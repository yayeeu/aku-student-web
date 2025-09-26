import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Trophy, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Achievement } from '@/constants/achievements';
import { PracticeRecommendations } from './PracticeRecommendations';
interface ProgressSidebarProps {
  achievements: Achievement[];
}
export const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  achievements
}) => {
  return <div className="flex-shrink-0 w-80 space-y-6">
      {/* Practice Recommendations Section */}
      <PracticeRecommendations />

      {/* Recent Achievements */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="w-5 h-5 text-secondary" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm", achievement.type === 'peach' && "bg-badge-peach text-badge-peach-foreground", achievement.type === 'mint' && "bg-badge-mint text-badge-mint-foreground", achievement.type === 'lavender' && "bg-badge-lavender text-badge-lavender-foreground")}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{achievement.name}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
            </div>)}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        
        
        
      </div>
    </div>;
};