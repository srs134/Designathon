import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left">
        <h1>Skill Management Application</h1>
      </div>
      <div className="right">
        <Link to="/home">Home</Link>
        <Link to="/EmployeeSkills">Linkedln Connect</Link>
        <Link to="/AddSkill">Add Skill</Link>
        <Link to="/UpdateSkills">Github Connect</Link>
      </div>
    </nav>
  );
};

export default Navbar;
