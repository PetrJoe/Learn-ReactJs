import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './dashboard/Dashboard';
import NotFound from './pages/NotFound';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="*" element={<NotFound />} />
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/login"
                element={<Login onSuccessfulLogin={handleSuccessfulLogin} />}
              />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

