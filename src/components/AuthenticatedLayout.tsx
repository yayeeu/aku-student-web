import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, User, HelpCircle, ChevronDown, ChevronUp, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FloatingTalkAvatar } from '@/components/FloatingTalkAvatar';
import { cn } from '@/lib/utils';
import akuLogo from '@/assets/aku-education-logo.png';
import studentAvatar from '@/assets/student-avatar.png';
import { AppBreadcrumb } from '@/components/AppBreadcrumb';
import { MAIN_NAVIGATION, PROGRESS_ITEMS } from '@/constants/navigation';
import { StudentData } from '@/types';
import { useCourses } from '@/hooks/useCourses';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  isTutorVisible?: boolean;
  onToggleTutorVisibility?: () => void;
  isVoiceEnabled?: boolean;
  onToggleVoice?: () => void;
  studentData?: StudentData;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
  onLogout,
  isTutorVisible = true,
  onToggleTutorVisibility = () => {},
  isVoiceEnabled = true,
  onToggleVoice = () => {},
  studentData
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubjectsExpanded, setIsSubjectsExpanded] = useState(false);
  const [isProgressExpanded, setIsProgressExpanded] = useState(false);
  const location = useLocation();
  
  // Fetch courses from API
  const { courses, isLoading: isCoursesLoading } = useCourses();
  
  const isCurrentPath = (path: string) => location.pathname === path;

  const renderNavigationItem = (item: any, isMobile: boolean = false) => {
    const baseClassName = cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
      isMobile ? "text-sm" : "text-base",
      isCurrentPath(item.href) 
        ? "bg-sidebar-selected text-sidebar-accent-foreground shadow-soft" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
    );

    if (item.name === 'My Subjects') {
      return (
        <div key={item.name}>
          <Collapsible open={isSubjectsExpanded} onOpenChange={setIsSubjectsExpanded}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </div>
                {isSubjectsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-1 space-y-1">
              {isCoursesLoading ? (
                <div className="px-4 py-2 text-sm text-sidebar-foreground/70">
                  Loading courses...
                </div>
              ) : courses.length > 0 ? (
                courses.map(course => (
                  <Link 
                    key={course.id} 
                    to={course.href || `/courses?subject=${encodeURIComponent(course.name.toLowerCase())}`} 
                    className="flex items-center justify-between px-4 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      {course.icon && <course.icon className={cn("h-4 w-4", course.color)} />}
                      <span>{course.name}</span>
                    </div>
                    <span className="text-xs font-medium">{course.competency_percentage}%</span>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-sidebar-foreground/70">
                  No courses available
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      );
    }

    if (item.name === 'My Progress') {
      return (
        <div key={item.name}>
          <Collapsible open={isProgressExpanded} onOpenChange={setIsProgressExpanded}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </div>
                {isProgressExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 mt-1 space-y-1">
              {PROGRESS_ITEMS.map(progressItem => (
                <Link 
                  key={progressItem.name} 
                  to={progressItem.href} 
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                >
                  <progressItem.icon className="h-4 w-4" />
                  <span>{progressItem.name}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      );
    }

    return (
      <Link 
        key={item.name} 
        to={item.href} 
        className={baseClassName}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        <item.icon className="h-5 w-5" />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-soft-surface flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
        <div className="flex items-center justify-between h-28 sm:h-32 px-4 lg:px-6">
          {/* Left Section - Logo and Brand */}
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Logo */}
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
                    <img src={akuLogo} alt="Aku Education" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      Aku Education
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 px-4 py-6 space-y-2">
                    {MAIN_NAVIGATION.map(item => renderNavigationItem(item, true))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-4">
              <img src={akuLogo} alt="Aku Education" className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-background" />
            </Button>

            {/* Help */}
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* Account Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                    <img src={studentAvatar} alt="Student Profile" className="w-full h-full object-cover" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {studentData ? `${studentData.firstName} ${studentData.lastName}` : 'My Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Notifications</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Desktop Sidebar - Fixed */}
        <div className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-28 sm:lg:top-32 lg:bottom-0 lg:w-72 bg-background border-r border-border shadow-soft z-30">
          <div className="flex flex-col h-full">
            {/* Navigation */}
            <nav className="flex-1 px-6 py-6 space-y-3 overflow-y-auto">
              {MAIN_NAVIGATION.map(item => renderNavigationItem(item, false))}
            </nav>
          </div>
        </div>

        {/* Main Content Container - Offset for fixed sidebar */}
        <div className="flex-1 lg:ml-72 flex flex-col">
          {/* Breadcrumb - Fixed */}
          <div className="fixed top-28 sm:top-32 left-72 right-0 z-20 lg:block hidden">
            <AppBreadcrumb />
          </div>

          {/* Main Content - Offset for fixed breadcrumb */}
          <main className="flex-1 pt-16">
            {children}
          </main>
        </div>
      </div>

            {/* Floating Tutor Avatar */}
            <FloatingTalkAvatar 
              isVisible={isTutorVisible} 
              isVoiceEnabled={isVoiceEnabled} 
            />

      {/* Footer */}
      <footer className="bg-background border-t border-border py-3 mt-auto lg:ml-72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>© 2024 Aku Education. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline" aria-label="Privacy Policy - Opens in new window">
                  Privacy Policy
                </a>
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline" aria-label="Terms of Use - Opens in new window">
                  Terms of Use
                </a>
              </div>
            </div>
            <div className="text-xs">Version 1.0.0</div>
          </div>
        </div>
      </footer>
    </div>
  );
};