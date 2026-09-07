import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MusicPlayer from './components/MusicPlayer';
import MobileLoader from './components/MobileLoader';
import MapPage from './components/MapPage';
import './App.css';

function App() {
  const [showMapPage, setShowMapPage] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const handlePopState = (e) => {
      if (!e.state || e.state.id !== 'map') {
        setShowMapPage(false);
        setIsMapLoading(false);
      } else if (e.state && e.state.id === 'map') {
        setShowMapPage(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openMap = () => {
    setIsMapLoading(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.error("Video play error:", e));
    }
  };

  const handleLoaderEnded = () => {
    setIsMapLoading(false);
    setShowMapPage(true);
    window.history.pushState({ modalOpen: true, id: 'map' }, '');
  };

  const closeModal = () => {
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
          {/* Mobile View Image */}
          <img src="/2nd%20page.jpg" alt="Puja Schedule" className="w-full h-auto block lg:hidden" />
          
          {/* PC Dedicated View Image */}
          <div className="hidden lg:flex w-full min-h-screen items-center justify-center p-12 bg-[#550719]">
            <img 
              src="/2nd%20page%20of%20puja%20porikroma%201080p.jpg" 
              alt="Puja Schedule" 
              className="max-w-full object-contain shadow-2xl" 
              style={{ width: '100%', height: 'auto', maxHeight: '100vh' }}
            />
          </div>
        </div>
      </div>

      {/* Map Loader Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 999999,
          backgroundColor: '#000000',
          visibility: isMapLoading ? 'visible' : 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <video 
          ref={videoRef}
          src="/map loader screen.mp4" 
          preload="auto"
          playsInline
          onEnded={handleLoaderEnded}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Map Page */}
      {showMapPage && <MapPage onClose={closeModal} />}
    </div>
  );
}

export default App;
