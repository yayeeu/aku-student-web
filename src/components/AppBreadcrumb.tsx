import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

interface BreadcrumbConfig {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

const getBreadcrumbConfig = (pathname: string, searchParams: URLSearchParams): BreadcrumbConfig[] => {
  const breadcrumbs: BreadcrumbConfig[] = [
    { label: 'Home', href: '/' }
  ];

  if (pathname === '/') {
    breadcrumbs[0].isCurrentPage = true;
    return breadcrumbs;
  }

  if (pathname === '/courses') {
    breadcrumbs.push({ label: 'My Subjects', isCurrentPage: true });
    
    const subject = searchParams.get('subject');
    if (subject) {
      // Convert subject ID to display name
      const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
      breadcrumbs[breadcrumbs.length - 1].isCurrentPage = false;
      breadcrumbs[breadcrumbs.length - 1].href = '/courses';
      breadcrumbs.push({ label: subjectName, isCurrentPage: true });
    }
    return breadcrumbs;
  }

  if (pathname === '/lessons') {
    breadcrumbs.push({ label: 'My Subjects', href: '/courses' });
    
    const subject = searchParams.get('subject');
    if (subject) {
      const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
      breadcrumbs.push({ 
        label: subjectName, 
        href: `/courses?subject=${subject}` 
      });
    }
    breadcrumbs.push({ label: 'Lessons', isCurrentPage: true });
    return breadcrumbs;
  }

  if (pathname === '/practice') {
    breadcrumbs.push({ label: 'My Subjects', href: '/courses' });
    
    const subject = searchParams.get('subject');
    if (subject) {
      const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
      breadcrumbs.push({ 
        label: subjectName, 
        href: `/courses?subject=${subject}` 
      });
    }
    breadcrumbs.push({ label: 'Practice', isCurrentPage: true });
    return breadcrumbs;
  }

  if (pathname === '/dashboard') {
    breadcrumbs.push({ label: 'My Progress', isCurrentPage: true });
    return breadcrumbs;
  }

  if (pathname === '/progress/learning') {
    breadcrumbs.push({ label: 'My Progress', href: '/dashboard' });
    breadcrumbs.push({ label: 'My Learning', isCurrentPage: true });
    return breadcrumbs;
  }

  return breadcrumbs;
};

export const AppBreadcrumb: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const breadcrumbs = getBreadcrumbConfig(location.pathname, searchParams);

  if (breadcrumbs.length === 1 && breadcrumbs[0].isCurrentPage) {
    // Don't show breadcrumb on home page if it's just "Home"
    return null;
  }

  return (
    <div className="bg-background border-b border-border px-6 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {crumb.isCurrentPage ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.href!}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};