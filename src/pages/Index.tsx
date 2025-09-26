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

interface StudentData {
  firstName: string;
  lastName: string;
  grade: string;
  city: string;
  region: string;
  school: string;
  hasConsent: boolean;
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
  
  // Create mock student data for demonstration
  const [studentData] = useState<StudentData>({
    firstName: 'Amanuel',
    lastName: 'Tadesse',
    grade: '10',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    school: 'International Community School',
    hasConsent: true
  });

  const handleLogin = () => {
    // Create a temporary session
    const sessionData = {
      timestamp: Date.now(),
      user: studentData
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    setAppState('authenticated');
  };

  const handleSignup = () => {
    // Create a temporary session
    const sessionData = {
      timestamp: Date.now(),
      user: studentData
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    setAppState('authenticated');
  };

  const handleLogout = () => {
    // Clear the session
    localStorage.removeItem('userSession');
    setAppState('login');
  };

  // Check session validity on route change
  useEffect(() => {
    const storedSession = localStorage.getItem('userSession');
    if (storedSession && appState !== 'authenticated') {
      try {
        const sessionData = JSON.parse(storedSession);
        // Check if session is less than 24 hours old
        const sessionAge = Date.now() - sessionData.timestamp;
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (sessionAge < twentyFourHours) {
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
    }
  }, [location.pathname, appState]);

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
            studentData={studentData}
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
              <SubjectDetail studentData={studentData} /> : 
              <MyCourses studentData={studentData} />;
          })()
        } />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/dashboard" element={<Dashboard studentData={studentData} />} />
        <Route path="/progress/learning" element={<MyLearning studentData={studentData} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthenticatedLayout>
  );
};

export default Index;