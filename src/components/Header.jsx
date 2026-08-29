import React, { useState, useEffect } from 'react';
import { Settings, User, Coffee, Play, Search, Disc, Globe2 } from 'lucide-react';
import { io } from 'socket.io-client';
import { toBengaliNumber, getPujoText } from '../utils/dateUtils';
import CreatorCard from './CreatorCard';
import './Header.css';

const Header = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCreatorCard, setShowCreatorCard] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatBengaliTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    let timePrefix = '';
    if (hours >= 5 && hours < 12) {
      timePrefix = 'সকাল';
    } else if (hours >= 12 && hours < 16) {
      timePrefix = 'দুপুর';
    } else if (hours >= 16 && hours < 18) {
      timePrefix = 'বিকেল';
    } else if (hours >= 18 && hours < 21) {
      timePrefix = 'সন্ধ্যা';
    } else if (hours >= 21 && hours < 24) {
      timePrefix = 'রাত';
    } else if (hours >= 0 && hours < 3) {
      timePrefix = 'মধ্যরাত';
    } else if (hours >= 3 && hours < 5) {
      timePrefix = 'ভোর';
    }
    
    let displayHours = hours % 12;
    displayHours = displayHours ? displayHours : 12;
    
    const strHours = toBengaliNumber(displayHours);
    const strMins = toBengaliNumber(minutes < 10 ? '0' + minutes : minutes);
    
    // In Bengali, the time period comes before the time (e.g., "সকাল ১০:১৫")
    return `${timePrefix} ${strHours}:${strMins}`;
  };

  useEffect(() => {
    // Connect to the backend server dynamically using the host's IP
    const socket = io(`http://${window.location.hostname}:3000`);

    socket.on('connect', () => {
      console.log('Connected to real-time server');
    });

    socket.on('onlineUsersUpdate', (count) => {
      setOnlineCount(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="online-badge glass-panel">
            <span className="dot"></span>
            <span className="bengali-text">{toBengaliNumber(onlineCount)} জন সক্রিয়</span>
          </div>
          <div className="countdown hide-mobile fancy-bengali">
            {getPujoText()}
          </div>
        </div>
        
        <div className="header-right">
          {/* Clock visible on all devices */}
          <div className="mobile-actions glass-panel mobile-clock">
            <span className="bengali-text">{formatBengaliTime(currentTime)}</span>
          </div>
          
          <div className="desktop-actions glass-panel">
            <button className="icon-btn hide-mobile"><Settings size={18} /></button>
            <button className="icon-btn hide-mobile"><Globe2 size={18} /></button>
            <button className="icon-btn" onClick={() => setShowCreatorCard(true)}><User size={18} /></button>
            <button className="icon-btn"><Coffee size={18} /></button>
          </div>
        </div>
      </header>

      {/* Render CreatorCard over everything when state is true */}
      {showCreatorCard && <CreatorCard onClose={() => setShowCreatorCard(false)} />}
    </>
  );
};

export default Header;
