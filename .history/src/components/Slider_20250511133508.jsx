import React, { useState, useEffect } from 'react';
import './Slider.css';

export default function Slider() {
  const photos = [
    'https://images.wallpapersden.com/image/wxl-himalaya-4k_63661.jpg',
    'https://images.wallpapersden.com/image/download/4k-a-different-world_bWVqaG6UmZqaraWkpJRmbmdlrWZlbWU.jpg',
    'https://images.wallpapersden.com/image/wxl-simple-sunset-hd-digital_78442.jpg',
    'https://images.wallpapersden.com/image/wxl-seashore-iceland-mountains-5k_75233.jpg',
    'https://images.wallpapersden.com/image/wxl-sunrise-4k-photography_87098.jpg',
    'https://images.wallpapersden.com/image/download/simple-sunset-hd-digital_bG1paWeUmZqaraWkpJRobWllrWdma2U.jpg',
    'https://images.wallpapersden.com/image/download/himalaya-4k_a2hra2aUmZqaraWkpJRpZWVlrWdnamU.jpg',
    'https://images.wallpapersden.com/image/wxl-seashore-iceland-mountains-5k_75233.jpg',
    'https://images.wallpapersden.com/image/wxl-sunrise-4k-photography_87098.jpg',
    'https://images.wallpapersden.com/image/wxl-rainbow-over-snowy-mountain_71166.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // Add this new state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [key]); // Add key to dependencies

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(progressInterval);
  }, [key]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setKey((prev) => prev + 1);
    setProgress(0);
  };

  return (
    <div className="slider-container">
      <div
        key={currentIndex}
        className="slider-background"
        style={{
          backgroundImage: `url(${photos[currentIndex]})`,
          padding: 0,
        }}
      >
        <div className="slider-overlay" />
      </div>

      <div className="slider-top-gradient" />

      <div className="slider-bottom-container">
        <div className="slider-thumbnails">
          <div className="thumbnails-container">
            <div className="thumbnail-spacer"></div>
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className={`thumbnail-button ${
                  currentIndex === index ? 'active' : ''
                }`}
                style={
                  currentIndex === index
                    ? {
                        background: `conic-gradient(#f97316 ${progress}%, transparent ${progress}%, transparent)`,
                        padding: '2px',
                      }
                    : undefined
                }
              >
                <div
                  className={`thumbnail-image-container ${
                    currentIndex === index ? 'active' : ''
                  }`}
                >
                  <img
                    src={photo}
                    alt={`Slide ${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
