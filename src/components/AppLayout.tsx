import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Bell, User, HelpCircle, Home, BookOpen, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import appLogo from '@/assets/app-logo.png';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'My Courses', href: '/courses', icon: BookOpen },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
];

export const AppLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-soft-surface flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-background border-b border-border shadow-soft sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section - Logo */}
            <div className="flex items-center gap-4">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <nav className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                      <img
                        src={appLogo}
                        alt="Aku Education"
                        className="w-12 h-12 object-contain"
                      />
                      <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        Aku Education
                      </span>
                    </div>
                    <div className="space-y-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            isCurrentPath(item.href)
                              ? "bg-sidebar-selected text-sidebar-accent-foreground shadow-soft"
                              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-3">
                <img
                  src={appLogo}
                  alt="Aku Education"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
                <span className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Aku Education
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isCurrentPath(item.href)
                      ? "bg-sidebar-selected text-sidebar-accent-foreground shadow-soft"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Right section - Actions */}
            <div className="flex items-center gap-2">
              {/* Messages/Updates */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-background" />
              </Button>

              {/* Account Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Help */}
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-foreground transition-colors">
                Terms & Services
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Aku Education. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};