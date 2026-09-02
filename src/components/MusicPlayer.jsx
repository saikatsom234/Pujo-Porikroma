import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Music, ChevronDown } from 'lucide-react';
import SongListPopup, { pandalSongs, mahalayaSongs } from './SongListPopup';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSongList, setShowSongList] = useState(false);
    
    const [activePlaylist, setActivePlaylist] = useState('pandal');
    const [favoriteSongs, setFavoriteSongs] = useState(() => {
      const saved = localStorage.getItem('pujo_favoriteSongs');
      return saved ? JSON.parse(saved) : [];
    });
    
    useEffect(() => {
      localStorage.setItem('pujo_favoriteSongs', JSON.stringify(favoriteSongs));
    }, [favoriteSongs]);
    
    const toggleFavorite = (song) => {
      setFavoriteSongs(prev => {
        const isFav = prev.some(s => s.src === song.src);
        if (isFav) {
          return prev.filter(s => s.src !== song.src);
        } else {
          return [...prev, song];
        }
      });
    };

  
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

  const [isRepeat, setIsRepeat] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const [isShuffled, setIsShuffled] = useState(false);
  const [activePandalSongs, setActivePandalSongs] = useState(pandalSongs);
  const [activeMahalayaSongs, setActiveMahalayaSongs] = useState(mahalayaSongs);

  const toggleShuffle = () => {
    if (!isShuffled) {
      const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
      };
      setActivePandalSongs(shuffleArray(pandalSongs));
      setActiveMahalayaSongs(shuffleArray(mahalayaSongs));
      setIsShuffled(true);
    } else {
      setActivePandalSongs(pandalSongs);
      setActiveMahalayaSongs(mahalayaSongs);
      setIsShuffled(false);
    }
  };


  const toggleDhak = () => {
    setIsDhakPlaying(!isDhakPlaying);
  };

  const handleSelectSong = (song, tab) => {
    setCurrentSong(song);
    if (tab) setActivePlaylist(tab);
    setShowSongList(false);
    setIsPlaying(true);
  };

  const playNext = () => {
    let nextSong = null;
    if (activePlaylist === 'favorites') {
      const idx = favoriteSongs.findIndex(s => s.src === currentSong.src);
      if (idx !== -1) nextSong = favoriteSongs[(idx + 1) % favoriteSongs.length];
    } else if (activePlaylist === 'mahalaya') {
      const idx = activeMahalayaSongs.findIndex(s => s.src === currentSong.src);
      if (idx !== -1) nextSong = activeMahalayaSongs[(idx + 1) % activeMahalayaSongs.length];
    } else {
      const idx = activePandalSongs.findIndex(s => s.src === currentSong.src);
      if (idx !== -1) nextSong = activePandalSongs[(idx + 1) % activePandalSongs.length];
    }
    if (nextSong) {
      setCurrentSong(nextSong);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    let prevSong = null;
    if (activePlaylist === 'favorites') {
      const idx = favoriteSongs.findIndex(s => s.src === currentSong.src);
      if (idx !== -1) prevSong = favoriteSongs[(idx - 1 + favoriteSongs.length) % favoriteSongs.length];
    } else if (activePlaylist === 'mahalaya') {
      const idx = activeMahalayaSongs.findIndex(s => s.src === currentSong.src);
      if (idx !== -1) prevSong = activeMahalayaSongs[(idx - 1 + activeMahalayaSongs.length) % activeMahalayaSongs.length];
    } else {
      const idx = activePandalSongs.findIndex(s => s.src === currentSong.src);
      if (idx !== -1) prevSong = activePandalSongs[(idx - 1 + activePandalSongs.length) % activePandalSongs.length];
    }
    if (prevSong) {
      setCurrentSong(prevSong);
      setIsPlaying(true);
    }
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
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log(e));
        return;
      }
      
      let nextSong = null;
      
      if (activePlaylist === 'favorites') {
        const idx = favoriteSongs.findIndex(s => s.src === currentSong.src);
        if (idx !== -1) nextSong = favoriteSongs[(idx + 1) % favoriteSongs.length];
      } else if (activePlaylist === 'mahalaya') {
        const idx = activeMahalayaSongs.findIndex(s => s.src === currentSong.src);
        if (idx !== -1) nextSong = activeMahalayaSongs[(idx + 1) % activeMahalayaSongs.length];
      } else {
        const idx = activePandalSongs.findIndex(s => s.src === currentSong.src);
        if (idx !== -1) nextSong = activePandalSongs[(idx + 1) % activePandalSongs.length];
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
  }, [currentSong, isRepeat, activePandalSongs, activeMahalayaSongs, favoriteSongs, activePlaylist]);

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
            <button className="control-btn" onClick={playPrevious}><SkipBack size={20} fill="currentColor" /></button>
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="play-icon-offset" />}
            </button>
            <button className="control-btn" onClick={playNext}><SkipForward size={20} fill="currentColor" /></button>
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
          <button 
            className={`action-btn bengali-text ${isShuffled ? 'active' : ''}`}
            onClick={toggleShuffle}
            style={{ color: isShuffled ? '#ffffff' : '' }}
          >
            <Shuffle size={16} />
            <span style={{ position: 'relative', top: '2px' }}>এলোমেলো</span>
          </button>
          <div className="divider"></div>
          <button 
            className={`action-btn bengali-text ${isRepeat ? 'active' : ''}`}
            onClick={toggleRepeat}
            style={{ color: isRepeat ? '#ffffff' : '' }}
          >
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
      
      {showSongList && <SongListPopup onClose={() => setShowSongList(false)} onSelectSong={handleSelectSong} currentSong={currentSong} pandalList={activePandalSongs} mahalayaList={activeMahalayaSongs} favoriteSongs={favoriteSongs} toggleFavorite={toggleFavorite} />}
    </div>
  );
};

export default MusicPlayer;
