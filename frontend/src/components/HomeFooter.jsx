import React from "react";
import "../styles/HomeFooter.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo"></div>
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Portfolio</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-social">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 PhotographySite. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
