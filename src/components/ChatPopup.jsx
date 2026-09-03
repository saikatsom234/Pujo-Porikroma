import React, { useState } from 'react';
import { X } from 'lucide-react';
import './ChatPopup.css';

const ChatPopup = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('adda');

  return (
    <div className="chat-popup-overlay">
      <div className="chat-popup-container">
        {/* Header Section */}
        <div className="chat-popup-header">
          <div className="chat-popup-header-top">
            <h2 className="chat-popup-title bengali-text">পূজার আড্ডা</h2>
            <button className="chat-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="chat-popup-outline"></div>
        </div>

        {/* Tabs Section */}
        <div className="chat-popup-tabs-container">
          <div className="chat-popup-tabs bengali-text">
            <button 
              className={`chat-tab-btn ${activeTab === 'adda' ? 'active' : ''}`}
              onClick={() => setActiveTab('adda')}
            >
              আড্ডা
            </button>
            <button 
              className={`chat-tab-btn ${activeTab === 'group_adda' ? 'active' : ''}`}
              onClick={() => setActiveTab('group_adda')}
            >
              গ্রুপ আড্ডা
            </button>
          </div>
        </div>

        {/* Content Section (Empty for now) */}
        <div className="chat-popup-content">
          {activeTab === 'adda' && (
            <div className="chat-content-placeholder bengali-text">
              {/* Adda content goes here */}
            </div>
          )}
          {activeTab === 'group_adda' && (
            <div className="chat-content-placeholder bengali-text">
              {/* Group Adda content goes here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
