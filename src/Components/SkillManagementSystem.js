import React, { useState } from 'react';
import "../Styles/Skill.css";

function SkillManagementSystem() {
  const [employeeSkills, setEmployeeSkills] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Function to add a new skill to the database for the selected employee
  const addSkill = () => {
    // Perform validation checks before adding the skill
    if (!selectedEmployee || !newSkill || yearsOfExperience <= 0) {
      alert('Please select an employee and provide valid skill and experience!');
      return;
    }

    // Add the new skill to the employee's skills database
    const updatedSkills = [...employeeSkills];
    updatedSkills.push({ employee: selectedEmployee, skill: newSkill, experience: yearsOfExperience });
    setEmployeeSkills(updatedSkills);

    // Clear the input fields
    setNewSkill('');
    setYearsOfExperience(0);
  };

  // Function to extract skill data from various sources
  const extractSkillData = () => {
    // Implement logic to extract skill data from employee profiles, learning records, etc.
    setIsLoading(true);
    // Simulating API call with setTimeout
    setTimeout(() => {
      // Set isLoading to false after data extraction is complete
      setIsLoading(false);
      alert('Skill data extraction completed!');
    }, 2000);
  };

  return (
    <div>
      <h1>Skill Management System</h1>
      <div>
        <h2>Employee Skills Database</h2>
        <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">Select Employee</option>
          {/* Populate dropdown with list of employees */}
          <option value="employee1">Employee 1</option>
          <option value="employee2">Employee 2</option>
          {/* Add more options as needed */}
        </select>
        <input
          type="text"
          placeholder="Enter new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <input
          type="number"
          placeholder="Years of Experience"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(parseInt(e.target.value))}
        />
        <button onClick={addSkill}>Add Skill</button>
        {/* Display employee skills */}
        <ul>
          {employeeSkills.map((skill, index) => (
            <li key={index}>
              {skill.employee}: {skill.skill} - {skill.experience} years
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Skill Data Extraction</h2>
        <button onClick={extractSkillData}>
          {isLoading ? 'Extracting Skill Data...' : 'Extract Skill Data'}
        </button>
      </div>
    </div>
  );
}

export default SkillManagementSystem;
