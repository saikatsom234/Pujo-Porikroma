import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Background Image Layer */}
      <div className="background-image"></div>
      
      {/* Dark Overlay for better text legibility */}
      <div className="background-overlay"></div>

      {/* Main Content */}
      <main className="main-content">
        <Header />
        <HeroSection />
        <MusicPlayer />
      </main>

      {/* Mobile Landscape Overlay */}
      <div className="landscape-overlay">
        <div className="landscape-message">Horizontal view is under construction</div>
      </div>
    </div>
  );
}

export default App;
