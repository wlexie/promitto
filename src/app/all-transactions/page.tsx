"use client";
import ProtectedRoute from '../components/ProtectedRoute';
import AllTransactions from './AllTransactions';

function page() {
  return (
    <ProtectedRoute>
      <div>
        <AllTransactions />
      </div>
    </ProtectedRoute>
  );
}

export default page;