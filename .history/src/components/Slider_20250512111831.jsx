import React, { useState, useEffect, useRef } from 'react';
import './Slider.css';

export default function Slider({ images = [], interval = 5000, width = 110 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const thumbnailsRef = useRef(null);

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
    centerSelectedThumbnail(index);
  };

  const centerSelectedThumbnail = (index) => {
    if (!thumbnailsRef.current) return;
    
    const container = thumbnailsRef.current;
    const thumbnail = container.children[index + 1]; // +1 por el spacer
    if (!thumbnail) return;

    const containerWidth = container.offsetWidth;
    const thumbnailWidth = thumbnail.offsetWidth;
    const scrollLeft = thumbnail.offsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);

    container.parentElement.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  // Centrar la miniatura cuando cambia el índice
  useEffect(() => {
    centerSelectedThumbnail(currentIndex);
  }, [currentIndex]);

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
          <div className="thumbnails-container" ref={thumbnailsRef}>
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
                        padding: `${width / 20}px`,
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
