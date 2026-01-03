// Header.js - Top navigation bar with logo

import React from 'react';

function Header({ currentView, onNavigateHome }) {
  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div 
          className="header__logo" 
          onClick={onNavigateHome}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && onNavigateHome()}
          aria-label="Go to home page"
        >
          <span className="header__logo-icon" role="img" aria-label="house">🏠</span>
          <span>EstateAgent Pro</span>
        </div>

        {/* Nav links */}
        <nav className="header__nav" role="navigation" aria-label="Main navigation">
          <button
            className={`header__nav-link ${currentView === 'search' ? 'header__nav-link--active' : ''}`}
            onClick={onNavigateHome}
            aria-current={currentView === 'search' ? 'page' : undefined}
          >
            Search Properties
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
