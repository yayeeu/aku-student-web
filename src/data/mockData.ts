// ============= Mock Data for Development =============

import { Subject, Lesson, PracticeExercise, RecommendedActivity, LearningStats, Badge } from '@/types';
import { SUBJECT_CONFIGS } from '@/constants';
import { Calculator, Atom, FlaskConical, PenTool, Play, Target } from 'lucide-react';

export const mockSubjects: Record<string, Subject> = {
  mathematics: {
    id: 'mathematics',
    title: 'Mathematics',
    icon: Calculator,
    description: 'Advanced mathematical concepts including algebra, geometry, and calculus',
    grade: '10',
    totalTopics: 12,
    completedTopics: 10,
    overallMastery: 85,
    masteryLevel: 85,
    topicsCompleted: { current: 10, total: 12 },
    color: SUBJECT_CONFIGS.mathematics.color,
    bgGradient: SUBJECT_CONFIGS.mathematics.bgGradient,
    topics: [
      {
        id: 'linear-equations',
        name: 'Linear Equations',
        duration: '2 hours',
        masteryLevel: 100,
        lessonsCompleted: { current: 6, total: 8 },
        isCompleted: true
      },
      {
        id: 'quadratic-functions',
        name: 'Quadratic Functions',
        duration: '1.5 hours',
        masteryLevel: 83,
        lessonsCompleted: { current: 5, total: 6 },
        isCompleted: false
      },
      {
        id: 'systems-equations',
        name: 'Systems of Equations',
        duration: '2.2 hours',
        masteryLevel: 43,
        lessonsCompleted: { current: 3, total: 7 },
        isCompleted: false
      },
      {
        id: 'polynomials',
        name: 'Polynomials',
        duration: '3 hours',
        masteryLevel: 0,
        lessonsCompleted: { current: 0, total: 9 },
        isCompleted: false
      }
    ]
  },
  physics: {
    id: 'physics',
    title: 'Physics',
    icon: Atom,
    description: 'Fundamental physics concepts including mechanics, thermodynamics, and electromagnetism',
    grade: '10',
    totalTopics: 10,
    completedTopics: 7,
    overallMastery: 72,
    masteryLevel: 72,
    topicsCompleted: { current: 7, total: 10 },
    color: SUBJECT_CONFIGS.physics.color,
    bgGradient: SUBJECT_CONFIGS.physics.bgGradient,
    topics: [
      {
        id: 'mechanics',
        name: 'Mechanics',
        duration: '2.5 hours',
        masteryLevel: 90,
        lessonsCompleted: { current: 8, total: 10 },
        isCompleted: false
      },
      {
        id: 'thermodynamics',
        name: 'Thermodynamics',
        duration: '3 hours',
        masteryLevel: 65,
        lessonsCompleted: { current: 5, total: 8 },
        isCompleted: false
      }
    ]
  },
  chemistry: {
    id: 'chemistry',
    title: 'Chemistry',
    icon: FlaskConical,
    description: 'Chemical reactions, atomic structure, and molecular interactions',
    grade: '10',
    totalTopics: 8,
    completedTopics: 4,
    overallMastery: 45,
    masteryLevel: 45,
    topicsCompleted: { current: 4, total: 8 },
    color: SUBJECT_CONFIGS.chemistry.color,
    bgGradient: SUBJECT_CONFIGS.chemistry.bgGradient,
    topics: [
      {
        id: 'atomic-structure',
        name: 'Atomic Structure',
        duration: '2 hours',
        masteryLevel: 75,
        lessonsCompleted: { current: 6, total: 8 },
        isCompleted: false
      },
      {
        id: 'chemical-reactions',
        name: 'Chemical Reactions',
        duration: '2.5 hours',
        masteryLevel: 30,
        lessonsCompleted: { current: 2, total: 7 },
        isCompleted: false
      }
    ]
  },
  english: {
    id: 'english',
    title: 'English Literature',
    icon: PenTool,
    description: 'Literary analysis, creative writing, and language comprehension',
    grade: '10',
    totalTopics: 9,
    completedTopics: 6,
    overallMastery: 68,
    masteryLevel: 68,
    topicsCompleted: { current: 6, total: 9 },
    color: SUBJECT_CONFIGS.english.color,
    bgGradient: SUBJECT_CONFIGS.english.bgGradient,
    topics: [
      {
        id: 'poetry-analysis',
        name: 'Poetry Analysis',
        duration: '1.5 hours',
        masteryLevel: 85,
        lessonsCompleted: { current: 7, total: 8 },
        isCompleted: false
      },
      {
        id: 'creative-writing',
        name: 'Creative Writing',
        duration: '2 hours',
        masteryLevel: 60,
        lessonsCompleted: { current: 4, total: 6 },
        isCompleted: false
      }
    ]
  }
};

export const mockLessons: Record<string, Lesson[]> = {
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

export const mockPracticeExercises: Record<string, PracticeExercise[]> = {
  'linear-equations': [
    {
      id: 1,
      title: 'Basic Linear Equations',
      description: 'Practice solving simple linear equations with one variable',
      duration: '10 min',
      questions: 15,
      points: 30,
      isCompleted: true,
      score: 87,
      type: 'basic'
    },
    {
      id: 2,
      title: 'Multi-step Equations',
      description: 'Solve equations requiring multiple steps and operations',
      duration: '15 min',
      questions: 12,
      points: 40,
      isCompleted: true,
      score: 92,
      type: 'intermediate'
    },
    {
      id: 3,
      title: 'Word Problems',
      description: 'Apply linear equations to solve real-world scenarios',
      duration: '20 min',
      questions: 10,
      points: 50,
      isCompleted: false,
      score: null,
      type: 'advanced'
    },
    {
      id: 4,
      title: 'Graphing Practice',
      description: 'Practice graphing linear equations and interpreting graphs',
      duration: '18 min',
      questions: 8,
      points: 45,
      isCompleted: false,
      score: null,
      type: 'intermediate'
    },
    {
      id: 5,
      title: 'Mixed Review',
      description: 'Comprehensive practice covering all linear equation concepts',
      duration: '25 min',
      questions: 20,
      points: 60,
      isCompleted: false,
      score: null,
      type: 'challenge'
    }
  ]
};

export const mockRecommendedActivities: RecommendedActivity[] = [
  {
    id: 1,
    title: 'Practice Algebra Problems',
    subject: 'Mathematics',
    duration: '15 min',
    questions: 20,
    icon: Play,
    type: 'practice'
  },
  {
    id: 2,
    title: 'Linear Equations Practice',
    subject: 'Mathematics',
    duration: '20 min',
    questions: 18,
    icon: Target,
    type: 'practice'
  }
];

export const mockLearningStats: LearningStats[] = [
  { label: 'Problems I Solved', value: '547', color: 'text-orange-500' },
  { label: 'How Often I Get It Right', value: '89%', color: 'text-green-500' },
  { label: 'Time I Spent Learning', value: '12.5 hrs', color: 'text-blue-500' },
  { label: 'Days in a Row', value: '7 days', color: 'text-purple-500' }
];

export const mockBadges: Badge[] = [
  {
    name: 'Problem Solver',
    description: 'You got this today!',
    icon: '🏆',
    color: 'bg-orange-100 text-orange-800'
  },
  {
    name: 'Quick Learner',
    description: '2 days ago',
    icon: '⭐',
    color: 'bg-purple-100 text-purple-800'
  }
];