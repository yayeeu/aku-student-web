import { StudentData } from '@/types';

/**
 * Validate student data
 * @param data - Student data to validate
 * @returns Validation result with errors if any
 */
export const validateStudentData = (data: Partial<StudentData>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }

  if (!data.grade || data.grade.trim().length === 0) {
    errors.push('Grade is required');
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.push('City must be at least 2 characters long');
  }

  if (!data.region || data.region.trim().length < 2) {
    errors.push('Region is required');
  }

  if (!data.school || data.school.trim().length < 2) {
    errors.push('School name must be at least 2 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate email format
 * @param email - Email to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize user input
 * @param input - User input to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};