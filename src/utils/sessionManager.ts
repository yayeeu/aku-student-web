interface SessionData {
  timestamp: number;
  user: {
    id: string;
    email: string;
    created_at: string;
  };
  session: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
}

class SessionManager {
  private static readonly SESSION_KEY = 'userSession';

  /**
   * Get the current user ID from the stored session
   */
  static getCurrentUserId(): string | null {
    const sessionData = this.getSessionData();
    return sessionData?.user?.id || null;
  }

  /**
   * Get the current user data from the stored session
   */
  static getCurrentUser(): SessionData['user'] | null {
    const sessionData = this.getSessionData();
    return sessionData?.user || null;
  }

  /**
   * Get the full session data from localStorage
   */
  static getSessionData(): SessionData | null {
    try {
      const storedSession = localStorage.getItem(this.SESSION_KEY);
      if (!storedSession) return null;

      const sessionData: SessionData = JSON.parse(storedSession);
      return this.isSessionValid(sessionData) ? sessionData : null;
    } catch (error) {
      console.warn('Failed to parse session data:', error);
      this.clearSession();
      return null;
    }
  }

  /**
   * Check if the current session is valid (not expired)
   */
  static isSessionValid(sessionData?: SessionData): boolean {
    if (!sessionData) {
      sessionData = this.getSessionData();
    }
    
    if (!sessionData) return false;

    // Check if token is expired
    const currentTime = Date.now() / 1000; // Convert to seconds
    return sessionData.session.expires_at > currentTime;
  }

  /**
   * Get the access token from the current session
   */
  static getAccessToken(): string | null {
    const sessionData = this.getSessionData();
    return sessionData?.session?.access_token || null;
  }

  /**
   * Check if user is currently authenticated
   */
  static isAuthenticated(): boolean {
    return this.getCurrentUserId() !== null;
  }

  /**
   * Clear the current session
   */
  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  /**
   * Store new session data
   */
  static storeSession(sessionData: SessionData): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
  }
}

export { SessionManager };
export type { SessionData };
