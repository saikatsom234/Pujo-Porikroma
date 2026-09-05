import React, { useState } from 'react';
import { Bug, Lightbulb, TriangleAlert, HelpCircle } from 'lucide-react';
import './ReportPopup.css';

const ReportPopup = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState("Something's broken");

  const reportTypes = [
    { id: "Something's broken", icon: Bug },
    { id: "Suggestion", icon: Lightbulb },
    { id: "Wrong info", icon: TriangleAlert },
    { id: "Other", icon: HelpCircle }
  ];

  return (
    <div className="report-overlay" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="report-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-header">
          <h2 className="report-title">Report a problem</h2>
          <p className="report-subtitle">Found a bug or wrong info? Tell us about it.</p>
        </div>

        <div className="report-body">
          <div className="report-type-grid">
            {reportTypes.map(type => {
              const Icon = type.icon;
              return (
                <button 
                  key={type.id}
                  className={`report-type-btn ${selectedType === type.id ? 'selected' : ''}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <Icon size={18} className="report-type-icon" />
                  {type.id}
                </button>
              );
            })}
          </div>

          <div className="report-field">
            <textarea 
              placeholder="Describe what happened or what could be better..." 
              rows="6"
            ></textarea>
          </div>

          <div className="report-field">
            <input 
              type="text" 
              placeholder="Email or phone (optional, if you'd like a reply)" 
            />
          </div>
        </div>

        <div className="report-footer">
          <button className="report-send-btn" onClick={onClose}>
            Send report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;
