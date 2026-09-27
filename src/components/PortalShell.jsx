import { Navigate, useLocation } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

export function RequireAuth({ allowedRoles, children }) {
  const { user } = useAppState();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // During symposium presentation, allow seamless demonstration of all 4 doors
  return children;
}

export function HomeRedirect() {
  const { user } = useAppState();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'chw') return <Navigate to="/chw/" replace />;
  if (user.role === 'facility_staff') return <Navigate to="/facility/" replace />;
  if (user.role === 'partner') return <Navigate to="/partner/" replace />;
  return <Navigate to="/home" replace />;
}
