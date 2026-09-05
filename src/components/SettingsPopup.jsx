import React, { useState } from 'react';
import { 
  X, Pencil, MapPin, Bell, Flag, HelpCircle, 
  Share2, LogOut, Navigation, Home, Flame 
} from 'lucide-react';
import EditProfilePopup from './EditProfilePopup';
import HomeLocationPopup from './HomeLocationPopup';
import RequestPandalPopup from './RequestPandalPopup';
import ReportPopup from './ReportPopup';
import HelpSupportPopup from './HelpSupportPopup';
import InviteFriendsPopup from './InviteFriendsPopup';
import './SettingsPopup.css';

const SettingsPopup = ({ onClose, onLogout }) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showHomeLocation, setShowHomeLocation] = useState(false);
  const [showRequestPandal, setShowRequestPandal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const userGender = 'male'; // Can be changed to 'female' to test the female avatars

  const [avatarSrc] = useState(() => {
    const maleAvatars = [
      '/avatar-male-1.png',
      '/avatar-male-2.png',
      '/avatar-male-3.png',
      '/user logo1.png',
      '/user logo3.png',
      '/user logo4.png',
      '/user logo6.png'
    ];
    const femaleAvatars = [
      '/avatar-female-1.png',
      '/user logo2.png',
      '/user logo5.png',
      '/user logo7.png'
    ];
    
    const arrayToUse = userGender === 'female' ? femaleAvatars : maleAvatars;
    return arrayToUse[Math.floor(Math.random() * arrayToUse.length)];
  });

  return (
    <div className="settings-popup-overlay fade-in" onClick={onClose}>
      <div 
        className="settings-popup-content slide-up" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Profile Section */}
        <div className="settings-profile-section">
          <div className="settings-avatar-wrapper">
            <img src={avatarSrc} alt="User Avatar" className="settings-avatar" />
          </div>
          <div className="settings-profile-info">
            <h2 className="settings-username">USER</h2>
            <p className="settings-email">user@gmail.com</p>
            <div className="settings-badge">
              <Flame size={12} className="settings-badge-icon" />
              <span>Pandal Explorer</span>
            </div>
          </div>
          <button className="settings-edit-btn" onClick={() => setShowEditProfile(true)}>
            <Pencil size={18} />
          </button>
        </div>

        <div className="settings-scroll-area">
          {/* Journey Section */}
          <div className="settings-section">
            <h3 className="settings-section-title">Your Pujo journey</h3>
            <div className="settings-journey-cards">
              <div className="settings-journey-card">
                <div className="settings-journey-icon-wrap">
                  <Home size={20} />
                </div>
                <div className="settings-journey-stats">
                  <span className="settings-stat-number">0</span>
                  <span className="settings-stat-label">Visited</span>
                </div>
              </div>
              <div className="settings-journey-divider"></div>
              <div className="settings-journey-card">
                <div className="settings-journey-icon-wrap alt-icon">
                  <Navigation size={20} />
                </div>
                <div className="settings-journey-stats">
                  <span className="settings-stat-number">0</span>
                  <span className="settings-stat-label">In route</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="settings-section">
            <h3 className="settings-section-title">Preferences</h3>
            <div className="settings-list-group">
              <div className="settings-list-item" onClick={() => setShowHomeLocation(true)}>
                <div className="settings-list-icon">
                  <MapPin size={20} />
                </div>
                <div className="settings-list-text">
                  <h4>Home location</h4>
                  <p>Current location</p>
                </div>
                <div className="settings-list-action">
                  <span className="chevron">›</span>
                </div>
              </div>

              <div className="settings-list-item">
                <div className="settings-list-icon">
                  <Bell size={20} />
                </div>
                <div className="settings-list-text">
                  <h4>Push notifications</h4>
                  <p>Crowd & route alerts</p>
                </div>
                <div className="settings-list-action">
                  <div 
                    className={`settings-toggle ${pushEnabled ? 'active' : ''}`}
                    onClick={() => setPushEnabled(!pushEnabled)}
                  >
                    <div className="settings-toggle-knob"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="settings-section">
            <h3 className="settings-section-title">Support</h3>
            <div className="settings-list-group">
              <div className="settings-list-item" onClick={() => setShowRequestPandal(true)}>
                <div className="settings-list-icon">
                  <MapPin size={20} />
                </div>
                <div className="settings-list-text">
                  <h4>Request a pandal</h4>
                  <p>Missing a pandal? Tell us about it</p>
                </div>
                <div className="settings-list-action">
                  <span className="chevron">›</span>
                </div>
              </div>

              <div className="settings-list-item" onClick={() => setShowReport(true)}>
                <div className="settings-list-icon">
                  <Flag size={20} />
                </div>
                <div className="settings-list-text">
                  <h4>Report</h4>
                  <p>Report a bug or wrong info</p>
                </div>
                <div className="settings-list-action">
                  <span className="chevron">›</span>
                </div>
              </div>

              <div className="settings-list-item" onClick={() => setShowHelp(true)}>
                <div className="settings-list-icon">
                  <HelpCircle size={20} />
                </div>
                <div className="settings-list-text">
                  <h4>Help & support</h4>
                  <p>FAQs, contact us</p>
                </div>
                <div className="settings-list-action">
                  <span className="chevron">›</span>
                </div>
              </div>

              <div className="settings-list-item" onClick={() => setShowInvite(true)}>
                <div className="settings-list-icon">
                  <Share2 size={20} />
                </div>
                <div className="settings-list-text">
                  <h4>Invite friends</h4>
                  <p>Share Pujo Porikroma with friends</p>
                </div>
                <div className="settings-list-action">
                  <span className="chevron">›</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <button className="settings-signout-btn">
            <LogOut size={18} />
            <span>Sign out</span>
          </button>

          {/* Footer */}
          <div className="settings-footer bengali-text">
            Pujo Porikroma V0.1 · Durga Puja 2026
          </div>
        </div>
      </div>
      {showEditProfile && (
        <EditProfilePopup 
          onClose={() => setShowEditProfile(false)} 
          avatarSrc={avatarSrc}
        />
      )}

      {showHomeLocation && (
        <HomeLocationPopup 
          onClose={() => setShowHomeLocation(false)} 
        />
      )}

      {showRequestPandal && (
        <RequestPandalPopup 
          onClose={() => setShowRequestPandal(false)} 
        />
      )}

      {showReport && (
        <ReportPopup 
          onClose={() => setShowReport(false)} 
        />
      )}

      {showHelp && (
        <HelpSupportPopup 
          onClose={() => setShowHelp(false)} 
        />
      )}

      {showInvite && (
        <InviteFriendsPopup 
          onClose={() => setShowInvite(false)} 
        />
      )}
    </div>
  );
};

export default SettingsPopup;
