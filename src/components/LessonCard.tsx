import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, BookOpen, Clock, Star, Trophy, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  progress: number; // 0-100
  isCompleted: boolean;
  points: number;
  className?: string;
  onClick?: () => void;
}

const difficultyConfig = {
  beginner: {
    color: 'bg-badge-mint text-badge-mint-foreground',
    icon: Star,
  },
  intermediate: {
    color: 'bg-badge-peach text-badge-peach-foreground',
    icon: Trophy,
  },
  advanced: {
    color: 'bg-badge-lavender text-badge-lavender-foreground',
    icon: Trophy,
  },
};

const subjectConfig = {
  Mathematics: { color: 'bg-primary/10 text-primary', emoji: '🔢' },
  Science: { color: 'bg-accent/10 text-accent', emoji: '🔬' },
  English: { color: 'bg-secondary/10 text-secondary', emoji: '📚' },
  History: { color: 'bg-success/10 text-success', emoji: '📜' },
  Geography: { color: 'bg-muted text-muted-foreground', emoji: '🌍' },
};

export const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  description,
  subject,
  difficulty,
  duration,
  progress,
  isCompleted,
  points,
  className,
  onClick,
}) => {
  const DifficultyIcon = difficultyConfig[difficulty].icon;
  const subjectStyle = subjectConfig[subject as keyof typeof subjectConfig] || subjectConfig.Mathematics;

  return (
    <Card 
      className={cn(
        "card-elevated hover-lift cursor-pointer transition-all duration-200 relative overflow-hidden",
        isCompleted && "ring-2 ring-success/20",
        className
      )}
      onClick={onClick}
    >
      {/* Completion Badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-medium">
            <CheckCircle className="w-5 h-5 text-success-foreground" />
          </div>
        </div>
      )}

      {/* Progress Bar at Top */}
      {progress > 0 && !isCompleted && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
          <div 
            className="h-full bg-gradient-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={cn("badge-style", subjectStyle.color)}>
                {subjectStyle.emoji} {subject}
              </Badge>
              <Badge className={cn("badge-style", difficultyConfig[difficulty].color)}>
                <DifficultyIcon className="w-3 h-3 mr-1" />
                {difficulty}
              </Badge>
            </div>
            <CardTitle className="text-lg leading-tight">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>

        {/* Lesson Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            <span>{points} pts</span>
          </div>
        </div>

        {/* Progress Section */}
        {progress > 0 && !isCompleted && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 progress-bar" />
          </div>
        )}

        {/* Action Button */}
        <Button 
          className={cn(
            "w-full",
            isCompleted 
              ? "bg-success hover:bg-success/90 text-success-foreground" 
              : progress > 0 
                ? "button-primary" 
                : "button-accent"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Review Lesson
            </>
          ) : progress > 0 ? (
            <>
              <PlayCircle className="w-4 h-4 mr-2" />
              Continue Learning
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4 mr-2" />
              Start Lesson
            </>
          )}
        </Button>
      </CardContent>

      {/* Decorative Elements */}
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-primary opacity-5 rounded-full" />
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-accent opacity-5 rounded-full" />
    </Card>
  );
};