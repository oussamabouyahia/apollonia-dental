import React from "react";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <nav className="menu">
      <img src="logo192.png" alt="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {" "}
          <Link to="/list">Aplonia staff</Link>
        </li>
        <li>
          {" "}
          <Link to="/new">Add Employee</Link>
        </li>
        <li>
          <Link to="/">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
