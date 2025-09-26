import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Play, Target } from 'lucide-react';
import { Topic } from '@/types';
import { ROUTES } from '@/constants';
import { createRouteWithParams } from '@/utils';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: Topic;
  subjectId: string;
  className?: string;
}

export const TopicCard: React.FC<TopicCardProps> = ({ 
  topic, 
  subjectId, 
  className 
}) => {
  const lessonsUrl = createRouteWithParams(ROUTES.LESSONS, { 
    subject: subjectId, 
    topic: topic.id 
  });
  const practiceUrl = createRouteWithParams(ROUTES.PRACTICE, { 
    subject: subjectId, 
    topic: topic.id 
  });

  return (
    <Card className={cn(
      'card-elevated hover:shadow-lg transition-all duration-300 group cursor-pointer',
      topic.isCompleted ? 'border-green-200 bg-green-50/50' : '',
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {topic.isCompleted && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {topic.name}
              </CardTitle>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {topic.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Mastery Level</span>
            <span className="text-sm font-bold">{topic.masteryLevel}%</span>
          </div>
          <Progress value={topic.masteryLevel} className="h-2" />
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{topic.lessonsCompleted.current} Lessons Completed</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={lessonsUrl}>
              <Play className="w-4 h-4 mr-1" />
              Lessons
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={practiceUrl}>
              <Target className="w-4 h-4 mr-1" />
              Practice
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};