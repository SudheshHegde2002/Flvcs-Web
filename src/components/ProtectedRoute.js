import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false until verified
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if the user is authenticated by checking local storage
    const checkAuth = async () => {
      try {
        // Check for a token in localStorage
        const token = localStorage.getItem('auth_token');
        
        // If no token, user is not authenticated
        if (!token) {
          console.log('No auth token found, redirecting to login');
          setIsAuthenticated(false);
        } else {
          console.log('Auth token found, user is authenticated');
          setIsAuthenticated(true);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 