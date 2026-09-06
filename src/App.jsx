import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MusicPlayer from './components/MusicPlayer';
import MobileLoader from './components/MobileLoader';
import MapPage from './components/MapPage';
import './App.css';

function App() {
  const [showMapPage, setShowMapPage] = useState(false);

  return (
    <div className="app-container">
      <MobileLoader />
      
      {/* Background Image Layer */}
      <div className="background-image"></div>
      
      {/* Dark Overlay for better text legibility */}
      <div className="background-overlay"></div>
      {/* Landscape Warning Overlay */}
      <div className="landscape-overlay">
        <p className="landscape-text">Horizontal view is under construction</p>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <Header onOpenMap={() => setShowMapPage(true)} />
        <HeroSection />
        <MusicPlayer />
      </main>

      {/* Map Page */}
      {showMapPage && <MapPage onClose={() => setShowMapPage(false)} />}
    </div>
  );
}

export default App;
