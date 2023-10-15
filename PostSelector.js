// PostSelector.js
import React from 'react';
import './PostSelector.css';

function PostSelector({ postType, setPostType }) {
  // Function to handle the change in post type selection
  const handlePostTypeChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setPostType(name);
    }
  };

  return (
    <div className="post-selector">
      <label>Select Post Type:</label>
      <div className="post-options">
        {/* Option 1: Question */}
        <input
          type="checkbox"
          id="question"
          name="question"
          checked={postType === 'question'}
          onChange={handlePostTypeChange}
        />
        <label htmlFor="question">Question</label>
      </div>
      <div className="post-options">
        {/* Option 2: Article */}
        <input
          type="checkbox"
          id="article"
          name="article"
          checked={postType === 'article'}
          onChange={handlePostTypeChange}
        />
        <label htmlFor="article">Article</label>
      </div>
      <div className="post-options">
        {/* Option 3: Find Question */}
        <input
          type="checkbox"
          id="FindQuestion"
          name="FindQuestion"
          checked={postType === 'FindQuestion'}
          onChange={handlePostTypeChange}
        />
        <label htmlFor="FindQuestion">Find Question</label>
      </div>
    </div>
  );
}

export default PostSelector;
