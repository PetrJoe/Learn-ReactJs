import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/');
  }

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/contact', text: 'Contact' },
  ];

  return (
    <div>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className='bg-gray-900 text-white rounded-md px-3 py-2 text-xl font-medium'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043a3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043a3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg> 
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</Link>
                <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Logout</button>
              </>
            ) : (
              <>
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                    {link.text}
                  </Link>
                ))}
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-white text-2xl" onClick={toggleSidebar}>&#9776;</button>
          </div>

        </div>
      </nav>
      
      <div className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-75 z-50 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="flex justify-end p-4">
          <button className="text-white text-2xl" onClick={toggleSidebar}>&times;</button>
        </div>
       
        <div className="flex flex-col items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-white mb-2" onClick={closeSidebar}>Home</Link>
              <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Logout</button>
            </>
          ) : (
            <>
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className="text-white mb-2" onClick={closeSidebar}>
                  {link.text}
                </Link>
              ))}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Navbar;
