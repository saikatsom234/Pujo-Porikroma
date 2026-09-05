import React from 'react';
import { ChevronDown } from 'lucide-react';
import './HelpSupportPopup.css';

const HelpSupportPopup = ({ onClose }) => {
  return (
    <div className="help-overlay" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="help-content" onClick={(e) => e.stopPropagation()}>
        <div className="help-header">
          <h2 className="help-title">Help & support</h2>
          <p className="help-subtitle">Answers to common questions — or send us a message.</p>
        </div>

        <div className="help-body">
          <div className="help-section-title">FAQS</div>
          <div className="help-faqs">
            <div className="help-faq-item">
              <span>What is Sharodiya?</span>
              <ChevronDown size={18} className="help-faq-icon" />
            </div>
            <div className="help-faq-item">
              <span>How do I plan a pandal-hopping route?</span>
              <ChevronDown size={18} className="help-faq-icon" />
            </div>
            <div className="help-faq-item">
              <span>How do I mark a pandal as visited?</span>
              <ChevronDown size={18} className="help-faq-icon" />
            </div>
          </div>

          <div className="help-section-title">CONTACT US</div>
          <p className="help-contact-subtitle">Can't find an answer? Send us a message and we'll help.</p>
          <div className="help-contact">
            <div className="help-field">
              <input type="text" placeholder="Your name (optional)" />
            </div>
            <div className="help-field">
              <input type="text" placeholder="Email or phone (so we can reply)" />
            </div>
            <div className="help-field">
              <textarea placeholder="How can we help?" rows="4"></textarea>
            </div>
          </div>
        </div>

        <div className="help-footer">
          <button className="help-send-btn" onClick={onClose}>
            Send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPopup;
