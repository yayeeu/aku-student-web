import { useState, useEffect } from 'react';
import { Subject } from '@/types';
import { mockSubjects } from '@/data/mockData';
import { createError } from '@/utils';
import { ERROR_MESSAGES } from '@/constants';

interface UseSubjectsReturn {
  subjects: Subject[];
  isLoading: boolean;
  error: string | null;
  getSubject: (id: string) => Subject | undefined;
  refetch: () => void;
}

export const useSubjects = (): UseSubjectsReturn => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const subjectList = Object.values(mockSubjects);
      setSubjects(subjectList);
    } catch (err) {
      const error = createError(ERROR_MESSAGES.LOADING_ERROR);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubject = (id: string): Subject | undefined => {
    return subjects.find(subject => subject.id === id);
  };

  const refetch = () => {
    fetchSubjects();
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return {
    subjects,
    isLoading,
    error,
    getSubject,
    refetch
  };
};