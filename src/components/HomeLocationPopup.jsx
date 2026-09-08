import React from 'react';
import { Search, Crosshair } from 'lucide-react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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

        <div className="home-loc-map-area" style={{ position: 'relative' }}>
          <MapContainer 
            center={[22.5726, 88.3639]} 
            zoom={13} 
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </MapContainer>
          
          {/* Static center pin */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', zIndex: 1000, pointerEvents: 'none' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#ff4b4b" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.5))' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="white"></circle>
            </svg>
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
