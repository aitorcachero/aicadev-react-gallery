import React, { useState, useEffect } from 'react';
import './Slider.css';

export default function Slider({ images = [], interval = 5000, width = 110 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());

  // Precarga de imágenes
  useEffect(() => {
    const loadImages = async () => {
      const promises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image;
        });
      });

      try {
        await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [images]);

  // Rotación automática de imágenes con control de visibilidad
  useEffect(() => {
    if (images.length === 0) return;

    let animationFrameId;

    const updateSlider = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const normalizedProgress = ((elapsedTime % interval) / interval) * 100;

      setProgress(normalizedProgress);

      if (elapsedTime >= interval) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setStartTime(currentTime);
      }

      animationFrameId = requestAnimationFrame(updateSlider);
    };

    animationFrameId = requestAnimationFrame(updateSlider);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [interval, images.length, startTime]);

  const handleImageClick = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setStartTime(Date.now());
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
                        background: `conic-gradient(from 0deg, #f97316 ${progress}%, transparent 0deg)`,
                        padding: '2px',
                        width: `${width}px`,
                      }
                    : {
                        width: `${width}px`,
                        padding: '2px',
                      }
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
