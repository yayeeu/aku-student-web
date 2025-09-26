import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, BookOpen, Target, TrendingUp, Calendar, Star, CheckCircle } from 'lucide-react';

interface StudentData {
  firstName: string;
  lastName: string;
  grade: string;
  city: string;
  region: string;
  school: string;
  hasConsent: boolean;
}

interface MyLearningProps {
  studentData: StudentData;
}

const learningActivities = [
  {
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    progress: 85,
    timeSpent: '2.5 hrs',
    lastAccessed: 'Today',
    status: 'In Progress',
    difficulty: 'Medium'
  },
  {
    subject: 'Physics',
    topic: 'Newton\'s Laws',
    progress: 100,
    timeSpent: '1.8 hrs',
    lastAccessed: 'Yesterday',
    status: 'Completed',
    difficulty: 'Hard'
  },
  {
    subject: 'Chemistry',
    topic: 'Chemical Bonding',
    progress: 60,
    timeSpent: '1.2 hrs',
    lastAccessed: '2 days ago',
    status: 'In Progress',
    difficulty: 'Medium'
  },
  {
    subject: 'English',
    topic: 'Essay Writing',
    progress: 40,
    timeSpent: '0.8 hrs',
    lastAccessed: '3 days ago',
    status: 'In Progress',
    difficulty: 'Easy'
  }
];

const weeklyGoals = [
  { goal: 'Complete 5 Math topics', progress: 80, current: 4, target: 5 },
  { goal: 'Study 10 hours this week', progress: 70, current: 7, target: 10 },
  { goal: 'Achieve 85% average score', progress: 90, current: 87, target: 85 }
];

const recentAchievements = [
  { title: 'Math Wizard', description: 'Completed 10 math topics', icon: '🧮', date: 'Today' },
  { title: 'Speed Learner', description: 'Finished lesson in record time', icon: '⚡', date: 'Yesterday' },
  { title: 'Consistent Learner', description: '7-day learning streak', icon: '🔥', date: '2 days ago' }
];

export const MyLearning: React.FC<MyLearningProps> = ({ studentData }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/20 text-success border border-success/30';
      case 'Medium': return 'bg-accent/20 text-accent-foreground border border-accent/30';
      case 'Hard': return 'bg-destructive/20 text-destructive border border-destructive/30';
      default: return 'bg-muted text-muted-foreground border border-border';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Completed' ? 'bg-success/20 text-success border border-success/30' : 'bg-primary/20 text-primary border border-primary/30';
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Learning</h1>
          <p className="text-muted-foreground">
            Track your progress and achievements, {studentData.firstName}
          </p>
        </div>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Start New Topic
        </Button>
      </div>

      {/* Learning Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3 hrs</div>
            <p className="text-xs text-muted-foreground">
              +2.5 hrs from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 topics this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +5% improvement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">
              Keep it going!
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Learning Activities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recent Learning Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningActivities.map((activity, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{activity.topic}</h4>
                      <Badge variant="secondary">{activity.subject}</Badge>
                      <Badge className={getDifficultyColor(activity.difficulty)}>
                        {activity.difficulty}
                      </Badge>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.timeSpent}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activity.lastAccessed}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={activity.progress} className="flex-1" />
                      <span className="text-sm font-medium">{activity.progress}%</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="sm:ml-4 w-full sm:w-auto">
                    Continue
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Weekly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.goal}</span>
                    <span className="text-muted-foreground">{goal.current}/{goal.target}</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                    <span className="text-xs text-muted-foreground">{achievement.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};