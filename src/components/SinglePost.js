import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogContext } from '../BlogContext';
import './assets/SinglePost.css';

const SinglePost = () => {
  const { id } = useParams();
  const { posts, loading, error, deletePost } = useContext(BlogContext);
  const [post, setPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !error) {
      const foundPost = posts.find(post => post._id === id);
      setPost(foundPost);
    }
  }, [posts, id, loading, error]);

  const handleDelete = async () => {
    try {
      await deletePost(id, secretKey);
      alert('Post deleted successfully!');
      navigate('/'); 
    } catch (error) {
      alert(error.message || 'Failed to delete post');
    }
    setIsModalOpen(false);
  };

  if (loading) {
    return <p className="loading-message">Loading post...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="single-post">
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.authorName}</p>
     
      <div className="timestamps">
        <p><strong>Created At:</strong> {new Date(post.createdAt).toLocaleDateString()} <span>{new Date(post.createdAt).toLocaleTimeString()}</span></p>
        <p><strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleDateString()} <span>{new Date(post.updatedAt).toLocaleTimeString()}</span></p>
      </div>
      <p className="content">{post.content}</p>
      <button onClick={() => setIsModalOpen(true)} className="delete-button">
        Delete Post
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter Secret Key to Delete Post</h3>
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter secret key"
            />
            <button onClick={handleDelete}>Submit</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
