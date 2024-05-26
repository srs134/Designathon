import React, { useState, useEffect } from 'react';

const SkillsExtractor = () => {
  const [skills, setSkills] = useState([]);
  const [textSkills, setTextSkills] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/extract-skills');
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }
      const data = await response.json();
      setSkills(data.skills);
      setTextSkills(data.skills.join('\n')); // Convert array to string with line breaks
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Skills Extractor</h2>
      <textarea
        value={textSkills}
        rows={10} // Set the number of rows for the textarea
        style={{ width: '100%' }} // Set the width of the textarea
        readOnly // Make the textarea read-only
      />
    </div>
  );
};

export default SkillsExtractor;
