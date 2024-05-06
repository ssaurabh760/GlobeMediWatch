// AuthWrapper.tsx
/**
 * AuthWrapper component
 * Handles user authentication and role-based access control
 */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { getCurrentUser } from './client';
import { User } from '../models/user';
import { useNavigate } from 'react-router-dom';

interface AuthWrapperProps {
  allowedRoles?: string[];
  children: (user: User) => React.ReactNode;
}

/**
 * AuthWrapper component
 * @param {AuthWrapperProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const AuthWrapper: React.FC<AuthWrapperProps> = ({ allowedRoles, children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Fetches the current user
     */
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setLoading(false);
      } catch (error) {
        setError('User not found or token expired. Please login again.');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /**
   * Renders the loading state
   * @returns {JSX.Element} Loading component
   */
  const renderLoading = () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );

  /**
   * Renders the error state
   * @returns {JSX.Element} Error component
   */
  const renderError = () => (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Typography variant="h6" color="error" gutterBottom>
        {error}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/signin')}>
        Go to Login
      </Button>
    </Box>
  );

  /**
   * Renders the access denied state
   * @returns {JSX.Element} Access denied component
   */
  const renderAccessDenied = () => (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
      <Typography variant="h6" color="error" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        You don't have permission to access this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  );

  // Render loading state
  if (loading) {
    return renderLoading();
  }

  // Render error state
  if (error) {
    return renderError();
  }

  // Check if user has the required role
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return renderAccessDenied();
  }

  // Render the children components with the authenticated user
  return <>{children(user as User)}</>;
};

export default AuthWrapper;