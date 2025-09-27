import { useQuery } from '@tanstack/react-query';
import { apiService, CourseApiResponse } from '@/services/api';
import { SessionManager } from '@/utils/sessionManager';
import { Course } from '@/types';
import { Calculator, Atom, FlaskConical, PenTool, BookOpen, Brain, History, Globe, Music, Palette } from 'lucide-react';

// Icon mapping for different subject areas
const SUBJECT_ICON_MAP: Record<string, React.ComponentType<any>> = {
  mathematics: Calculator,
  math: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  english: PenTool,
  language: PenTool,
  literature: BookOpen,
  science: Brain,
  history: History,
  geography: Globe,
  music: Music,
  art: Palette,
  // Add more mappings as needed
};

// Color mapping for different subject areas
const SUBJECT_COLOR_MAP: Record<string, string> = {
  mathematics: 'text-blue-500',
  math: 'text-blue-500',
  physics: 'text-purple-500',
  chemistry: 'text-green-500',
  english: 'text-orange-500',
  language: 'text-orange-500',
  literature: 'text-red-500',
  science: 'text-teal-500',
  history: 'text-amber-500',
  geography: 'text-emerald-500',
  music: 'text-pink-500',
  art: 'text-violet-500',
};

// Transform API response to Course interface
const transformApiResponseToCourse = (apiCourse: CourseApiResponse): Course => {
  const subjectKey = apiCourse.subject_area?.toLowerCase() || apiCourse.name.toLowerCase();
  
  return {
    id: apiCourse.id,
    name: apiCourse.name,
    description: apiCourse.description,
    grade_level: apiCourse.grade_level,
    subject_area: apiCourse.subject_area,
    is_available: apiCourse.is_available,
    course_competency_level_theta: apiCourse.course_competency_level_theta,
    competency_percentage: apiCourse.competency_percentage,
    icon: SUBJECT_ICON_MAP[subjectKey] || BookOpen,
    color: SUBJECT_COLOR_MAP[subjectKey] || 'text-gray-500',
    href: `/courses?subject=${encodeURIComponent(subjectKey)}`,
    created_at: apiCourse.created_at,
    updated_at: apiCourse.updated_at,
  };
};

interface UseCoursesReturn {
  courses: Course[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  isSuccess: boolean;
  isError: boolean;
}

export const useCourses = (): UseCoursesReturn => {
  const userId = SessionManager.getCurrentUserId();

  const {
    data: coursesData = [],
    isLoading,
    error,
    refetch,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['student-courses', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required to fetch courses');
      }
      return apiService.getStudentCourses(userId);
    },
    enabled: !!userId, // Only run query if userId is available
    staleTime: 5 * 60 * 1000, // 5 minutes - data is considered fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes - cache for 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Transform API data to Course objects
  const courses = coursesData.map(transformApiResponseToCourse);

  return {
    courses,
    isLoading,
    error,
    refetch,
    isSuccess,
    isError,
  };
};

export default useCourses;
