import React, { useState } from 'react';
import { Play, Check } from 'lucide-react';
import './SongListPopup.css';

const SongListPopup = ({ onClose, onSelectSong, currentSong }) => {
  const [activeTab, setActiveTab] = useState('pandal');

  // Placeholder array for Pandal Collection
  const pandalSongs = [
    { id: 0, title: 'Bolo Dugga Elo', artist: 'Sunidhi Chauhan', duration: '3:45', cover: '/bolo-dugga-elo-cover.jpg', src: '/songs/bolo-dugga-elo.mp3' },
    { id: 1, title: 'Dugga Elo', artist: 'Monali Thakur', duration: '2:30', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 2, title: 'Dhak Baja Kashor Baja', artist: 'Shreya Ghoshal', duration: '3:15', cover: '/dhak-baja-kashor-baja-cover.jpg', src: '/songs/dhak-baja-kashor-baja.mp3' },
    { id: 3, title: 'Dholida', artist: 'LOVEYATRI', duration: '4:00', cover: '/dholida-cover.jpg', src: '/songs/dholida.mp3' },
    { id: 4, title: 'Dhaker Taley', artist: 'Poran Jai Jolia Re', duration: '4:35', cover: '/dhaker-taley-cover.jpg', src: '/songs/dhaker-taley.mp3' },
    { id: 5, title: 'Ebar Jeno Onno Rokom Pujo', artist: 'Yoddha', duration: '3:55', cover: '/ebar-jeno-cover.jpg', src: '/songs/ebar-jeno.mp3' },
    { id: 6, title: 'Asche Maa', artist: 'Sonu Nigam', duration: '4:20', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 7, title: 'Durga Puja Theme', artist: 'Jeet Gannguli', duration: '3:50', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 8, title: 'Bolo Durga Mai Ki', artist: 'Shaan', duration: '4:15', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 9, title: 'Dhaker Taale', artist: 'Abhijeet Bhattacharya', duration: '3:30', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 10, title: 'Maa Go Tumi', artist: 'Asha Bhosle', duration: '4:40', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
  ];

  // Placeholder replica array for Mahalaya & Songs
  const mahalayaSongs = [
    { id: 11, title: 'Mahisasuramardini Part 1', artist: 'Birendra Krishna Bhadra', duration: '15:30', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 12, title: 'Mahisasuramardini Part 2', artist: 'Birendra Krishna Bhadra', duration: '18:20', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 13, title: 'Jago Tumi Jago', artist: 'Supriti Ghosh', duration: '4:55', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 14, title: 'Bajlo Tomar Alor Benu', artist: 'Supriti Ghosh', duration: '5:12', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 15, title: 'Ogo Amar Agomoni', artist: 'Pankaj Mullick', duration: '3:45', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 16, title: 'Tabo Achinta Rupa', artist: 'Dwijen Mukhopadhyay', duration: '6:10', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 17, title: 'Aha Ki Ananda', artist: 'Utpala Sen', duration: '4:25', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 18, title: 'Bimano Bihari', artist: 'Tarun Banerjee', duration: '5:05', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 19, title: 'Amal Kiran', artist: 'Sandhya Mukherjee', duration: '3:50', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 20, title: 'Jaya Jaya Japya', artist: 'Chorus', duration: '4:15', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
  ];

  const currentSongs = activeTab === 'pandal' ? pandalSongs : mahalayaSongs;

  return (
    <div className="song-list-overlay" onClick={onClose}>
      <div className="song-list-popup glass-panel" onClick={e => e.stopPropagation()}>
        
        {/* Header Section */}
        <div className="song-list-header">
          <h2 className="song-list-title bengali-text">পুজো স্পেশাল</h2>
          <div className="song-list-tabs bengali-text">
            <button 
              className={`tab-btn ${activeTab === 'pandal' ? 'active' : ''}`}
              onClick={() => setActiveTab('pandal')}
            >
              প্যান্ডেল কালেকশন
            </button>
            <span className="tab-divider">|</span>
            <button 
              className={`tab-btn ${activeTab === 'mahalaya' ? 'active' : ''}`}
              onClick={() => setActiveTab('mahalaya')}
            >
              মহালয়া ও গান
            </button>
          </div>
        </div>

        {/* Scrollable Song Stack */}
        <div className="song-stack">
          {currentSongs.map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-card-left">
                <img src={song.cover} alt={song.title} className="song-card-cover" />
                <div className="song-card-info">
                  <div className="song-card-title" style={song.title === currentSong?.title ? { color: '#4ade80' } : {}}>{song.title}</div>
                  <div className="song-card-artist">{song.artist}</div>
                  <div className="song-card-duration">0:00 / {song.duration}</div>
                </div>
              </div>
              
              {song.title === currentSong?.title ? (
                <div className="song-card-active-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px' }}>
                  <Check size={24} color="#4ade80" />
                </div>
              ) : (
                <button className="song-card-play-btn" onClick={() => onSelectSong(song)}>
                  <Play size={20} fill="currentColor" className="play-icon-offset" />
                </button>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default SongListPopup;
