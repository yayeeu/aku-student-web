import { useState, useEffect } from 'react';
import { PracticeExercise } from '@/types';
import { mockPracticeExercises } from '@/data/mockData';
import { createError } from '@/utils';
import { ERROR_MESSAGES } from '@/constants';

interface UsePracticeReturn {
  exercises: PracticeExercise[];
  isLoading: boolean;
  error: string | null;
  completedCount: number;
  totalPoints: number;
  refetch: () => void;
}

export const usePractice = (topicId: string): UsePracticeReturn => {
  const [exercises, setExercises] = useState<PracticeExercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPractice = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const topicExercises = mockPracticeExercises[topicId] || [];
      setExercises(topicExercises);
      
      if (!topicExercises.length) {
        throw new Error(ERROR_MESSAGES.PRACTICE_NOT_FOUND);
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

  const completedCount = exercises.filter(exercise => exercise.isCompleted).length;
  const totalPoints = exercises
    .filter(exercise => exercise.isCompleted)
    .reduce((sum, exercise) => sum + exercise.points, 0);

  const refetch = () => {
    fetchPractice();
  };

  useEffect(() => {
    if (topicId) {
      fetchPractice();
    }
  }, [topicId]);

  return {
    exercises,
    isLoading,
    error,
    completedCount,
    totalPoints,
    refetch
  };
};