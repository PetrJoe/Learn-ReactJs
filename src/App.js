import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import './App.css';
import AppRoutes from './AppRoutes';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Router>
          <Navbar IsAuthenticated={isLoggedIn} onLogout={handleLogout} />
          <AppRoutes />
        </Router>
      )}
    </>
  );

};

export default App;


