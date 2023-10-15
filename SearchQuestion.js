import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import './SearchQuestion.css';

function FindQuestion() {
  const [questions, setQuestions] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterDate, setFilterDate] = useState(''); // New state for date filtering
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    tag: '',
    desc: '',
    date: '', // Add a date field
  });
  const [expandedIndex, setExpandedIndex] = useState(null);

  const userQuestionsRef = collection(db, 'questions');
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const q = query(
        userQuestionsRef,
        orderBy('date', 'desc') // Order questions by date in descending order
      );
      const data = await getDocs(q);
      const questionData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionData);
      setFilteredQuestions(questionData);
    };
    getQuestions();
  }, []);

  const handleFilter = () => {
    const filteredQuestions = questions.filter(
      (question) =>
        question.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        question.tag.toLowerCase().includes(filterTag.toLowerCase()) &&
        (filterDate === '' || question.date.includes(filterDate)) // Date filtering
    );
    setFilteredQuestions(filteredQuestions);
  };

  const handleDeleteQuestion = async (id) => {
    await deleteDoc(doc(db, 'questions', id));
    const updatedQuestions = filteredQuestions.filter((question) => question.id !== id);
    setFilteredQuestions(updatedQuestions);
  };

  const handleSubmitNewQuestion = async () => {
    const newQuestionWithDate = {
      ...newQuestion,
      date: new Date().toLocaleString(), // Add the current date and time
    };
    await addDoc(collection(db, 'questions'), newQuestionWithDate);
    setFilteredQuestions([...filteredQuestions, newQuestionWithDate]);
    setNewQuestion({ title: '', tag: '', desc: '', date: '' });
  };

  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div>
      <h1>Filter Questions</h1>
      <div className="filter">
        <h5>Title:</h5>
        <input
          type="text"
          placeholder="Filter by title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />

        <h5>Tag:</h5>
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />

        <h5>Date:</h5>
        <input
          type="text"
          placeholder="Filter by date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <button onClick={handleFilter}>Filter</button>
      </div>

      <h1>Add New Question</h1>
      <div className="newQuestion">
        <h5>Title:</h5>
        <input
          type="text"
          placeholder="Title"
          value={newQuestion.title}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, title: e.target.value })
          }
        />
        <h5>Description:</h5>
        <input
          type="text"
          placeholder="Description"
          value={newQuestion.desc}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, desc: e.target.value })
          }
        />

        <h5>Tag:</h5>
        <input
          type="text"
          placeholder="Tag"
          value={newQuestion.tag}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, tag: e.target.value })
          }
        />
        <button onClick={handleSubmitNewQuestion}>Submit</button>
      </div>

      <h1>Questions</h1>
      {filteredQuestions.map((question, index) => (
        <div className="card" key={question.id}>
          <h2>Question: {index + 1}</h2> 
          <h2>Title: {question.title}</h2>
          <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
          <button onClick={() => handleExpand(index)}>
            {expandedIndex === index ? 'Collapse' : 'Expand'}
          </button>
          {expandedIndex === index && (
            <div>
              <h3>More Details:</h3>
              <p>Description: {question.desc}</p>
              <p>Tag: {question.tag}</p>
              <p>Date: {question.date}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FindQuestion;
