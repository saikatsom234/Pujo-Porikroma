import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MusicPlayer from './components/MusicPlayer';
import MobileLoader from './components/MobileLoader';
import MapPage from './components/MapPage';
import './App.css';

function App() {
  const [showMapPage, setShowMapPage] = useState(false);
  const [showSchedulePage, setShowSchedulePage] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.id === 'map') {
        setShowMapPage(true);
        setShowSchedulePage(false);
      } else if (e.state && e.state.id === 'schedule') {
        setShowSchedulePage(true);
        setShowMapPage(false);
      } else {
        setShowMapPage(false);
        setShowSchedulePage(false);
        setIsMapLoading(false);
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

  const openSchedule = () => {
    setShowSchedulePage(true);
    window.history.pushState({ modalOpen: true, id: 'schedule' }, '');
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

          <Header onOpenMap={openMap} onOpenSchedule={openSchedule} />
          <HeroSection />
          <MusicPlayer />
        </main>

        {/* Blur seam to blend the two pages */}
        <div className="page-seam-blur"></div>

        {/* Second Page (Mobile Only Now) */}
        <div className="second-page md:hidden">
          {/* Mobile View Image */}
          <img src="/2nd%20page.jpg" alt="Puja Schedule" className="w-full h-auto block" />
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

      {/* PC Dedicated Schedule View */}
      {showSchedulePage && (
        <div 
          className="fixed inset-0 z-[100000] hidden lg:flex items-center justify-center"
          style={{ backgroundColor: '#550719' }}
        >
          <div className="absolute top-6 left-6 z-10">
            <button 
              onClick={closeModal} 
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-all flex items-center gap-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span className="font-bold text-sm tracking-wide">BACK</span>
            </button>
          </div>
          <div className="w-full h-full p-12 flex items-center justify-center relative">
            <img 
              src="/2nd%20page%20of%20puja%20porikroma%201080p.jpg" 
              alt="Puja Schedule" 
              className="max-w-full max-h-full object-contain" 
              style={{ width: '100%', height: 'auto', maxHeight: '100vh' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
