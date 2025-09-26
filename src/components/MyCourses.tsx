import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star, Trophy, Brain, BarChart3, Award } from 'lucide-react';

import { PageProps } from '@/types';
import { useSubjects } from '@/hooks/useSubjects';
import { mockRecommendedActivities, mockLearningStats, mockBadges } from '@/data/mockData';
import { calculateOverallMastery } from '@/utils';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { SubjectCard } from '@/components/common/SubjectCard';
import { StatsCard } from '@/components/common/StatsCard';
import { ActivityCard } from '@/components/common/ActivityCard';

interface MyCoursesProps extends PageProps {}

export const MyCourses: React.FC<MyCoursesProps> = ({ studentData }) => {
  const { subjects, isLoading, error } = useSubjects();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your courses..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center p-6">
        <EmptyState
          title="Failed to load courses"
          description={error}
          action={{
            label: "Try Again",
            onClick: () => window.location.reload()
          }}
        />
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center p-6">
        <EmptyState
          title="No courses available"
          description="It looks like you don't have any courses yet. Check back later!"
        />
      </div>
    );
  }

  const overallMastery = calculateOverallMastery(subjects);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-soft-surface">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-6">
              {/* Main Content */}
              <div className="flex-1 space-y-6">
                {/* Overall Learning Progress */}
                <Card className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-strong">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">How Much You Know</h2>
                        <p className="text-white/90 mb-4">Great job, {studentData.firstName}! Keep learning!</p>
                        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                          <div 
                            className="bg-white h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${overallMastery}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold">{overallMastery}%</div>
                        <div className="text-white/80 text-sm">You Know This Much</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subjects.map((subject) => (
                    <SubjectCard 
                      key={subject.id} 
                      subject={subject}
                      showTopics={true}
                    />
                  ))}
                </div>

                {/* Practice Suggestions */}
                <Card className="card-elevated border-2 border-primary bg-gradient-to-r from-primary/5 to-accent/5">
                  <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Brain className="w-5 h-5" />
                      What You Should Practice
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      We picked these just for you based on what you're learning
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockRecommendedActivities.map((activity) => (
                      <ActivityCard 
                        key={activity.id} 
                        activity={activity}
                        onClick={() => console.log('Activity clicked:', activity.title)}
                      />
                    ))}
                  </CardContent>
                </Card>
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
                      <h4 className="font-semibold mb-1">Practice Fractions</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Do 10 fraction problems to get 50 points
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

                {/* My Achievements */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-secondary" />
                      My New Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockBadges.map((badge, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${badge.color}`}>
                          {badge.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{badge.name}</div>
                          <div className="text-xs text-muted-foreground">{badge.description}</div>
                        </div>
                      </div>
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