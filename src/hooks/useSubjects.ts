import { useMemo } from 'react';
import { Subject, Course } from '@/types';
import { useCourses } from './useCourses';
import { BookOpen } from 'lucide-react';

interface UseSubjectsReturn {
  subjects: Subject[];
  isLoading: boolean;
  error: string | null;
  getSubject: (id: string) => Subject | undefined;
  refetch: () => void;
}

// Transform Course to Subject for backwards compatibility
const transformCourseToSubject = (course: Course): Subject => {
  return {
    id: course.id,
    title: course.name,
    icon: course.icon || BookOpen,
    grade: course.grade_level,
    description: course.description || '',
    masteryLevel: course.competency_percentage,
    topicsCompleted: { current: 0, total: 0 }, // These would need to come from a separate API
    totalTopics: 0,
    completedTopics: 0,
    overallMastery: course.competency_percentage,
    color: course.color || 'text-gray-500',
    bgGradient: undefined,
    topics: undefined,
  };
};

export const useSubjects = (): UseSubjectsReturn => {
  const { courses, isLoading, error, refetch } = useCourses();

  // Transform courses to subjects
  const subjects = useMemo(() => {
    return courses.map(transformCourseToSubject);
  }, [courses]);

  const getSubject = (id: string): Subject | undefined => {
    return subjects.find(subject => subject.id === id);
  };

  return {
    subjects,
    isLoading,
    error: error?.message || null,
    getSubject,
    refetch
  };
};