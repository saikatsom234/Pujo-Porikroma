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
      {/* Landscape Warning Overlay */}
      <div className="landscape-overlay">
        <p className="landscape-text">Horizontal view is under construction</p>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <Header />
        <HeroSection />
        <MusicPlayer />
      </main>
    </div>
  );
}

export default App;
