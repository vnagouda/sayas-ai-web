import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/sayas-ai-web', { replace: true });
  }, [navigate]);

  return null;
};

export default Logout;
