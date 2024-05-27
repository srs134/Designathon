// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Navbar from './Navbar';
import Home from './Home'; // Create this component
import EmployeeSkills from './EmployeeSkills';
import AddSkill from './AddSkill';
import UpdateSkills from './UpdateSkills';
import Admin from './Admin';
import GithubSkills from './GithubSkills';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<><Navbar /><Home /></>} />
          <Route path="/EmployeeSkills" element={<><Navbar /><EmployeeSkills /></>} />
          <Route path="/AddSkill" element={<><Navbar /><AddSkill /></>} />
          <Route path="/GithubSkills" element={<><Navbar /><GithubSkills /></>} />
          <Route path="/AddSkillOnly" element={<AddSkill />} /> {/* New route for AddSkill only */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
