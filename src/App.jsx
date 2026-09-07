import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MusicPlayer from './components/MusicPlayer';
import MobileLoader from './components/MobileLoader';
import MapPage from './components/MapPage';
import './App.css';

function App() {
  const [showMapPage, setShowMapPage] = useState(false);

  useEffect(() => {
    const handlePopState = (e) => {
      if (!e.state || e.state.id !== 'map') {
        setShowMapPage(false);
      } else if (e.state && e.state.id === 'map') {
        setShowMapPage(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openMap = () => {
    setShowMapPage(true);
    window.history.pushState({ modalOpen: true, id: 'map' }, '');
  };

  const closeMap = () => {
    window.history.back();
  };

  return (
    <div className="app-container">
      <MobileLoader />
      
      {/* Landscape Warning Overlay */}
      <div className="landscape-overlay">
        <p className="landscape-text">Horizontal view is under construction</p>
      </div>

      {/* Scrollable Content Wrapper */}
      <div className="scrollable-wrapper">
        {/* Main Content (First Page) */}
        <main className="main-content">
          {/* Background Image Layer */}
          <div className="background-image"></div>
          
          {/* Dark Overlay for better text legibility */}
          <div className="background-overlay"></div>

          <Header onOpenMap={openMap} />
          <HeroSection />
          <MusicPlayer />
        </main>

        {/* Blur seam to blend the two pages */}
        <div className="page-seam-blur"></div>

        {/* Second Page */}
        <div className="second-page">
          <img src="/2nd%20page.jpg" alt="Puja Schedule" className="w-full h-auto block" />
        </div>
      </div>

      {/* Map Page */}
      {showMapPage && <MapPage onClose={closeMap} />}
    </div>
  );
}

export default App;
