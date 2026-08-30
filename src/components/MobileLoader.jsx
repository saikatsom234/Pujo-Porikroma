import React, { useState, useEffect } from 'react';
import './MobileLoader.css';

const MobileLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile width (phone)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Fallback: forcefully dismiss the loader after 6 seconds
    // in case the video gets stuck or is too long.
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeout);
    };
  }, []);

  const handleVideoEnd = () => {
    setIsLoading(false);
  };

  // Only show the loader on mobile screens and while it's loading
  if (!isMobile || !isLoading) return null;

  return (
    <div className="mobile-loader-overlay">
      <video
        className="mobile-loader-video"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onError={handleVideoEnd} // Hide if video fails to load
      >
        <source src="/loader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MobileLoader;
