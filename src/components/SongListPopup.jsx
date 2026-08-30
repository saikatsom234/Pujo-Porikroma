import React, { useState } from 'react';
import { X, Music } from 'lucide-react';
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
    { id: 6, title: 'Dugga Ma', artist: 'Arijit Singh | Bolo Dugga Maiki', duration: '2:52', cover: '/dugga-ma-cover.jpg', src: '/songs/dugga-ma.mp3' },
    { id: 7, title: 'Aamaar Dugga', artist: 'Monali Thakur', duration: '3:16', cover: '/aamaar-dugga-cover.jpg', src: '/songs/aamaar-dugga.mp3' },
    { id: 8, title: 'Kamariya', artist: 'Darshan Raval', duration: '3:07', cover: '/kamariya-cover.jpg', src: '/songs/kamariya.mp3' },
    { id: 9, title: 'Shundori Komola', artist: 'Villain', duration: '3:25', cover: '/shundori-komola-cover.jpg', src: '/songs/shundori-komola.mp3' },
    { id: 10, title: 'Chogada', artist: 'Loveyatri', duration: '4:16', cover: '/chogada-cover.jpg', src: '/songs/chogada.mp3' },
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
          <div className="song-list-header-top">
            <h2 className="song-list-title-text bengali-text">পুজো স্পেশাল</h2>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="song-list-tabs bengali-text">
            <button 
              className={`tab-btn-modern ${activeTab === 'pandal' ? 'active' : ''}`}
              onClick={() => setActiveTab('pandal')}
            >
              প্যান্ডেল কালেকশন
            </button>
            <button 
              className={`tab-btn-modern ${activeTab === 'mahalaya' ? 'active' : ''}`}
              onClick={() => setActiveTab('mahalaya')}
            >
              মহালয়া ও গান
            </button>
          </div>

        </div>

        {/* Scrollable Song Stack */}
        <div className="song-stack">
          {currentSongs.map((song, index) => {
            const isActive = song.title === currentSong?.title;
            return (
              <div key={song.id} className={`song-card-modern ${isActive ? 'active' : ''}`} onClick={() => onSelectSong(song)}>
                <div className="song-card-left-modern">
                  <div className="song-index" style={{ color: isActive ? '#daa520' : 'rgba(255,255,255,0.5)' }}>
                    {isActive ? <Music size={14} /> : (index + 1).toString().padStart(2, '0')}
                  </div>
                  <img src={song.cover} alt={song.title} className="song-card-cover-modern" />
                  <div className="song-card-info-modern">
                    <div className="song-card-title-modern" style={{ color: isActive ? '#daa520' : '#fff' }}>{song.title}</div>
                    <div className="song-card-artist-modern">{song.artist}</div>
                  </div>
                </div>
                <div className="song-card-duration-modern">
                  {song.duration}
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};

export default SongListPopup;
