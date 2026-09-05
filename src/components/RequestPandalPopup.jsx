import React from 'react';
import { Crosshair } from 'lucide-react';
import './RequestPandalPopup.css';

const RequestPandalPopup = ({ onClose }) => {
  return (
    <div className="req-pandal-overlay" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="req-pandal-content" onClick={(e) => e.stopPropagation()}>
        <div className="req-pandal-header">
          <h2 className="req-pandal-title">Request a pandal</h2>
          <p className="req-pandal-subtitle">Know a pandal that is missing from the map? Send us the details.</p>
        </div>

        <div className="req-pandal-body">
          <div className="req-pandal-field">
            <label>Pandal name</label>
            <input type="text" placeholder="e.g. Bagbazar Sarbojanin Durgotsab" />
          </div>

          <div className="req-pandal-field">
            <label>Area</label>
            <input type="text" placeholder="e.g. Bagbazar, North Kolkata" />
          </div>

          <div className="req-pandal-field">
            <label>
              Google Maps location <span className="req-pandal-optional">· optional</span>
            </label>
            <input type="text" placeholder="Paste a Google Maps link or coordinates" />
            <button className="req-pandal-current-loc-btn">
              <Crosshair size={16} />
              Use my current location
            </button>
          </div>

          <div className="req-pandal-field">
            <label>
              Anything else <span className="req-pandal-optional">· optional</span>
            </label>
            <textarea placeholder="Landmark, theme, nearest metro..." rows="3"></textarea>
          </div>
        </div>

        <div className="req-pandal-footer">
          <button className="req-pandal-send-btn" onClick={onClose}>
            Send request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestPandalPopup;
