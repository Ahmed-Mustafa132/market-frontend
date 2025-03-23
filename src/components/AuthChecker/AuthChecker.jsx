import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

function AuthChecker() {
  const location = useLocation();
  const { checkAuth } = useAuth();
  
  useEffect(() => {
    checkAuth();
  }, [location.pathname, checkAuth]);
  
  return null; 
}

export default AuthChecker;
