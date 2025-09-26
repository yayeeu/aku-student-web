import { useState, useEffect } from 'react';
import { Lesson } from '@/types';
import { mockLessons } from '@/data/mockData';
import { createError } from '@/utils';
import { ERROR_MESSAGES } from '@/constants';

interface UseLessonsReturn {
  lessons: Lesson[];
  isLoading: boolean;
  error: string | null;
  completedCount: number;
  refetch: () => void;
}

export const useLessons = (topicId: string): UseLessonsReturn => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLessons = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const topicLessons = mockLessons[topicId] || [];
      setLessons(topicLessons);
      
      if (!topicLessons.length) {
        throw new Error(ERROR_MESSAGES.LESSONS_NOT_FOUND);
      }
    } catch (err) {
      const error = createError(
        err instanceof Error ? err.message : ERROR_MESSAGES.LOADING_ERROR
      );
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const completedCount = lessons.filter(lesson => lesson.isCompleted).length;

  const refetch = () => {
    fetchLessons();
  };

  useEffect(() => {
    if (topicId) {
      fetchLessons();
    }
  }, [topicId]);

  return {
    lessons,
    isLoading,
    error,
    completedCount,
    refetch
  };
};