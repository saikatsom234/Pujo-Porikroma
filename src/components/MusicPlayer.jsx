import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Music, ChevronDown } from 'lucide-react';
import SongListPopup, { pandalSongs, mahalayaSongs } from './SongListPopup';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSongList, setShowSongList] = useState(false);
  
  const [currentSong, setCurrentSong] = useState({
    title: 'Dugga Elo',
    artist: 'Monali Thakur',
    cover: '/dugga-elo-cover.jpg',
    src: '/songs/dugga-elo.mp3'
  });
  
  const audioRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [isDhakPlaying, setIsDhakPlaying] = useState(false);
  const dhakAudioRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleDhak = () => {
    setIsDhakPlaying(!isDhakPlaying);
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
    setShowSongList(false);
    setIsPlaying(true);
  };

  // Handle audio playback whenever the song changes or play state toggles
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log("Playback interrupted or prevented:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong.src]);

  useEffect(() => {
    if (dhakAudioRef.current) {
      if (isDhakPlaying) {
        dhakAudioRef.current.play().catch(e => console.log(e));
      } else {
        dhakAudioRef.current.pause();
      }
    }
  }, [isDhakPlaying]);
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      let nextSong = null;
      
      const pandalIndex = pandalSongs.findIndex(s => s.src === currentSong.src);
      if (pandalIndex !== -1) {
        nextSong = pandalSongs[(pandalIndex + 1) % pandalSongs.length];
      } else {
        const mahalayaIndex = mahalayaSongs.findIndex(s => s.src === currentSong.src);
        if (mahalayaIndex !== -1) {
          nextSong = mahalayaSongs[(mahalayaIndex + 1) % mahalayaSongs.length];
        }
      }
      
      if (nextSong) {
        setCurrentSong(nextSong);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };
    
    const handleTimeUpdate = () => {
      if (!isDraggingRef.current) {
        setCurrentTime(audio.currentTime);
      }
    };
    const handleLoadedMetadata = () => setDuration(audio.duration);
    
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }
    
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentSong]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player-container">
      <audio ref={audioRef} src={currentSong.src} preload="metadata" />
      <audio ref={dhakAudioRef} src="/songs/dhak-song.webm" loop preload="auto" />
      {/* Mobile only selector */}
      <div className="mobile-category-selector show-mobile-flex">
        <button className="category-btn glass-panel bengali-text" onClick={() => setShowSongList(true)}>
          <Music size={16} />
          পূজো সংগ্রহ
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="music-player glass-panel">
        <div className="player-top">
          <div className="track-info">
            <div className={`album-art ${isPlaying ? 'playing' : ''}`}>
              <img src={currentSong.cover} alt={currentSong.title} />
            </div>
            <div className="track-details">
              <div className="track-title">{currentSong.title}</div>
              <div className="track-artist">{currentSong.artist}</div>
              <div className="track-time">{formatTime(currentTime)} / {formatTime(duration)}</div>
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
        
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <input 
            type="range"
            min="0"
            max={duration || 100}
            step="0.01"
            value={currentTime}
            className="progress-input"
            onMouseDown={() => { isDraggingRef.current = true; }}
            onTouchStart={() => { isDraggingRef.current = true; }}
            onChange={(e) => {
              const newTime = parseFloat(e.target.value);
              setCurrentTime(newTime);
            }}
            onMouseUp={(e) => {
              isDraggingRef.current = false;
              if (audioRef.current) audioRef.current.currentTime = parseFloat(e.target.value);
            }}
            onTouchEnd={(e) => {
              isDraggingRef.current = false;
              if (audioRef.current) audioRef.current.currentTime = parseFloat(e.target.value);
            }}
          />
        </div>
        
        {/* Mobile bottom controls */}
        <div className="player-bottom show-mobile-flex">
          <button className="action-btn bengali-text">
            <Shuffle size={16} />
            <span style={{ position: 'relative', top: '2px' }}>এলোমেলো</span>
          </button>
          <div className="divider"></div>
          <button className="action-btn bengali-text">
            <Repeat size={16} />
            <span style={{ position: 'relative', top: '2px' }}>পুনরাবৃত্তি</span>
          </button>
          <div className="divider"></div>
          <button 
            className={`action-btn bengali-text ${isDhakPlaying ? 'active' : ''}`}
            onClick={toggleDhak}
            style={{ color: isDhakPlaying ? '#ffffff' : '' }}
          >
            <Music size={16} />
            <span style={{ position: 'relative', top: '2px' }}>ঢাক</span>
          </button>
        </div>
      </div>
      
      {showSongList && <SongListPopup onClose={() => setShowSongList(false)} onSelectSong={handleSelectSong} currentSong={currentSong} />}
    </div>
  );
};

export default MusicPlayer;
