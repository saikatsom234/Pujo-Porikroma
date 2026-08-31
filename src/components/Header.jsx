import React, { useState, useEffect } from 'react';
import { Settings, User, Coffee, Play, Search, Disc, Globe2 } from 'lucide-react';
import { io } from 'socket.io-client';
import { toBengaliNumber, getPujoText } from '../utils/dateUtils';
import CreatorCard from './CreatorCard';
import ChaiPopup from './ChaiPopup';
import './Header.css';

const Header = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCreatorCard, setShowCreatorCard] = useState(false);
  const [showChaiPopup, setShowChaiPopup] = useState(false);

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
    // Generate an initial random online count between 12 and 50
    const initialCount = Math.floor(Math.random() * 39) + 12;
    setOnlineCount(initialCount);

    // Randomly fluctuate the online count to simulate real users
    const interval = setInterval(() => {
      setOnlineCount((prevCount) => {
        const change = Math.floor(Math.random() * 5) - 2; // fluctuate by -2 to +2
        let newCount = prevCount + change;
        
        // Ensure count stays within 1 to 50 bounds
        if (newCount < 1) newCount = 1;
        if (newCount > 50) newCount = 50;
        
        return newCount;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="online-badge glass-panel">
            <span className="dot"></span>
            <span className="bengali-text">{toBengaliNumber(onlineCount)} সক্রিয়</span>
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
            <button className="icon-btn"><Settings size={18} /></button>
            <button className="icon-btn"><Globe2 size={18} /></button>
            <button className="icon-btn" onClick={() => setShowCreatorCard(true)}><User size={18} /></button>
            <button className="icon-btn" onClick={() => setShowChaiPopup(true)}><Coffee size={18} /></button>
          </div>
        </div>
      </header>

      {/* Render CreatorCard over everything when state is true */}
      {showCreatorCard && <CreatorCard onClose={() => setShowCreatorCard(false)} />}
      {/* Render ChaiPopup over everything when state is true */}
      {showChaiPopup && <ChaiPopup onClose={() => setShowChaiPopup(false)} />}
    </>
  );
};

export default Header;
