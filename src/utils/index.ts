// ============= Shared Utility Functions =============

import { AppError } from '@/types';

/**
 * Calculate overall mastery percentage from subjects
 */
export const calculateOverallMastery = (subjects: { masteryLevel: number }[]): number => {
  if (subjects.length === 0) return 0;
  return Math.round(subjects.reduce((sum, subject) => sum + subject.masteryLevel, 0) / subjects.length);
};

/**
 * Format duration string to be more readable
 */
export const formatDuration = (duration: string): string => {
  return duration.toLowerCase().replace('min', 'minutes').replace('hr', 'hour');
};

/**
 * Generate URL with query parameters
 */
export const createRouteWithParams = (baseRoute: string, params: Record<string, string>): string => {
  const searchParams = new URLSearchParams(params);
  return `${baseRoute}?${searchParams.toString()}`;
};

/**
 * Safe URL parameter extraction
 */
export const getUrlParam = (searchParams: URLSearchParams, param: string, defaultValue: string): string => {
  return searchParams.get(param) || defaultValue;
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.min(Math.round((current / total) * 100), 100);
};

/**
 * Format large numbers with appropriate suffixes
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Create error object with consistent structure
 */
export const createError = (message: string, code?: string, details?: any): AppError => ({
  message,
  code,
  details
});

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if user is on mobile device
 */
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Safe JSON parse with fallback
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

/**
 * Local storage utilities with error handling
 */
export const storage = {
  get: <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  
  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
};

/**
 * Retry function with exponential backoff
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
};