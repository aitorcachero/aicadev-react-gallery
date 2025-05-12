import React, { useState, useEffect } from 'react';
import './Slider.css';

export default function Slider() {
  const images = [
    'data:image/jpeg;base64,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',
    'https://images.wallpapersden.com/image/download/4k-a-different-world_bWVqaG6UmZqaraWkpJRmbmdlrWZlbWU.jpg',
    'https://images.wallpapersden.com/image/wxl-simple-sunset-hd-digital_78442.jpg',
    'https://images.wallpapersden.com/image/wxl-seashore-iceland-mountains-5k_75233.jpg',
    'https://images.wallpapersden.com/image/wxl-sunrise-4k-imggraphy_87098.jpg',
    'https://images.wallpapersden.com/image/download/simple-sunset-hd-digital_bG1paWeUmZqaraWkpJRobWllrWdma2U.jpg',
    'https://images.wallpapersden.com/image/download/himalaya-4k_a2hra2aUmZqaraWkpJRpZWVlrWdnamU.jpg',
    'https://images.wallpapersden.com/image/wxl-seashore-iceland-mountains-5k_75233.jpg',
    'https://images.wallpapersden.com/image/wxl-sunrise-4k-imggraphy_87098.jpg',
    'https://images.wallpapersden.com/image/wxl-rainbow-over-snowy-mountain_71166.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // Add this new state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
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
          backgroundImage: `url(${images[currentIndex]})`,
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
            {images.map((img, index) => (
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
                    src={img}
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
