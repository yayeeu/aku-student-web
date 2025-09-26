export interface Achievement {
  name: string;
  description: string;
  icon: string;
  type: 'peach' | 'mint' | 'lavender';
  earnedAt?: Date;
}

export const SAMPLE_ACHIEVEMENTS: Achievement[] = [
  {
    name: 'Algebra Master',
    description: 'Solved 50 equations',
    icon: '🏆',
    type: 'peach',
    earnedAt: new Date('2024-01-15')
  },
  {
    name: 'Quick Learner',
    description: '5 lessons in a day',
    icon: '⚡',
    type: 'mint',
    earnedAt: new Date('2024-01-10')
  },
  {
    name: 'Streak Champion',
    description: '7 days in a row',
    icon: '🔥',
    type: 'lavender',
    earnedAt: new Date('2024-01-20')
  }
];

export const PROGRESS_SUBJECTS = [
  {
    subject: 'Mathematics',
    progress: 85,
    color: 'bg-primary'
  },
  {
    subject: 'Science',
    progress: 72,
    color: 'bg-accent'
  },
  {
    subject: 'English',
    progress: 45,
    color: 'bg-secondary'
  }
];