import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LearningStats } from '@/types';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  icon?: React.ComponentType<any>;
  stats: LearningStats[];
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  icon: Icon, 
  stats, 
  className 
}) => {
  return (
    <Card className={cn('card-elevated', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-primary" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className={cn("font-bold", stat.color)}>{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};