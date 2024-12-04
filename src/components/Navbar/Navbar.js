import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Hagverkfræði</Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/calculator" className={styles.navLink}>
          Reiknivél
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
