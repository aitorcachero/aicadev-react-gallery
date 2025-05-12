import React, { useState, useEffect } from 'react';
import './Slider.css';

export default function Slider({
  images = [],
  interval = 5000,
  progressInterval = 50,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);

  // Rotación automática de imágenes
  useEffect(() => {
    if (images.length === 0) return;

    const intervalImages = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalImages);
  }, [key, interval, images.length]);

  // Barra de progreso
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev + 1) % 100);
    }, progressInterval);

    return () => clearInterval(progressTimer);
  }, [key, progressInterval]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setKey((prev) => prev + 1);
    setProgress(0);
  };

  if (isLoading) {
    return <div className="slider-loading">Cargando...</div>;
  }

  if (images.length === 0) {
    return <div className="slider-error">No hay imágenes para mostrar</div>;
  }

  return (
    <div className="slider-container">
      {/* Precargar imágenes */}
      <div style={{ display: 'none' }}>
        {images.map((img, index) => (
          <img key={`preload-${index}`} src={img} alt="" />
        ))}
      </div>

      <div
        key={currentIndex}
        className="slider-background"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
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
