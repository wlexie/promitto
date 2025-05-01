// components/ProtectedRoute.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { 
  isAdmin, 
  isAuthorizedUser, 
  selectIsAuthenticated  // Add this import
} from '../store/authSlice';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  adminOnly = false 
}: ProtectedRouteProps) {
  const router = useRouter();
  const authorized = useSelector(adminOnly ? isAdmin : isAuthorizedUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = isAuthenticated === undefined;

  useEffect(() => {
    if (!isLoading && !authorized) {
      router.push(adminOnly ? '/unauthorized' : '/unauthorized');
    }
  }, [authorized, router, adminOnly, isLoading]);

  if (isLoading || !authorized) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
}