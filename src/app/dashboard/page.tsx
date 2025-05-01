"use client";
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from './Dashboard';

function page() {
  return (
    <ProtectedRoute>
      <div>
        <Dashboard />
      </div>
    </ProtectedRoute>
  );
}

export default page;