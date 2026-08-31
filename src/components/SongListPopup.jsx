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
    { id: 11, title: 'Gouri Elo', artist: 'Raktabeej', duration: '3:12', cover: '/gouri-elo-cover.jpg', src: '/songs/gouri-elo.mp3' },
    { id: 102, title: 'Rupang Dehi', artist: 'Snita Pramanik Ghosh', duration: '4:40', cover: '/rupang-dehi-cover.jpg', src: '/songs/rupang-dehi.mp3' },
    { id: 103, title: 'Dhak Baaja Komor Nacha', artist: 'Switzerland', duration: '3:40', cover: '/dhak-baaja-cover.jpg', src: '/songs/dhak-baaja.mp3' },
    { id: 104, title: 'Shubhaarambh', artist: 'Kai Po Che', duration: '3:10', cover: '/shubhaarambh-cover.jpg', src: '/songs/shubhaarambh.mp3' },
    { id: 105, title: 'Durge Durge Durgatinashini', artist: 'Asha Bhosle', duration: '5:27', cover: '/durge-durge-cover.jpg', src: '/songs/durge-durge.mp3' },
    { id: 106, title: 'Nagada Sang Dhol', artist: 'Ram-Leela', duration: '4:30', cover: '/nagada-sang-dhol-cover.jpg', src: '/songs/nagada-sang-dhol.mp3' },
    { id: 107, title: 'Saawariya', artist: 'Aastha Gill | Kumar Sanu', duration: '3:23', cover: '/saawariya-cover.jpg', src: '/songs/saawariya.mp3' },
    { id: 108, title: 'Elo Je Maa', artist: 'Challenge 2', duration: '4:50', cover: '/elo-je-maa-cover.jpg', src: '/songs/elo-je-maa.mp3' },
    { id: 109, title: 'Joy Joy Durga Maa', artist: 'Agnibha Bandyopadhyay', duration: '5:34', cover: '/joy-joy-durga-maa-cover.jpg', src: '/songs/joy-joy-durga-maa.mp3' },
    { id: 110, title: 'Radhe Radhe', artist: 'Dream Girl', duration: '3:17', cover: '/radhe-radhe-cover.jpg', src: '/songs/radhe-radhe.mp3' },
    { id: 111, title: 'Dugga Elo', artist: 'Akriti Kakar', duration: '4:25', cover: '/dugga-elo-akriti-cover.jpg', src: '/songs/dugga-elo-akriti.mp3' },
    { id: 112, title: 'Ekta Bindaas Para', artist: 'Ley Chakka', duration: '4:33', cover: '/ekta-bindaas-para-cover.jpg', src: '/songs/ekta-bindaas-para.mp3' },
    { id: 113, title: 'O Menoka O Menoka', artist: 'Akriti Kakkar', duration: '3:36', cover: '/o-menoka-cover.jpg', src: '/songs/o-menoka.mp3' },
    { id: 114, title: 'ABAR ELO MAA', artist: 'Rahul Dutta', duration: '3:11', cover: '/abar-elo-maa-cover.jpg', src: '/songs/abar-elo-maa.mp3' },
    { id: 115, title: 'Demo Song 26', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 116, title: 'Demo Song 27', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 117, title: 'Demo Song 28', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 118, title: 'Demo Song 29', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 119, title: 'Demo Song 30', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 120, title: 'Demo Song 31', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 121, title: 'Demo Song 32', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 122, title: 'Demo Song 33', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 123, title: 'Demo Song 34', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 124, title: 'Demo Song 35', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 125, title: 'Demo Song 36', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 126, title: 'Demo Song 37', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 127, title: 'Demo Song 38', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 128, title: 'Demo Song 39', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 129, title: 'Demo Song 40', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 130, title: 'Demo Song 41', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 131, title: 'Demo Song 42', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 132, title: 'Demo Song 43', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 133, title: 'Demo Song 44', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 134, title: 'Demo Song 45', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 135, title: 'Demo Song 46', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 136, title: 'Demo Song 47', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 137, title: 'Demo Song 48', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 138, title: 'Demo Song 49', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 139, title: 'Demo Song 50', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 140, title: 'Demo Song 51', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 141, title: 'Demo Song 52', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 142, title: 'Demo Song 53', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 143, title: 'Demo Song 54', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 144, title: 'Demo Song 55', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 145, title: 'Demo Song 56', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 146, title: 'Demo Song 57', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 147, title: 'Demo Song 58', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 148, title: 'Demo Song 59', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 149, title: 'Demo Song 60', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 150, title: 'Demo Song 61', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 151, title: 'Demo Song 62', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 152, title: 'Demo Song 63', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 153, title: 'Demo Song 64', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 154, title: 'Demo Song 65', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 155, title: 'Demo Song 66', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 156, title: 'Demo Song 67', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 157, title: 'Demo Song 68', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 158, title: 'Demo Song 69', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 159, title: 'Demo Song 70', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 160, title: 'Demo Song 71', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 161, title: 'Demo Song 72', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 162, title: 'Demo Song 73', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 163, title: 'Demo Song 74', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 164, title: 'Demo Song 75', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 165, title: 'Demo Song 76', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 166, title: 'Demo Song 77', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 167, title: 'Demo Song 78', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 168, title: 'Demo Song 79', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 169, title: 'Demo Song 80', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 170, title: 'Demo Song 81', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 171, title: 'Demo Song 82', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 172, title: 'Demo Song 83', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 173, title: 'Demo Song 84', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 174, title: 'Demo Song 85', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 175, title: 'Demo Song 86', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 176, title: 'Demo Song 87', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 177, title: 'Demo Song 88', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 178, title: 'Demo Song 89', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 179, title: 'Demo Song 90', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 180, title: 'Demo Song 91', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 181, title: 'Demo Song 92', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 182, title: 'Demo Song 93', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 183, title: 'Demo Song 94', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 184, title: 'Demo Song 95', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 185, title: 'Demo Song 96', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 186, title: 'Demo Song 97', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 187, title: 'Demo Song 98', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 188, title: 'Demo Song 99', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 189, title: 'Demo Song 100', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 190, title: 'Demo Song 101', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 191, title: 'Demo Song 102', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 192, title: 'Demo Song 103', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 193, title: 'Demo Song 104', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 194, title: 'Demo Song 105', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 195, title: 'Demo Song 106', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 196, title: 'Demo Song 107', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 197, title: 'Demo Song 108', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 198, title: 'Demo Song 109', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 199, title: 'Demo Song 110', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
    { id: 200, title: 'Demo Song 111', artist: 'Artist Name', duration: '0:00', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3' },
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
            const isActive = song.src === currentSong?.src;
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
