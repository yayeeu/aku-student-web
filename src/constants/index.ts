// ============= Application Constants =============

import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  PenTool,
  Play,
  Target,
  Video,
  BookOpen,
  FileText
} from 'lucide-react';

// Subject configurations
export const SUBJECT_CONFIGS = {
  mathematics: {
    icon: Calculator,
    color: 'bg-primary',
    bgGradient: 'from-primary to-primary/80'
  },
  physics: {
    icon: Atom,
    color: 'bg-accent',
    bgGradient: 'from-accent to-accent/80'
  },
  chemistry: {
    icon: FlaskConical,
    color: 'bg-secondary',
    bgGradient: 'from-secondary to-secondary/80'
  },
  english: {
    icon: PenTool,
    color: 'bg-orange-500',
    bgGradient: 'from-orange-500 to-orange-400'
  }
};

// Lesson type configurations
export const LESSON_TYPE_CONFIGS = {
  video: { 
    icon: Video, 
    color: 'bg-red-500', 
    label: 'Video' 
  },
  interactive: { 
    icon: BookOpen, 
    color: 'bg-blue-500', 
    label: 'Interactive' 
  },
  practice: { 
    icon: FileText, 
    color: 'bg-green-500', 
    label: 'Practice' 
  }
};

// Practice type configurations
export const PRACTICE_TYPE_CONFIGS = {
  basic: { 
    color: 'bg-green-500', 
    label: 'Basic', 
    icon: Target 
  },
  intermediate: { 
    color: 'bg-yellow-500', 
    label: 'Intermediate', 
    icon: BookOpen 
  },
  advanced: { 
    color: 'bg-orange-500', 
    label: 'Advanced', 
    icon: FlaskConical 
  },
  challenge: { 
    color: 'bg-red-500', 
    label: 'Challenge', 
    icon: Calculator 
  }
};

// Activity type configurations
export const ACTIVITY_CONFIGS = {
  lesson: {
    icon: Play,
    color: 'text-primary'
  },
  practice: {
    icon: Target,
    color: 'text-secondary'
  }
};

// Routes
export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  LESSONS: '/lessons',
  PRACTICE: '/practice',
  DASHBOARD: '/dashboard',
  LEARNING: '/progress/learning'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  SUBJECT_NOT_FOUND: 'Subject not found',
  TOPIC_NOT_FOUND: 'Topic not found', 
  LESSONS_NOT_FOUND: 'Lessons not found',
  PRACTICE_NOT_FOUND: 'Practice exercises not found',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  LOADING_ERROR: 'Failed to load content. Please refresh the page.'
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: '0.2s',
  NORMAL: '0.3s',
  SLOW: '0.5s'
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px'
} as const;