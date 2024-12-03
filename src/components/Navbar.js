import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <h1>Hagverkfræði</h1>
      <ul>
        <li><Link to="/">Heim</Link></li>
        <li><Link to="/calculator">Reiknivél</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
