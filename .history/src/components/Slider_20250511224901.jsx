import React, { useState, useEffect } from 'react';
import './Slider.css';

export default function Slider({ images = [], interval = 5000, width = 90 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
      setProgress((prev) => {
        // Calculamos el nuevo progreso basado en el tiempo transcurrido
        const newProgress = prev + 1;
        // Si llegamos a 100, reiniciamos a 0
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, interval / 100); // Dividimos el intervalo en 100 partes para un progreso suave

    return () => clearInterval(progressTimer);
  }, [key, interval]);

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
                        background: `conic-gradient(from 0deg, #f97316 ${progress}%, transparent 0deg)`,
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
