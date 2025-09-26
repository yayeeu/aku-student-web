import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Trophy, BarChart3, Award, Brain } from 'lucide-react';

import { PageProps } from '@/types';
import { useSubjects } from '@/hooks/useSubjects';
import { mockRecommendedActivities, mockLearningStats } from '@/data/mockData';
import { getUrlParam, createRouteWithParams } from '@/utils';
import { ERROR_MESSAGES, ROUTES } from '@/constants';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { TopicCard } from '@/components/common/TopicCard';
import { StatsCard } from '@/components/common/StatsCard';
import { ActivityCard } from '@/components/common/ActivityCard';
import { cn } from '@/lib/utils';

interface SubjectDetailProps extends PageProps {}

export const SubjectDetail: React.FC<SubjectDetailProps> = ({ studentData }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const subjectId = getUrlParam(searchParams, 'subject', 'mathematics');
  
  const { subjects, isLoading, error } = useSubjects();
  const subject = subjects.find(s => s.id === subjectId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading subject details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center p-6">
        <EmptyState
          title="Failed to load subject"
          description={error}
          action={{
            label: "Back to Courses",
            onClick: () => window.location.href = ROUTES.COURSES
          }}
        />
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center p-6">
        <EmptyState
          title={ERROR_MESSAGES.SUBJECT_NOT_FOUND}
          description="The subject you're looking for doesn't exist."
          action={{
            label: "Back to Courses",
            onClick: () => window.location.href = ROUTES.COURSES
          }}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-soft-surface">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-6">
              {/* Main Content */}
              <div className="flex-1 space-y-6">
                {/* Subject Header */}
                <Card className="card-elevated border-0 bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center", subject.color)}>
                          <subject.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h1 className="text-3xl font-bold text-foreground mb-2">{subject.title}</h1>
                          <p className="text-muted-foreground mb-3">{subject.description}</p>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-sm">
                              Grade {subject.grade}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {subject.completedTopics}/{subject.totalTopics} Topics Completed
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-foreground">{subject.overallMastery}%</div>
                        <div className="text-sm text-muted-foreground">Overall Mastery</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Progress value={subject.overallMastery} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {subject.topics?.map((topic) => (
                    <TopicCard 
                      key={topic.id} 
                      topic={topic} 
                      subjectId={subjectId} 
                    />
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-80 space-y-6">
                {/* Daily Challenge */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Today's Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Trophy className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Practice Linear Equations</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Solve 10 linear equation problems to get 50 points
                      </p>
                      <div className="text-xs text-muted-foreground mb-4">
                        0 out of 10 done • You'll get +50 points
                      </div>
                      <Button className="w-full button-primary">
                        Start Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* My Numbers */}
                <StatsCard 
                  title="My Numbers"
                  icon={BarChart3}
                  stats={mockLearningStats}
                />

                {/* What You Should Practice */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      What You Should Practice
                    </CardTitle>
                    <CardDescription>
                      Based on your {subject.title} progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockRecommendedActivities.map((activity) => (
                      <ActivityCard 
                        key={activity.id} 
                        activity={activity}
                        onClick={() => {
                          // Navigate to practice page with relevant topic
                          const practiceUrl = createRouteWithParams(ROUTES.PRACTICE, { 
                            subject: subjectId, 
                            topic: 'linear-equations' // Default topic, could be made dynamic
                          });
                          navigate(practiceUrl);
                        }}
                      />
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};