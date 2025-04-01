
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, userType } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  if (!isAuthenticated) {
    // Redirect to the login page, but save the current location they were
    // trying to go to when they were redirected. This allows us
    // to send them to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect teachers trying to access student routes
  if (userType === 'teacher' && !path.startsWith('/teacher')) {
    return <Navigate to="/teacher" replace />;
  }

  // Redirect students trying to access teacher routes
  if (userType === 'student' && path.startsWith('/teacher')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
