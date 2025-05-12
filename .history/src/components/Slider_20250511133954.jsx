import React, { useState, useEffect } from 'react';
import './Slider.css';

export default function Slider() {
  const images = [
    'https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-1920-x-1080-vye1sz5gtvtcy5fz.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-2kph8n73fpmvddj1.jpg',
    'https://img.goodfon.com/original/1920x1080/3/9c/space-planet-landscape-wallpapers-1920-x-1080.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-yshf5x6cdyz4httf.jpg',
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
