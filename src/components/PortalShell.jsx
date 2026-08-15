import { Navigate, useLocation } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

export function RequireAuth({ allowedRoles, children }) {
  const { user } = useAppState();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'chw' ? '/chw/' : '/home'} replace />;
  }

  return children;
}

export function HomeRedirect() {
  const { user } = useAppState();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.role === 'chw' ? '/chw/' : '/home'} replace />;
}
