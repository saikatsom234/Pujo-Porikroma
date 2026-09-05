import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { GenderPickerModal, DatePickerModal } from './CustomPickers';
import './EditProfilePopup.css';

const EditProfilePopup = ({ onClose, avatarSrc, initialName = 'USER', initialEmail = 'user@gmail.com' }) => {
  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [dob, setDob] = useState('');
  
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
              <div className="dropdown-input-wrapper" onClick={() => setShowGenderPicker(true)}>
                <input 
                  type="text" 
                  value={gender} 
                  readOnly 
                  style={{ cursor: 'pointer' }}
                />
                <div className="dropdown-icon">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div className="edit-profile-field">
              <label>Date of birth</label>
              <div className="dropdown-input-wrapper" onClick={() => setShowDatePicker(true)}>
                <input 
                  type="text" 
                  value={dob} 
                  readOnly 
                  style={{ cursor: 'pointer' }}
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
      
      {showGenderPicker && (
        <GenderPickerModal 
          selected={gender} 
          onSelect={setGender} 
          onClose={() => setShowGenderPicker(false)} 
        />
      )}
      {showDatePicker && (
        <DatePickerModal 
          initialDate={dob} 
          onSelect={setDob} 
          onClose={() => setShowDatePicker(false)} 
        />
      )}
    </div>
  );
};

export default EditProfilePopup;
