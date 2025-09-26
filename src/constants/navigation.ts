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

export const SUBJECTS: SubjectItem[] = [
  {
    name: 'Mathematics',
    href: '/courses?subject=mathematics',
    icon: Calculator,
    competencyLevel: 85,
    color: 'text-blue-500'
  },
  {
    name: 'Physics',
    href: '/courses?subject=physics',
    icon: Atom,
    competencyLevel: 72,
    color: 'text-purple-500'
  },
  {
    name: 'Chemistry',
    href: '/courses?subject=chemistry',
    icon: FlaskConical,
    competencyLevel: 45,
    color: 'text-green-500'
  },
  {
    name: 'English',
    href: '/courses?subject=english',
    icon: PenTool,
    competencyLevel: 67,
    color: 'text-orange-500'
  }
];