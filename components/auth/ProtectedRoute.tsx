
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/store/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
      if (!isAuthenticated) {
        setLocation('/login?redirect=' + window.location.pathname);
      }
    };
    verify();
  }, [isAuthenticated, checkAuth, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
