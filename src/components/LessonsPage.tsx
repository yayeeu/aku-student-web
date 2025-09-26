import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Play,
  CheckCircle,
  Lock,
  Clock,
  FileText,
  Video,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSubjects } from '@/hooks/useSubjects';
import { useLessons } from '@/hooks/useLessons';
import { getUrlParam } from '@/utils';
import { ROUTES } from '@/constants';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';

const sampleLessons = {
  'linear-equations': [
    {
      id: 1,
      title: 'Introduction to Linear Equations',
      type: 'video',
      duration: '12 min',
      isCompleted: true,
      description: 'Learn the basics of linear equations and their properties'
    },
    {
      id: 2,
      title: 'Solving Single Variable Equations',
      type: 'interactive',
      duration: '18 min',
      isCompleted: true,
      description: 'Practice solving equations with one variable'
    },
    {
      id: 3,
      title: 'Graphing Linear Equations',
      type: 'video',
      duration: '15 min',
      isCompleted: true,
      description: 'Understand how to graph linear equations on a coordinate plane'
    },
    {
      id: 4,
      title: 'Word Problems with Linear Equations',
      type: 'practice',
      duration: '20 min',
      isCompleted: true,
      description: 'Apply linear equations to solve real-world problems'
    },
    {
      id: 5,
      title: 'Systems of Linear Equations',
      type: 'video',
      duration: '22 min',
      isCompleted: true,
      description: 'Learn to solve systems with multiple linear equations'
    },
    {
      id: 6,
      title: 'Advanced Linear Applications',
      type: 'interactive',
      duration: '25 min',
      isCompleted: true,
      description: 'Master complex applications of linear equations'
    },
    {
      id: 7,
      title: 'Linear Inequalities',
      type: 'video',
      duration: '16 min',
      isCompleted: false,
      description: 'Explore linear inequalities and their solutions'
    },
    {
      id: 8,
      title: 'Review and Assessment',
      type: 'practice',
      duration: '30 min',
      isCompleted: false,
      description: 'Comprehensive review of all linear equation concepts'
    }
  ]
};

const lessonTypeConfig = {
  video: { icon: Video, color: 'bg-red-500', label: 'Video' },
  interactive: { icon: BookOpen, color: 'bg-blue-500', label: 'Interactive' },
  practice: { icon: FileText, color: 'bg-green-500', label: 'Practice' }
};

export const LessonsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const topicId = getUrlParam(searchParams, 'topic', 'linear-equations');
  const subjectId = getUrlParam(searchParams, 'subject', 'mathematics');
  
  const { subjects } = useSubjects();
  const { lessons, isLoading, error, completedCount } = useLessons(topicId);
  
  const subject = subjects.find(s => s.id === subjectId);
  const topic = subject?.topics?.find(t => t.id === topicId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading lessons..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center p-6">
        <EmptyState
          title="Failed to load lessons"
          description={error}
          action={{
            label: "Back to Subject",
            onClick: () => window.location.href = `${ROUTES.COURSES}?subject=${subjectId}`
          }}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-soft-surface">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {topic?.name || 'Topic'} - Lessons
                  </h1>
                  <p className="text-muted-foreground">Complete all lessons to master this topic</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{completedCount} lessons completed</div>
                  <Progress value={(completedCount / lessons.length) * 100} className="w-32 h-2 mt-2" />
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="space-y-4">
              {lessons.map((lesson, index) => {
                const typeConfig = lessonTypeConfig[lesson.type as keyof typeof lessonTypeConfig];
                const isLocked = index > 0 && !lessons[index - 1].isCompleted;
                
                return (
                  <Card 
                    key={lesson.id} 
                    className={cn(
                      "card-elevated transition-all duration-300",
                      lesson.isCompleted ? "border-green-200 bg-green-50/50" : "",
                      isLocked ? "opacity-60" : "hover:shadow-lg cursor-pointer"
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Lesson Number & Status */}
                        <div className="flex-shrink-0">
                          {lesson.isCompleted ? (
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                          ) : isLocked ? (
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                              <Lock className="w-6 h-6 text-muted-foreground" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                              {lesson.id}
                            </div>
                          )}
                        </div>

                        {/* Lesson Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{lesson.title}</h3>
                            <Badge className={cn("text-white text-xs", typeConfig.color)}>
                              <typeConfig.icon className="w-3 h-3 mr-1" />
                              {typeConfig.label}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{lesson.description}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex-shrink-0">
                          {isLocked ? (
                            <Button variant="outline" disabled>
                              <Lock className="w-4 h-4 mr-2" />
                              Locked
                            </Button>
                          ) : lesson.isCompleted ? (
                            <Button variant="outline">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          ) : (
                            <Button>
                              <Play className="w-4 h-4 mr-2" />
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};