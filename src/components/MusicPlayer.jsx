import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Music, ChevronDown } from 'lucide-react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="music-player-container">
      {/* Mobile only selector */}
      <div className="mobile-category-selector show-mobile-flex">
        <button className="category-btn glass-panel">
          <Music size={16} />
          DURGA PUJA
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="music-player glass-panel">
        <div className="player-top">
          <div className="track-info">
            <div className="album-art">
              <img src="https://i.scdn.co/image/ab67616d0000b27329f98ec8198f82522ad7167a" alt="Dugga Elo" />
            </div>
            <div className="track-details">
              <div className="track-title">Dugga Elo</div>
              <div className="track-artist">Monali Thakur</div>
              <div className="track-time">0:00 / 0:00</div>
            </div>
          </div>
          
          <div className="player-controls">
            <button className="control-btn"><SkipBack size={20} fill="currentColor" /></button>
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="play-icon-offset" />}
            </button>
            <button className="control-btn"><SkipForward size={20} fill="currentColor" /></button>
          </div>
        </div>
        
        {/* Mobile bottom controls */}
        <div className="player-bottom show-mobile-flex">
          <button className="action-btn">
            <Shuffle size={16} />
            Shuffle
          </button>
          <div className="divider"></div>
          <button className="action-btn">
            <Repeat size={16} />
            Repeat
          </button>
          <div className="divider"></div>
          <button className="action-btn">
            <Music size={16} />
            Dhak
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
