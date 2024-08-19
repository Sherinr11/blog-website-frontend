import React, { useState, useContext } from 'react';
import { BlogContext } from '../BlogContext'; 
import './assets/PostForm.css';

const PostForm = () => {
  const { addPost } = useContext(BlogContext); 
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 
  const [secretKey, setSecretKey] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authorName || !title || !content) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await addPost({ authorName, title, content });

      const { secretKey } = response.data; 
      setSecretKey(secretKey); 
      setSuccess('Post added successfully!');
      
      setAuthorName('');
      setTitle('');
      setContent('');
      setError(null);
    } catch (err) {
      setError('Failed to add post.');
      setSuccess(null);
      setSecretKey(null);
    }
  };

  return (
    <div className="post-form">
      <h2>Add New Post</h2>
      <p style={{color:"red"}}>Note: Secret Key is used to remove post.(Keep it Safe.)</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Author Name"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
        />
        <button type="submit">Save Post</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && (
        <div className="success-message">
          {secretKey && (
            <p className="secret-key">
              <strong>Secret Key:</strong> {secretKey}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostForm;
