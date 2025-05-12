import React, { useState, useEffect } from 'react';
import './Slider.css';

export default function Slider({
  images,
  interval = 5000,
  setInterval = null,
}) {
  const images = [
    'https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-1920-x-1080-vye1sz5gtvtcy5fz.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-2kph8n73fpmvddj1.jpg',
    'https://img.goodfon.com/original/1920x1080/3/9c/space-planet-landscape-wallpapers-1920-x-1080.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-yshf5x6cdyz4httf.jpg',
    'https://i.redd.it/x8v63p7wu2h61.jpg',
    'https://preview.redd.it/m4h2hhjze8w71.png?auto=webp&s=9bd41e9916365b5bdb38e99cee849b18a84f861a',
    'https://nfortec.com/wallpapers/nfortec_wallpaper_v19_4k.jpg',
    'https://wallpapers.com/images/hd/1920-x-1080-hd-ydvvfje0bdoimttn.jpg',
    'https://wallpapers.com/images/featured/1920x1080-4k-ric2vv7wjk87ythg.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // Add this new state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalImages = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalImages);
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
