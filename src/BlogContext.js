import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BlogContext = createContext();

const API_URL = 'https://blog-website-backend-phi.vercel.app/api/v1/blogs';

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/readAllContent`)
      .then(response => {
        if (response.data && response.data.data) {
          setPosts(response.data.data);
        } else {
          setError('Unexpected response structure.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch posts.');
        setLoading(false);
      });
  }, []);

  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${API_URL}/writeContent`, newPost);
      if (response.data && response.data.data.secretKey) {
        setPosts([...posts, response.data.data]);
        return response.data;
      } else {
        throw new Error('Failed to add post. No secret key returned.');
      }
    } catch (error) {
      throw error;
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
    } catch (error) {
      setError('Failed to search posts.');
      return [];
    }
  };

  const deletePost = async (id, key) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteBlog/${id}/${key}`);
      if (response.data && response.data.msg === 'Blog deleted') {
        setPosts(posts.filter(post => post._id !== id));
        return response.data;
      } else {
        throw new Error(response.data.msg || 'Failed to delete post');
      }
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, searchPosts, deletePost, loading, error }}>
      {children}
    </BlogContext.Provider>
  );
};
