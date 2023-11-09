import React, { useState, useEffect } from 'react';
import { BrowserRouter as Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element: Element }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn ? <Element /> : <Navigate to="/login" />;
};


export default ProtectedRoute;
