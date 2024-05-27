import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [employeeId, setEmployeeId] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    setSkills(''); // Clear previous skills

    try {
      const response = await axios.get('http://localhost:5000/api/employee-skills', {
        params: { id: employeeId },
      });
      setSkills(response.data.skills.join('\n'));
    } catch (error) {
      console.error('Error fetching details:', error);
      setError('Failed to fetch details. Please try again later.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Employee Skill Details</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
        <label htmlFor="employeeId">Employee ID</label>
        <input
          type="text"
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="skills-output">
        <textarea
          readOnly
          placeholder="Skill details will appear here..."
          value={skills}
        />
      </div>
    </div>
  );
}

export default Admin;
