import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for styling
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Question.css';

function QuestionForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(new Date()); // Initialize date with the current date

  const userCollectionRef = collection(db, 'questions');

  const writeUserData = async () => {
    const currentDate = date.toLocaleString(); // Convert the selected date to a string

    await addDoc(userCollectionRef, { title: title, desc: desc, tag: tag, date: currentDate }).then(() => {
      alert('Data Uploaded!');
    });
  };

  return (
    <>
      <div className="Question_header">
        <h2>What do you want to ask or share ?</h2>
        <div className="question_title">
          <label>Title:</label>
          <input type="text" placeholder="Start your question with how, what, why, etc." onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="Question_text">
          <label>Description:</label>
          <textarea
            rows="4"
            onChange={(event) => setDesc(event.target.value)}
          />
        </div>
        <div className="question_tag">
          <label>Tags:</label>
          <input type="text" placeholder="Please add up to 3 tags to decribe what your question is about e.g.,Java" onChange={(event) => setTag(event.target.value)} />
        </div>
        <div className="question_date">
          <label>Date:</label>
          <DatePicker
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
          />
        </div>
        <button onClick={writeUserData} className="Button">
          Post
        </button>
      </div>
    </>
  );
}

export default QuestionForm;
