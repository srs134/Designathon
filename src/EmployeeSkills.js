import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeSkills.css';

const EmployeeSkills = () => {
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error
    setSkills(null); // Clear previous skills

    if (email === 'gundamrahul19@gmail.com') {
      try {
        const response = await axios.get('http://localhost:5000/api/extract-skills', {
          params: { email }
        });
        setSkills(response.data.skills);
      } catch (error) {
        console.error('Error fetching details:', error);
        setError('Failed to fetch details. Please try again later.');
      }
    } else {
      setError('Not found details');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Employee Skills</h2>


      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Email:
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button className="button" type="submit">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {skills && (
        <div className="skills-list">
          <h3 className="skills-title">Skills for {email}</h3>
          <ul>
            {skills.map((skill, index) => (
              <li className="skill-item" key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeSkills;
