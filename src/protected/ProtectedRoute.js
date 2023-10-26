import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    navigate('/login'); 
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
