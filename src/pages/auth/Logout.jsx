import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    if (isLoggingOut) {
      // Clear all auth and session data
      localStorage.clear(); // Clears all localStorage data
      sessionStorage.clear(); // Clears all sessionStorage data

      // Call the onLogout callback if provided
      if (onLogout) {
        onLogout();
      }

      // Set a small delay to ensure state updates are processed
      setTimeout(() => {
        // Navigate to home and replace history
        navigate(ROUTES.HOME, { replace: true });
        setIsLoggingOut(false);
      }, 100);
    }
  }, [navigate, onLogout, isLoggingOut]);

  // Show a simple loading state while logout is processing
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-slate-600">Logging out...</div>
    </div>
  );
};

export default Logout;
