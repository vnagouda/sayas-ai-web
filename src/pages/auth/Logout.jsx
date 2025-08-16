import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes as ROUTES } from '../../utils';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all auth data
    localStorage.removeItem("sayasUser");
    
    // Replace the current history entry and redirect to login
    // This prevents going back to protected pages
    navigate(ROUTES.HOME, { replace: true });
    
    // Clear any remaining history entries
    window.history.pushState(null, "", ROUTES.HOME);
  }, [navigate]);

  return null;
};

export default Logout;
