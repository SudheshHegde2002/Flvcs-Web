import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For development, we'll default to true
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Here we would check if the user is authenticated by checking local storage or cookies
    // For now, we'll just simulate a API call
    const checkAuth = async () => {
      try {
        // In a real app, we would check for a token in localStorage
        const token = localStorage.getItem('auth_token');
        
        // If no token, user is not authenticated
        if (!token) {
          setIsAuthenticated(false);
        }
        
        // In a real app, we would verify the token with an API call
        
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
    // You could add a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 