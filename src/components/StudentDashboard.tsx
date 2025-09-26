import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LessonCard } from '@/components/LessonCard';
import { 
  Trophy, 
  Target, 
  Flame, 
  Star, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Award,
  Zap,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudentData {
  firstName: string;
  lastName: string;
  grade: string;
  city: string;
  region: string;
  school: string;
}

interface StudentDashboardProps {
  studentData: StudentData;
}

const mockLessons = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations',
    subject: 'Mathematics',
    difficulty: 'beginner' as const,
    duration: 45,
    progress: 0,
    isCompleted: false,
    points: 100,
  },
  {
    id: '2',
    title: 'Basic Chemistry: Atoms and Molecules',
    description: 'Understanding the building blocks of matter',
    subject: 'Science',
    difficulty: 'beginner' as const,
    duration: 30,
    progress: 75,
    isCompleted: false,
    points: 80,
  },
  {
    id: '3',
    title: 'English Grammar: Tenses',
    description: 'Master past, present, and future tenses',
    subject: 'English',
    difficulty: 'intermediate' as const,
    duration: 35,
    progress: 100,
    isCompleted: true,
    points: 120,
  },
];

const achievements = [
  { name: 'First Lesson', description: 'Completed your first lesson', earned: true, type: 'peach' },
  { name: 'Math Master', description: 'Completed 5 math lessons', earned: true, type: 'mint' },
  { name: 'Weekly Warrior', description: 'Studied 7 days in a row', earned: false, type: 'lavender' },
  { name: 'Quiz Champion', description: 'Scored 100% on 3 quizzes', earned: false, type: 'peach' },
];

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ studentData }) => {
  const totalPoints = 850;
  const weeklyGoal = 1000;
  const currentStreak = 5;
  const completedLessons = 12;
  const progressPercentage = (totalPoints / weeklyGoal) * 100;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-slide-up">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Welcome back, {studentData.firstName}! 
          </h1>
          <div className="absolute -top-2 -right-8 animate-bounce-gentle">
            <Star className="w-6 h-6 text-secondary fill-current" />
          </div>
        </div>
        <p className="text-muted-foreground">
          Grade {studentData.grade} • {studentData.school} • {studentData.city}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-2">
              <Flame className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-success-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{completedLessons}</div>
            <div className="text-sm text-muted-foreground">Lessons Done</div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{Math.round(progressPercentage)}%</div>
            <div className="text-sm text-muted-foreground">Weekly Goal</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Weekly Progress
              </CardTitle>
              <CardDescription>
                {totalPoints} / {weeklyGoal} points this week
              </CardDescription>
            </div>
            <Badge className="bg-badge-mint text-badge-mint-foreground">
              {Math.round(progressPercentage)}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3 progress-bar" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Keep it up!</span>
            <span>{weeklyGoal - totalPoints} points to go</span>
          </div>
        </CardContent>
      </Card>

      {/* Today's Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Recommended for You
          </h2>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Schedule
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              {...lesson}
              onClick={() => console.log(`Navigate to lesson ${lesson.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            Achievements
          </CardTitle>
          <CardDescription>
            Your learning milestones and badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={cn(
                  "text-center p-4 rounded-xl border-2 transition-all duration-200",
                  achievement.earned
                    ? "border-success/20 bg-success/5 hover-lift"
                    : "border-muted bg-muted/5 opacity-60"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center",
                  achievement.earned
                    ? achievement.type === 'peach'
                      ? "bg-badge-peach text-badge-peach-foreground"
                      : achievement.type === 'mint'
                      ? "bg-badge-mint text-badge-mint-foreground"
                      : "bg-badge-lavender text-badge-lavender-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-sm font-medium text-foreground">
                  {achievement.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Button className="h-20 button-accent hover-glow">
          <div className="text-center">
            <BookOpen className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Practice Problems</div>
          </div>
        </Button>

        <Button className="h-20 button-primary hover-glow" variant="outline">
          <div className="text-center">
            <Clock className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Quick Quiz</div>
          </div>
        </Button>

        <Button className="h-20 bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-glow" variant="outline">
          <div className="text-center">
            <Trophy className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Leaderboard</div>
          </div>
        </Button>
      </div>
    </div>
  );
};