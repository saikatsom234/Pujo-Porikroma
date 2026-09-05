import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import './EditProfilePopup.css';

const EditProfilePopup = ({ onClose, avatarSrc, initialName = 'USER', initialEmail = 'user@gmail.com' }) => {
  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [dob, setDob] = useState('');

  return (
    <div className="edit-profile-overlay fade-in" onClick={onClose}>
      <div 
        className="edit-profile-content slide-up" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-profile-header">
          <button className="edit-profile-back-btn" onClick={onClose}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="edit-profile-title">Edit profile</h2>
          <button className="edit-profile-save-btn-top" onClick={onClose}>
            Save
          </button>
        </div>

        <div className="edit-profile-scroll-area">
          <div className="edit-profile-avatar-section">
            <div className="edit-profile-avatar-wrapper">
              <img src={avatarSrc} alt="User Avatar" className="edit-profile-avatar" />
            </div>
            <p className="edit-profile-avatar-text">Photo from your Google account</p>
          </div>

          <div className="edit-profile-form">
            <div className="edit-profile-field">
              <label>Full name</label>
              <input 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
              />
            </div>

            <div className="edit-profile-field">
              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="edit-profile-field">
              <label>Mobile number</label>
              <input 
                type="tel" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)} 
              />
            </div>

            <div className="edit-profile-field">
              <label>Gender</label>
              <div className="dropdown-input-wrapper">
                <select 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)} 
                >
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div className="dropdown-icon">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div className="edit-profile-field">
              <label>Date of birth</label>
              <div className="dropdown-input-wrapper">
                <input 
                  type="date" 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)} 
                />
                <div className="dropdown-icon">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>
          </div>

          <button className="edit-profile-save-btn-bottom" onClick={onClose}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
