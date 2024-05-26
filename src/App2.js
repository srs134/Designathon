import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [context, setContext] = useState('');
  const [qaPairs, setQaPairs] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answerIndex, setAnswerIndex] = useState(0);
  const [expertise, setExpertise] = useState(0);

  useEffect(() => {
    if (currentQuestion) {
      speak(currentQuestion);
    }
  }, [currentQuestion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/generate_qa', { context });
      setQaPairs(response.data);
      if (response.data.length > 0) {
        setCurrentQuestion(response.data[0].question);
      }
    } catch (error) {
      console.error('Error generating questions and answers', error);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => {
      listen();
    };
  };

  const listen = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCurrentAnswer(transcript);
      evaluateAnswer(transcript);
    };
    recognition.start();
  };

  const evaluateAnswer = (answer) => {
    // Dummy evaluation logic for demonstration
    // Replace this with actual evaluation logic
    if (answer.toLowerCase().includes('correct')) {
      setExpertise((prev) => prev + 1);
    }
    const nextIndex = answerIndex + 1;
    if (nextIndex < qaPairs.length) {
      setCurrentQuestion(qaPairs[nextIndex].question);
      setAnswerIndex(nextIndex);
    } else {
      setCurrentQuestion('');
      alert(`Your expertise score is: ${expertise}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Context-based Q&A Generator</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Enter your text here"
            rows="10"
            cols="50"
          />
          <br />
          <button type="submit">Generate Q&A</button>
        </form>
      </header>
      {currentQuestion && (
        <div>
          <h3>Question: {currentQuestion}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
