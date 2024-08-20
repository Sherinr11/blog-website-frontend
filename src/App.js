// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'; // Use HashRouter for GitHub Pages
import { BlogProvider } from './BlogContext';

import HomeDashboard from './components/HomeDashboard';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';
import PostForm from './components/PostForm';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <HashRouter> {/* Use HashRouter for GitHub Pages */}
      <BlogProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/addpost" element={<PostForm />} />
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="*" element={<HomeDashboard />} />
          </Routes>
        </div>
      </BlogProvider>
    </HashRouter>
  );
}

export default App;
