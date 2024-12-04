import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>Búið til af Kristófer Birgir</p>
          <p>Öll ábyrgð áskilin</p>
        </div>
        <div className="footer-right">
          <a
            href="https://github.com/kristoferbirgir"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/kristoferbirgir"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
