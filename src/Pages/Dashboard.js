import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse JSON string to object
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
