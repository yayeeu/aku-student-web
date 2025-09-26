import { useState, useEffect } from 'react';
import { SessionManager, SessionData } from '@/utils/sessionManager';

interface UseSessionReturn {
  isAuthenticated: boolean;
  currentUserId: string | null;
  currentUser: SessionData['user'] | null;
  accessToken: string | null;
  isLoading: boolean;
  refreshSession: () => void;
  clearSession: () => void;
}

/**
 * Custom hook for managing user session state
 */
export const useSession = (): UseSessionReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<SessionData['user'] | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = () => {
    const sessionData = SessionManager.getSessionData();
    const authenticated = SessionManager.isAuthenticated();
    
    setIsAuthenticated(authenticated);
    setCurrentUserId(sessionData?.user?.id || null);
    setCurrentUser(sessionData?.user || null);
    setAccessToken(sessionData?.session?.access_token || null);
    setIsLoading(false);
  };

  const clearSession = () => {
    SessionManager.clearSession();
    setIsAuthenticated(false);
    setCurrentUserId(null);
    setCurrentUser(null);
    setAccessToken(null);
  };

  // Initialize session on mount
  useEffect(() => {
    refreshSession();
  }, []);

  // Listen for storage changes (in case session is updated in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userSession') {
        refreshSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    isAuthenticated,
    currentUserId,
    currentUser,
    accessToken,
    isLoading,
    refreshSession,
    clearSession,
  };
};
