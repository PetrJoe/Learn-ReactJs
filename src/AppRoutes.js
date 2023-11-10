import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import NotFound from './Pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSuccessfulLogin = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="*" element={<NotFound />} />
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard/"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about/" element={<About />} />
              <Route path="/contact/" element={<Contact />} />
              <Route
                path="/login"
                element={<Login onSuccessfulLogin={handleSuccessfulLogin} />}
              />
              <Route path="/register/" element={<Register />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;