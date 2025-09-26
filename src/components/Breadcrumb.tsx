import React from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { Home, ChevronRight, BookOpen, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

const subjectNames = {
  mathematics: 'Mathematics',
  physics: 'Physics', 
  chemistry: 'Chemistry',
  english: 'English Literature'
};

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const path = location.pathname;
    const items: BreadcrumbItem[] = [
      { name: 'Home', href: '/', icon: Home }
    ];

    if (path.includes('/courses')) {
      const subjectParam = searchParams.get('subject');
      
      items.push({ 
        name: 'My Subjects', 
        href: '/courses', 
        icon: BookOpen 
      });

      if (subjectParam && subjectNames[subjectParam as keyof typeof subjectNames]) {
        items.push({
          name: subjectNames[subjectParam as keyof typeof subjectNames],
          href: `/courses?subject=${subjectParam}`,
          current: true
        });
      } else if (!subjectParam) {
        items[items.length - 1].current = true;
      }
    } else if (path.includes('/dashboard')) {
      items.push({ 
        name: 'My Progress', 
        href: '/dashboard', 
        icon: BarChart3, 
        current: true 
      });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-2 transition-colors",
                item.current
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.name}</span>
            </Link>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};