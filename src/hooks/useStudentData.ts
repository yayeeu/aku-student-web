import { useState, useCallback, useEffect } from 'react';
import { StudentData } from '@/types';
import { apiService, StudentApiResponse } from '@/services/api';
import { SessionManager } from '@/utils/sessionManager';

// Helper function to map API response to StudentData interface
const mapApiResponseToStudentData = (apiData: StudentApiResponse): StudentData => {
  return {
    firstName: apiData.first_name || '',
    lastName: apiData.last_name || '',
    grade: apiData.grade_level || '',
    student_competency_level_theta: apiData.student_competency_level_theta || 0,
    has_taken_onboarding_assessment: apiData.has_taken_onboarding_assessment || false,
    //city: apiData.city || '',
    //region: apiData.region || '',
    //school: apiData.school || '',
    //hasConsent: apiData.has_consent || false
  };
};

// Helper function to map StudentData updates to API format
const mapStudentDataToApiFormat = (studentData: Partial<StudentData>): Partial<StudentApiResponse> => {
  return {
    first_name: studentData.firstName,
    last_name: studentData.lastName,
    grade_level: studentData.grade,
    student_competency_level_theta: studentData.student_competency_level_theta,
    has_taken_onboarding_assessment: studentData.has_taken_onboarding_assessment,
    // city: studentData.city,
    // region: studentData.region,
    // school: studentData.school,
    // has_consent: studentData.hasConsent
  };
};

export const useStudentData = (userId?: string) => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user ID from session if not provided
  const effectiveUserId = userId || SessionManager.getCurrentUserId();

  const fetchStudentData = useCallback(async (studentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiData = await apiService.getStudentData(studentId);
      const mappedData = mapApiResponseToStudentData(apiData);
      setStudentData(mappedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch student data';
      setError(errorMessage);
      console.error('Failed to fetch student data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStudentData = useCallback(async (updates: Partial<StudentData>, studentId?: string) => {
    if (!studentId) {
      console.error('Student ID is required for updating student data');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const apiUpdates = mapStudentDataToApiFormat(updates);
      const updatedApiData = await apiService.updateStudentData(studentId, apiUpdates);
      const updatedData = mapApiResponseToStudentData(updatedApiData);
      setStudentData(updatedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update student data';
      setError(errorMessage);
      console.error('Failed to update student data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFullName = useCallback(() => {
    if (!studentData) return '';
    return `${studentData.firstName} ${studentData.lastName}`;
  }, [studentData]);

  const getInitials = useCallback(() => {
    if (!studentData) return '';
    return `${studentData.firstName[0] || ''}${studentData.lastName[0] || ''}`;
  }, [studentData]);

  const getLocation = useCallback(() => {
    if (!studentData) return '';
    // return `${studentData.city}, ${studentData.region}`;
    return ''; // Location fields are currently disabled
  }, [studentData]);

  // Auto-fetch data when userId is provided or available from session
  useEffect(() => {
    if (effectiveUserId) {
      fetchStudentData(effectiveUserId);
    }
  }, [effectiveUserId, fetchStudentData]);

  return {
    studentData,
    isLoading,
    error,
    fetchStudentData,
    updateStudentData,
    getFullName,
    getInitials,
    getLocation
  };
};