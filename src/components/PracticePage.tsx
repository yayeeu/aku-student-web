import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Target,
  Clock,
  CheckCircle,
  Star,
  Trophy,
  Brain,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSubjects } from '@/hooks/useSubjects';
import { usePractice } from '@/hooks/usePractice';
import { getUrlParam } from '@/utils';
import { ROUTES, PRACTICE_TYPE_CONFIGS } from '@/constants';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';

export const PracticePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const topicId = getUrlParam(searchParams, 'topic', 'linear-equations');
  const subjectId = getUrlParam(searchParams, 'subject', 'mathematics');
  
  const { subjects } = useSubjects();
  const { exercises, isLoading, error, completedCount, totalPoints } = usePractice(topicId);
  
  const subject = subjects.find(s => s.id === subjectId);
  const topic = subject?.topics?.find(t => t.id === topicId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading practice exercises..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center p-6">
        <EmptyState
          title="Failed to load practice exercises"
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
            <Card className="card-elevated border-0 bg-gradient-to-r from-blue-50 to-purple-50 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {topic?.name || 'Topic'} - Practice
                    </h1>
                    <p className="text-muted-foreground">Strengthen your skills with targeted practice exercises</p>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold text-foreground">{totalPoints}</span>
                      <span className="text-sm text-muted-foreground">points earned</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {completedCount} of {exercises.length} exercises completed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practice Exercises */}
            <div className="grid gap-6">
              {exercises.map((practice) => {
                const typeConfig = PRACTICE_TYPE_CONFIGS[practice.type as keyof typeof PRACTICE_TYPE_CONFIGS];
                
                return (
                  <Card 
                    key={practice.id} 
                    className={cn(
                      "card-elevated transition-all duration-300 hover:shadow-lg cursor-pointer",
                      practice.isCompleted ? "border-green-200 bg-green-50/50" : ""
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Icon & Status */}
                        <div className="flex-shrink-0">
                          {practice.isCompleted ? (
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                          ) : (
                            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", typeConfig.color)}>
                              <typeConfig.icon className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{practice.title}</h3>
                            <Badge className={cn("text-white text-xs", typeConfig.color)}>
                              {typeConfig.label}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{practice.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {practice.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {practice.questions} questions
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {practice.points} points
                            </div>
                          </div>

                          {practice.isCompleted && practice.score && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-foreground">Your Score:</span>
                                <span className={cn(
                                  "text-sm font-bold",
                                  practice.score >= 90 ? "text-green-500" :
                                  practice.score >= 80 ? "text-yellow-500" : "text-orange-500"
                                )}>
                                  {practice.score}%
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <div className="flex-shrink-0">
                          {practice.isCompleted ? (
                            <div className="space-y-2">
                              <Button variant="outline" className="w-full">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Review
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full">
                                Try Again
                              </Button>
                            </div>
                          ) : (
                            <Button size="lg">
                              <Target className="w-4 h-4 mr-2" />
                              Start Practice
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