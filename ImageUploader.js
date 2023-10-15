import React, { useState } from 'react';
import { storage } from './firebase'; // Import the Firebase storage configuration
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // Generate a unique filename
import './ImageUploader.css'; // Import your CSS file for styling

function ImageUploader({ setImageURL }) {
  const [imageUpload, setImageUpload] = useState(null);

  // Function to upload the selected image to Firebase Storage
  const uploadImage = () => {
    if (imageUpload === null) {
      return;
    }

    // Generate a unique filename using UUID to avoid conflicts
    const uniqueFileName = `${uuidv4()}_${imageUpload.name}`;
    
    // Create a reference to the 'images' folder in Firebase Storage with the unique filename
    const imageRef = ref(storage, `images/${uniqueFileName}`);

    // Upload the selected image to Firebase Storage
    uploadBytes(imageRef, imageUpload).then(() => {
      // Get the download URL of the uploaded image
      getDownloadURL(imageRef).then((url) => {
        setImageURL(url); // Set the imageURL in the parent component
        alert('Image Uploaded!');
      });
    });
  }

  return (
    <div className="img">
      <input type="file" onChange={(event) => {
        // Update the state with the selected image file
        setImageUpload(event.target.files[0]);
      }} />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default ImageUploader;
