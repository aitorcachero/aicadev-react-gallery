import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sliderStyles } from './SliderStyles';

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

    const updateSlider = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTimeRef.current;
      const normalizedProgress = ((elapsedTime % interval) / interval) * 100;

      setState((prev) => ({
        ...prev,
        progress: normalizedProgress,
        currentIndex:
          elapsedTime >= interval
            ? (prev.currentIndex + 1) % images.length
            : prev.currentIndex,
      }));

      if (elapsedTime >= interval) {
        startTimeRef.current = currentTime;
      }

      return requestAnimationFrame(updateSlider);
    };

    const animationId = requestAnimationFrame(updateSlider);
    return () => cancelAnimationFrame(animationId);
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

  if (isLoading) {
    return <div style={sliderStyles.sliderLoading}>Cargando...</div>;
  }

  if (images.length === 0) {
    return (
      <div style={sliderStyles.sliderError}>No hay imágenes para mostrar</div>
    );
  }

  return (
    <div style={sliderStyles.sliderContainer}>
      <div
        key={currentIndex}
        style={{
          ...sliderStyles.sliderBackground,
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <div style={sliderStyles.sliderOverlay} />
      </div>

      <div style={sliderStyles.sliderTopGradient} />

      <div style={sliderStyles.sliderBottomContainer}>
        <div style={sliderStyles.sliderThumbnails}>
          <div style={sliderStyles.thumbnailsContainer} ref={thumbnailsRef}>
            <div style={sliderStyles.thumbnailSpacer}></div>
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                style={{
                  ...sliderStyles.thumbnailButton,
                  ...(currentIndex === index && {
                    background: `conic-gradient(from 0deg, #f97316 ${progress}%, transparent 0deg)`,
                    padding: '2px',
                    width: `${width}px`,
                  }),
                  ...(!currentIndex === index && {
                    width: `${width}px`,
                    padding: `${width / 20}px`,
                  }),
                }}
              >
                <div
                  style={{
                    ...sliderStyles.thumbnailImageContainer,
                    ...(currentIndex === index && sliderStyles.thumbnailActive),
                  }}
                >
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    style={sliderStyles.thumbnailImage}
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
