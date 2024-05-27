import React, { useState } from 'react';
import axios from 'axios';
import './GithubSkills.css';

const GithubSkills = () => {
  const [username, setUsername] = useState('');
  const [skills, setSkills] = useState({ languages: [], topics: [] });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSkills({ languages: [], topics: [] });

    try {
      const response = await axios.get('http://localhost:5000/api/github-skills', {
        params: { username },
      });
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
      setError('Failed to fetch details. Please try again later.');
    }
  };

  const formatSkills = () => {
    const allSkills = [
      ...skills.languages.map(lang => `Language: ${lang}`),
      ...skills.topics.map(topic => `Topic: ${topic}`),
    ];
    return allSkills.join('\n');
  };

  return (
    <div className="github-skills-container">
      <h1>GitHub Skill Details</h1>
      <form className="github-skills-form" onSubmit={handleSubmit}>
        <label htmlFor="username">GitHub Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="skills-output">
        <textarea
          readOnly
          className="skills-textbox"
          value={formatSkills()}
          placeholder="Skill details will appear here..."
        />
      </div>
    </div>
  );
};

export default GithubSkills;
