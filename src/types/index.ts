// ============= Shared Type Definitions =============

export interface StudentData {
  firstName: string;
  lastName: string;
  grade: string;
  city: string;
  region: string;
  school: string;
  hasConsent?: boolean;
}

export interface Subject {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  grade: string;
  description: string;
  masteryLevel: number;
  topicsCompleted: { current: number; total: number };
  totalTopics: number;
  completedTopics: number;
  overallMastery: number;
  color: string;
  bgGradient?: string;
  topics?: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  duration: string;
  masteryLevel: number;
  lessonsCompleted: { current: number; total: number };
  isCompleted: boolean;
}

export interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'interactive' | 'practice';
  duration: string;
  isCompleted: boolean;
  description: string;
}

export interface PracticeExercise {
  id: number;
  title: string;
  description: string;
  duration: string;
  questions: number;
  points: number;
  isCompleted: boolean;
  score?: number | null;
  type: 'basic' | 'intermediate' | 'advanced' | 'challenge';
}

export interface RecommendedActivity {
  id: number;
  title: string;
  subject: string;
  duration: string;
  questions: number;
  icon: React.ComponentType<any>;
  type: 'practice' | 'lesson';
}

export interface LearningStats {
  label: string;
  value: string;
  color: string;
}

export interface Badge {
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Chat system types
export interface ChatMessage {
  id: string;
  type: 'user' | 'tutor';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  startedAt: Date;
  lastActivity: Date;
}

// Achievement system types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'peach' | 'mint' | 'lavender';
  earnedAt?: Date;
  criteria: string;
  points: number;
}

// Progress tracking types
export interface SubjectProgress {
  subject: string;
  progress: number;
  color: string;
  lastUpdated: Date;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  isCompleted: boolean;
}

// Error handling types
export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

export type ErrorBoundaryState = {
  hasError: boolean;
  error?: AppError;
};

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps extends BaseComponentProps {
  studentData: StudentData;
}

// Theme types
export type ThemeColor = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'success' 
  | 'warning' 
  | 'error'
  | 'muted';

export interface ThemeConfig {
  colors: Record<ThemeColor, string>;
  gradients: Record<string, string>;
  shadows: Record<string, string>;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Notification types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  timestamp: Date;
  isRead: boolean;
}