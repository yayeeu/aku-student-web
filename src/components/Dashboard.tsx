import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, BookOpen, Clock, Star, TrendingUp, Trophy, Target, Brain, Award, Calendar, Users, Activity, Zap, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStudentData } from '@/hooks/useStudentData';

interface DashboardProps {
  userId?: string;
}
const sidebarNavigation = [{
  title: 'My Progress',
  description: 'See how you are doing',
  icon: BarChart3,
  isActive: true
}, {
  title: 'My Scores',
  description: 'Check your test results',
  icon: Trophy,
  isActive: false
}, {
  title: 'Study Time',
  description: 'Track your learning hours',
  icon: Clock,
  isActive: false
}, {
  title: 'My Growth',
  description: 'See your improvement',
  icon: TrendingUp,
  isActive: false
}];
const keyMetrics = [{
  icon: BookOpen,
  value: '32',
  label: 'Lessons Done',
  subtitle: 'out of 47 lessons',
  color: 'text-purple-600',
  bgColor: 'bg-purple-50',
  iconColor: 'text-purple-600'
}, {
  icon: Clock,
  value: '24h 32m',
  label: 'Study Time',
  subtitle: 'this month',
  color: 'text-orange-600',
  bgColor: 'bg-orange-50',
  iconColor: 'text-orange-600'
}, {
  icon: Star,
  value: '87%',
  label: 'Your Score',
  subtitle: 'in all subjects',
  color: 'text-blue-600',
  bgColor: 'bg-blue-50',
  iconColor: 'text-blue-600'
}, {
  icon: Zap,
  value: '7',
  label: 'Days in a Row',
  subtitle: 'Keep it up!',
  color: 'text-green-600',
  bgColor: 'bg-green-50',
  iconColor: 'text-green-600'
}];
const weeklyData = [{
  week: 'Week 3',
  proficiency: 65
}, {
  week: 'Week 4',
  proficiency: 72
}, {
  week: 'Week 5',
  proficiency: 78
}, {
  week: 'Week 6',
  proficiency: 82
}];
const masteryDistribution = [{
  label: 'I Know This Well',
  percentage: 45,
  color: 'bg-green-500'
}, {
  label: 'I Am Learning',
  percentage: 35,
  color: 'bg-blue-500'
}, {
  label: 'Need More Practice',
  percentage: 20,
  color: 'bg-orange-500'
}];
export const Dashboard: React.FC<DashboardProps> = ({
  userId
}) => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const { studentData, isLoading, error } = useStudentData(userId);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !studentData) {
    return (
      <div className="min-h-screen bg-soft-surface flex items-center justify-center">
        <div className="text-center max-w-md">
          <h3 className="text-lg font-semibold text-foreground mb-2">Unable to load dashboard</h3>
          <p className="text-muted-foreground mb-4">{error || 'No data available'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return <div className="min-h-screen bg-soft-surface">
      <div className="flex">
        {/* Sidebar */}
        

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent text-white p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BarChart3 className="w-8 h-8" />
                <div>
                  <h1 className="text-3xl font-bold mb-2">My Learning Progress</h1>
                  <p className="text-white/90">See how well you are doing and celebrate your wins!</p>
                </div>
              </div>
              <div className="text-right">
                
                
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Course Selection */}
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Choose What to See</CardTitle>
                    <CardDescription>
                      Pick a subject to see details, or choose "All Subjects" to see everything together
                    </CardDescription>
                  </div>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="english">English Literature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyMetrics.map((metric, index) => <Card key={index} className="card-elevated hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", metric.bgColor)}>
                        <metric.icon className={cn("w-6 h-6", metric.iconColor)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className={cn("text-2xl font-bold", metric.color)}>{metric.value}</div>
                      <div className="font-medium text-foreground">{metric.label}</div>
                      <div className="text-sm text-muted-foreground">{metric.subtitle}</div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Proficiency Growth */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    My Weekly Growth
                  </CardTitle>
                  <CardDescription>
                    See how you are getting better each week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between px-4">
                    <div className="w-full max-w-lg mx-auto">
                      {/* Y-axis labels */}
                      <div className="flex flex-col-reverse h-48 absolute left-4 text-xs text-muted-foreground">
                        <span>0</span>
                        <span className="mt-6">20</span>
                        <span className="mt-6">40</span>
                        <span className="mt-6">60</span>
                        <span className="mt-6">80</span>
                      </div>
                      
                      {/* Chart area */}
                      <div className="ml-8 h-48 relative border-b border-l border-border">
                        <svg className="w-full h-full" viewBox="0 0 400 200">
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="hsl(var(--primary))" />
                              <stop offset="100%" stopColor="hsl(var(--accent))" />
                            </linearGradient>
                          </defs>
                          <polyline points="50,140 150,120 250,110 350,100" fill="none" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                          {weeklyData.map((point, index) => <circle key={index} cx={50 + index * 100} cy={200 - point.proficiency * 2} r="4" fill="hsl(var(--primary))" />)}
                        </svg>
                      </div>
                      
                      {/* X-axis labels */}
                      <div className="flex justify-between text-xs text-muted-foreground mt-2 ml-8">
                        {weeklyData.map((point, index) => <span key={index}>{point.week}</span>)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mastery Distribution */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    How Well I Know Things
                  </CardTitle>
                  <CardDescription>
                    See what you know well and what needs more practice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64">
                    <div className="relative">
                      {/* Donut Chart */}
                      <div className="w-40 h-40 relative">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="hsl(var(--muted))" strokeWidth="3" />
                          {/* Mastered - 45% */}
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="hsl(var(--green-500))" strokeWidth="3" strokeDasharray="45 55" strokeDashoffset="0" />
                          {/* Proficient - 35% */}
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="hsl(var(--blue-500))" strokeWidth="3" strokeDasharray="35 65" strokeDashoffset="-45" />
                          {/* Learning - 20% */}
                          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="hsl(var(--orange-500))" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-80" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex justify-center gap-6 mt-4">
                    {masteryDistribution.map((item, index) => <div key={index} className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", item.color)} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Simple Learning Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    How Am I Learning?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Learning Level</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Good!</Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      You are learning at just the right speed. Keep going!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    What I'm Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">Basic Skills</span>
                      <span className="text-xs text-green-600 font-medium">85%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-sm">Problem Solving</span>
                      <span className="text-xs text-blue-600 font-medium">72%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-sm">Creative Work</span>
                      <span className="text-xs text-orange-600 font-medium">58%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-orange-600" />
                    I'm Getting Better!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">+12%</div>
                    <div className="text-sm text-muted-foreground mb-3">better than last month</div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Keep Going!
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>;
};