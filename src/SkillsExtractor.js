import React, { useState } from 'react';
import axios from 'axios';

const SkillsExtractor = () => {
  const [skills, setSkills] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSkills = async () => {
    try {
      setSkills('');  // Clear previous skills
      setErrorMessage('');  // Clear previous error message
      const response = await axios.get(`http://localhost:5000/api/extract-skills?email=${encodeURIComponent(email)}`);
      if (response.data.skills.length === 0) {
        setErrorMessage('Details not found for this email.');
      } else {
        setSkills(response.data.skills.join('\n'));
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      setErrorMessage('Failed to fetch skills. Please try again later.');
    }
  };

  const handleButtonClick = () => {
    fetchSkills();
  };

  return (
    <div>
      <h2>Skills Extractor</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={handleButtonClick}>Fetch Skills</button>
      <textarea
        value={skills}
        rows={10}
        style={{ width: '100%' }}
        readOnly
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default SkillsExtractor;
