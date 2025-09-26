import { useState, useCallback } from 'react';
import { StudentData } from '@/types';

// Mock student data - in a real app this would come from an API
const MOCK_STUDENT_DATA: StudentData = {
  firstName: "Alex",
  lastName: "Johnson",
  grade: "8th Grade",
  city: "Vancouver",
  region: "BC",
  school: "Maple Leaf Secondary",
  hasConsent: true
};

export const useStudentData = () => {
  const [studentData, setStudentData] = useState<StudentData>(MOCK_STUDENT_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const updateStudentData = useCallback(async (updates: Partial<StudentData>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setStudentData(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Failed to update student data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFullName = useCallback(() => {
    return `${studentData.firstName} ${studentData.lastName}`;
  }, [studentData.firstName, studentData.lastName]);

  const getInitials = useCallback(() => {
    return `${studentData.firstName[0]}${studentData.lastName[0]}`;
  }, [studentData.firstName, studentData.lastName]);

  const getLocation = useCallback(() => {
    return `${studentData.city}, ${studentData.region}`;
  }, [studentData.city, studentData.region]);

  return {
    studentData,
    isLoading,
    updateStudentData,
    getFullName,
    getInitials,
    getLocation
  };
};