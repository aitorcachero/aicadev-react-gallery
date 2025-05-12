import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles.css';

export default function Slider({ images = [], interval = 5000, width = 110 }) {
  const [state, setState] = useState({
    currentIndex: 0,
    progress: 0,
    isLoading: true,
  });
  const startTimeRef = useRef(Date.now());
  const thumbnailsRef = useRef(null);

  const loadImages = useCallback(async () => {
    try {
      await Promise.all(
        images.map(
          (image) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = image;
            })
        )
      );
      setState((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [images]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % images.length,
      }));
      startTimeRef.current = Date.now();
    }, interval);

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTimeRef.current;
      const normalizedProgress = ((elapsedTime % interval) / interval) * 100;

      setState((prev) => ({
        ...prev,
        progress: normalizedProgress,
      }));

      return requestAnimationFrame(updateProgress);
    };

    const animationId = requestAnimationFrame(updateProgress);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animationId);
    };
  }, [interval, images.length]);

  const centerSelectedThumbnail = useCallback((index) => {
    const container = thumbnailsRef.current;
    if (!container) return;

    const thumbnail = container.children[index + 1];
    if (!thumbnail) return;

    const containerWidth = container.parentElement.offsetWidth;
    const scrollLeft =
      thumbnail.offsetLeft - containerWidth / 2 + thumbnail.offsetWidth / 2;

    container.parentElement.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      centerSelectedThumbnail(state.currentIndex);
    }
  }, [state.currentIndex, state.isLoading, centerSelectedThumbnail]);

  const handleImageClick = (index) => {
    if (index === state.currentIndex) return;
    setState((prev) => ({ ...prev, currentIndex: index }));
    startTimeRef.current = Date.now();
  };

  if (state.isLoading) {
    return (
      <div className="slider-container">
        <div className="slider-loading">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div className="loading-spinner"></div>
            <span>Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return <div className="slider-error">No hay imágenes para mostrar</div>;
  }

  return (
    <div className="slider-container">
      <div
        key={state.currentIndex}
        className="slider-background"
        style={{
          backgroundImage: `url(${images[state.currentIndex]})`,
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
                className="thumbnail-button"
                style={{
                  ...(state.currentIndex === index
                    ? {
                        background: `conic-gradient(from 0deg, #f97316 ${state.progress}%, transparent 0deg)`,
                        padding: '2px',
                        width: `${width}px`,
                      }
                    : {
                        width: `${width}px`,
                        padding: `${width / 20}px`,
                      }),
                }}
              >
                <div
                  className={`thumbnail-image-container ${
                    state.currentIndex === index ? 'thumbnail-active' : ''
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
