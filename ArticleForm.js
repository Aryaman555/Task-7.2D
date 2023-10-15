import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import ImageUploader from './ImageUploader'; 
import './ArticleForm.css'; 

function ArticleForm() {
  // State variables for the form fields
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [article, setArticle] = useState('');
  const [tag, setTag] = useState('');
  const [imageURL, setImageURL] = useState(''); // Add a state variable to store the image URL

  // Reference to the Firestore collection
  const userCollectionRef = collection(db, 'articles');

  // Function to write user data to Firestore
  const writeUserData = async () => {
    const articleData = {
      title: title,
      abstract: abstract,
      article: article,
      tag: tag,
      imageURL: imageURL, 
    };

    // Add the article data to Firestore
    await addDoc(userCollectionRef, articleData).then(() => {
      alert('Data Uploaded!');
    });
  };

  return (
    <>
      <div className="article_header">
        <h2>Share your article</h2>
        <div className="title">
          <label>Title:</label>
          <input
            type="text"
            placeholder="Enter a descriptive title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="img">
          <h2>Add an image:</h2>
          <ImageUploader setImageURL={setImageURL} /> 
        </div>
        <div className="article_abstract">
          <label>Abstract:</label>
          <input
            type="text"
            placeholder="Enter a 1-paragraph abstract"
            onChange={(event) => {
              setAbstract(event.target.value);
            }}
          />
        </div>
        <div className="article_text">
          <label>Article Text:</label>
          <textarea
            rows="6"
            placeholder="Enter a 1-paragraph description"
            onChange={(event) => {
              setArticle(event.target.value);
            }}
          />
        </div>
        <div className="article_tag">
          <label>Tags:</label>
          <input
            type="text"
            placeholder="Please add up to 3 tags to decribe what your article is about e.g.,Java"
            onChange={(event) => {
              setTag(event.target.value);
            }}
          />
        </div>
        <button onClick={writeUserData} className="Button">
          Post
        </button>
      </div>
    </>
  );
}

export default ArticleForm;
