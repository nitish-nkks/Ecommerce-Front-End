import React, { useState } from 'react';
import '../HomePage/FloatingButton.css';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  const handleFlashSaleClick = () => {
    // Navigate to flash sale page using the correct route from your App.jsx
    window.location.href = '/flashsale';
    setIsOpen(false);
  };

  return (
    <div className="floating-buttons-container">
      {/* Main Flash Sale Toggle Button */}
      <button 
        className={`floating-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={!isOpen ? toggleButtons : handleFlashSaleClick}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="flash-icon">
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
        </svg>
        {isOpen && <span className="btn-text-inline">Flash Sale</span>}
      </button>
    </div>
  );
};

export default FloatingButtons;