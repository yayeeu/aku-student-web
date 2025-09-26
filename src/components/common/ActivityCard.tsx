import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { RecommendedActivity } from '@/types';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: RecommendedActivity;
  onClick?: () => void;
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  onClick,
  className 
}) => {
  return (
    <div 
      className={cn(
        'flex items-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          <activity.icon className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium group-hover:text-primary transition-colors mb-1">
            {activity.title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {activity.duration}
            </span>
            <span>{activity.questions} questions</span>
          </div>
        </div>
      </div>
    </div>
  );
};