import React from 'react';
import { X } from 'lucide-react';
import './ThirdPagePopup.css';

const ThirdPagePopup = ({ onClose }) => {
  return (
    <div className="third-page-overlay fade-in" onClick={onClose}>
      <div className="third-page-content slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="third-page-header">
          <h2 className="third-page-title">Puja Schedule & Info</h2>
          <button className="third-page-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="third-page-image-container">
          <img 
            src="/third-page-image.jpg" 
            alt="Puja Schedule" 
            className="third-page-image" 
          />
        </div>
      </div>
    </div>
  );
};

export default ThirdPagePopup;
