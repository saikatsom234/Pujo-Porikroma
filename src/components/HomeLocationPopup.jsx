import React from 'react';
import { Search, Crosshair } from 'lucide-react';
import './HomeLocationPopup.css';

const HomeLocationPopup = ({ onClose }) => {
  return (
    <div className="home-loc-overlay" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="home-loc-content" onClick={(e) => e.stopPropagation()}>
        <div className="home-loc-header">
          <h2 className="home-loc-title">Set home location</h2>
          <p className="home-loc-subtitle">Search or drag the map to centre the pin</p>
        </div>

        <div className="home-loc-search-box">
          <Search size={20} className="home-loc-search-icon" />
          <input 
            type="text" 
            placeholder="Search area or landmark" 
            className="home-loc-search-input"
          />
          <button className="home-loc-go-btn">Go</button>
        </div>

        <button className="home-loc-current-btn">
          <Crosshair size={20} />
          Use my current location
        </button>

        <div className="home-loc-map-area">
          {/* Future Map Will be added */}
          <div className="home-loc-map-placeholder">
            Future Map<br/>Will be added
          </div>
        </div>

        <div className="home-loc-footer">
          <button className="home-loc-save-btn" onClick={onClose}>
            Set as home location
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeLocationPopup;
