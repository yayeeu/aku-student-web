import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Subject } from '@/types';
import { ROUTES } from '@/constants';
import { createRouteWithParams } from '@/utils';
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  subject: Subject;
  showTopics?: boolean;
  className?: string;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ 
  subject, 
  showTopics = true,
  className 
}) => {
  const subjectUrl = createRouteWithParams(ROUTES.COURSES, { subject: subject.id });

  return (
    <Link to={subjectUrl}>
      <Card className={cn(
        'card-elevated hover:shadow-lg transition-all duration-300 group cursor-pointer h-full',
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", subject.color)}>
                <subject.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {subject.title}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  Grade {subject.grade}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-sm leading-relaxed">
            {subject.description}
          </CardDescription>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Mastery Level</span>
              <span className="text-sm font-bold">{subject.masteryLevel}%</span>
            </div>
            <Progress value={subject.masteryLevel} className="h-2" />
            
            {showTopics && (
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{subject.topicsCompleted.current}/{subject.topicsCompleted.total} Topics Completed</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};