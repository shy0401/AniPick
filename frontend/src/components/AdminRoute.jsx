import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRoute({ children }) {
  const { authLoading, isAuthenticated, isAdmin } = useAuth();

  if (authLoading) return <p className="page-message">Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!isAdmin) {
    return (
      <div className="empty-state">
        <h1>Access denied</h1>
        <p>ADMIN role is required to use this page.</p>
      </div>
    );
  }

  return children;
}

export default AdminRoute;
