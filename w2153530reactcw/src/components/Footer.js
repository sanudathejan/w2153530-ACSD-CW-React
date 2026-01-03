// Footer.js - Bottom footer with copyright

import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">
          © {currentYear} EstateAgent Pro - Advanced Client-Side Web Development
        </p>
        <p className="footer__text">
          University of Westminster - 5COSC026W Coursework
        </p>
      </div>
    </footer>
  );
}

export default Footer;
