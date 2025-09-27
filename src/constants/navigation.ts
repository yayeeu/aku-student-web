import { Home, BookOpen, BarChart3, Calculator, Atom, FlaskConical, PenTool } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export interface SubjectItem extends NavigationItem {
  competencyLevel: number;
  color: string;
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    name: 'Home',
    href: '',
    icon: Home
  },
  {
    name: 'My Subjects',
    href: '/courses',
    icon: BookOpen
  },
  {
    name: 'My Progress',
    href: '/dashboard',
    icon: BarChart3
  }
];

export const PROGRESS_ITEMS: NavigationItem[] = [
  {
    name: 'My Learning',
    href: '/dashboard',
    icon: BarChart3,
    description: 'View your learning progress'
  }
];

// SUBJECTS array is now replaced by useCourses hook from API
// Static data removed - use useCourses() hook to get real-time course data with competency levels