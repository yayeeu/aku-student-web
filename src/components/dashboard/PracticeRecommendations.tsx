import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { ActivityCard } from '@/components/common/ActivityCard';

interface PracticeRecommendation {
  id: number;
  title: string;
  subject: string;
  duration: string;
  questions: number;
  icon: React.ComponentType<any>;
  type: 'practice' | 'lesson';
}

// Sample practice recommendations from different subjects
const practiceRecommendations: PracticeRecommendation[] = [
  {
    id: 1,
    title: "Linear Equations Practice",
    subject: "Mathematics", 
    duration: "15 min",
    questions: 12,
    icon: ({ className }: { className?: string }) => <span className={className}>📐</span>,
    type: 'practice'
  },
  {
    id: 2,
    title: "Chemical Bonding Quiz",
    subject: "Chemistry",
    duration: "10 min", 
    questions: 8,
    icon: ({ className }: { className?: string }) => <span className={className}>⚗️</span>,
    type: 'practice'
  },
  {
    id: 3,
    title: "Essay Writing Techniques",
    subject: "English",
    duration: "20 min",
    questions: 5,
    icon: ({ className }: { className?: string }) => <span className={className}>✍️</span>,
    type: 'lesson'
  }
];

interface PracticeRecommendationsProps {
  className?: string;
}

export const PracticeRecommendations: React.FC<PracticeRecommendationsProps> = ({ 
  className 
}) => {
  const handleActivityClick = (activity: PracticeRecommendation) => {
    console.log('Activity clicked:', activity.title);
    // In a real app, this would navigate to the practice/lesson
  };

  return (
    <Card className={`card-elevated border-2 border-primary bg-gradient-to-r from-primary/5 to-accent/5 ${className}`}>
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
        {practiceRecommendations.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity}
            onClick={() => handleActivityClick(activity)}
          />
        ))}
      </CardContent>
    </Card>
  );
};