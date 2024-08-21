import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BlogContext = createContext();

const API_URL = 'https://blog-website-backend-phi.vercel.app/api/v1/blogs';

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/readAllContent`);
        
        if (response.data && response.data.data) {
          setPosts(response.data.data);
        } else {
          setError('Unexpected response structure.');
        }
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${API_URL}/writeContent`, newPost);
     
      if (response.data && response.data.data.secretKey) {
        // Refetch posts after successfully adding a new post
        await fetchPosts();
        return response.data;
      } else {
        throw new Error('Failed to add post. No secret key returned.');
      }
    } catch (err) {
      console.error('Error adding post:', err);
      throw err;
    }
  };

  const searchPosts = async (query) => {
    try {
      const response = await axios.get(`${API_URL}/searchBlog`, { params: query });
     
      if (response.data && response.data.data) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (err) {
      setError('Failed to search posts.');
      console.error('Error searching posts:', err);
      return [];
    }
  };

  const deletePost = async (id, key) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteBlog/${id}/${key}`);
      
      if (response.data && response.data.msg === 'Blog deleted') {
        // Refetch posts after successfully deleting a post
        await fetchPosts();
        return response.data;
      } else {
        throw new Error(response.data.msg || 'Failed to delete post');
      }
    } catch (err) {
      
      throw new Error('Failed to delete post');
    }
  };


  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/readAllContent`);
      
      if (response.data && response.data.data) {
        setPosts(response.data.data);
      } else {
        setError('Unexpected response structure.');
      }
    } catch (err) {
      setError('Failed to fetch posts.');
      console.error('Error fetching posts:', err);
    }
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, searchPosts, deletePost, loading, error }}>
      {children}
    </BlogContext.Provider>
  );
};
