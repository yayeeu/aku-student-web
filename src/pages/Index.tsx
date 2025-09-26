import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { LoginPage } from '@/components/LoginPage';
import { SignupPage } from '@/components/SignupPage';
import { HomePage } from '@/components/HomePage';
import { MyCourses } from '@/components/MyCourses';
import { Dashboard } from '@/components/Dashboard';
import { SubjectDetail } from '@/components/SubjectDetail';
import { LessonsPage } from '@/components/LessonsPage';
import { PracticePage } from '@/components/PracticePage';
import { MyLearning } from '@/components/MyLearning';
import { AuthenticatedLayout } from '@/components/AuthenticatedLayout';

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

type AppState = 'login' | 'signup' | 'authenticated';

const Index = () => {
  const location = useLocation();
  const [appState, setAppState] = useState<AppState>(() => {
    // Check if we have a stored session
    const storedSession = localStorage.getItem('userSession');
    return storedSession ? 'authenticated' : 'login';
  });
  const [isTutorVisible, setIsTutorVisible] = useState(true);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentUser, setCurrentUser] = useState<SessionData['user'] | null>(null);

  const handleLogin = (userData: SessionData['user']) => {
    // Session data is already stored in LoginPage, just update state
    setCurrentUser(userData);
    setAppState('authenticated');
  };

  const handleSignup = (userData: SessionData['user']) => {
    // Session data is already stored in SignupPage, just update state
    setCurrentUser(userData);
    setAppState('authenticated');
  };

  const handleLogout = () => {
    // Clear the session
    localStorage.removeItem('userSession');
    setCurrentUser(null);
    setAppState('login');
  };

  // Check session validity on route change
  useEffect(() => {
    const storedSession = localStorage.getItem('userSession');
    if (storedSession && appState !== 'authenticated') {
      try {
        const sessionData: SessionData = JSON.parse(storedSession);
        
        // Check if session token is still valid (not expired)
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (sessionData.session.expires_at > currentTime) {
          setCurrentUser(sessionData.user);
          setAppState('authenticated');
        } else {
          // Session expired
          localStorage.removeItem('userSession');
          setAppState('login');
        }
      } catch (error) {
        // Invalid session data
        localStorage.removeItem('userSession');
        setAppState('login');
      }
    } else if (storedSession && appState === 'authenticated' && !currentUser) {
      // Load user data if authenticated but currentUser is null
      try {
        const sessionData: SessionData = JSON.parse(storedSession);
        setCurrentUser(sessionData.user);
      } catch (error) {
        // Invalid session data
        localStorage.removeItem('userSession');
        setCurrentUser(null);
        setAppState('login');
      }
    }
  }, [location.pathname, appState, currentUser]);

  // Handle routing based on authentication state
  if (appState === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => setAppState('signup')}
      />
    );
  }
  
  if (appState === 'signup') {
    return (
      <SignupPage
        onSignup={handleSignup}
        onSwitchToLogin={() => setAppState('login')}
      />
    );
  }

  // Authenticated state - render app with routing
  return (
    <AuthenticatedLayout 
      onLogout={handleLogout}
      isTutorVisible={isTutorVisible}
      onToggleTutorVisibility={() => setIsTutorVisible(!isTutorVisible)}
      isVoiceEnabled={isVoiceEnabled}
      onToggleVoice={() => setIsVoiceEnabled(!isVoiceEnabled)}
    >
      <Routes>
        <Route path="/" element={
          <HomePage 
            userId={currentUser?.id}
            isAvatarVisible={isTutorVisible}
            onToggleAvatarVisibility={() => setIsTutorVisible(!isTutorVisible)}
            isAvatarMuted={!isVoiceEnabled}
            onToggleAvatarMute={() => setIsVoiceEnabled(!isVoiceEnabled)}
          />
        } />
        <Route path="/courses" element={
          (function() {
            const searchParams = new URLSearchParams(window.location.search);
            const subject = searchParams.get('subject');
            return subject ? 
              <SubjectDetail userId={currentUser?.id} /> : 
              <MyCourses userId={currentUser?.id} />;
          })()
        } />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/dashboard" element={<Dashboard userId={currentUser?.id} />} />
        <Route path="/progress/learning" element={<MyLearning userId={currentUser?.id} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthenticatedLayout>
  );
};

export default Index;