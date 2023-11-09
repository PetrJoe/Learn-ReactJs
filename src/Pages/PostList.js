import React, { useState, useEffect } from 'react';

const PostList = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/posts/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error('Error:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(token);
  }, [token]);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
