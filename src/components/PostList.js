import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { BlogContext } from '../BlogContext';
import './assets/PostList.css';

const PostList = () => {
  const { posts, error, loading, searchPosts } = useContext(BlogContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('title');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Update filteredPosts whenever posts, searchQuery, or searchCriterion change
  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery.trim() !== '') {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = posts.filter(post => {
          const fieldToSearch = post[searchCriterion]?.toLowerCase() || '';
          return fieldToSearch.includes(lowercasedQuery);
        });
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(posts);
      }
    };

    handleSearch(); // Call the search function whenever dependencies change
  }, [posts, searchQuery, searchCriterion]);

  if (loading) {
    return <p className="loading-message">Loading posts...</p>; // Loading state
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Error state
  }

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      <div className="search-container">
        <select
          value={searchCriterion}
          onChange={(e) => setSearchCriterion(e.target.value)}
          className="search-criteria"
        >
          <option value="title">Title</option>
          <option value="authorName">Author</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search by ${searchCriterion}`}
          className="search-input"
        />
        <button onClick={() => setSearchQuery(searchQuery)} className="search-button">
          Search
        </button>
      </div>
      <ul>
        {filteredPosts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          filteredPosts.map(post => (
            <li key={post._id}>
              <h3>
                <Link to={`/posts/${post._id}`}>{post.title}</Link> {/* Link to single post */}
              </h3>
              <p><strong>Author:</strong> {post.authorName}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PostList;
