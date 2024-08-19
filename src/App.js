// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './BlogContext';

import HomeDashboard from './components/HomeDashboard';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';
import ErrorPage from './components/ErrorPage';
import PostForm from './components/PostForm';
import Navbar from './components/Navbar'; // Import the Navbar component

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <div className="App">
          <Navbar /> {/* Add the Navbar here */}
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/addpost" element={<PostForm />} />
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;
