import React, { useState, useEffect, useRef, useCallback } from 'react';

const styles = {
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  sliderBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: 'opacity 0.5s ease-in-out',
  },
  sliderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.3)',
  },
  sliderTopGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100px',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
  },
  sliderBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '20px 0',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
  },
  sliderThumbnails: {
    width: '100%',
    overflow: 'hidden',
  },
  thumbnailsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 20px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch', // Mejora el scroll en iOS
    scrollSnapType: 'x mandatory', // Añade snap scrolling
  },
  thumbnailButton: {
    padding: '2px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '60px',
    scrollSnapAlign: 'center', // Asegura que el elemento se alinee al centro
    minWidth: '110px',
  },
  thumbnailSpacer: {
    minWidth: '20px',
  },
  thumbnailButton: {
    padding: '2px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '110px', // Añadido min-height
  },
  thumbnailImageContainer: {
    width: '100%',
    aspectRatio: '16/9',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  thumbnailActive: {
    transform: 'scale(1.05)',
  },
  sliderLoading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    color: '#fff',
    fontSize: '1.5rem',
  },
  sliderError: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    color: '#fff',
    fontSize: '1.5rem',
  },
};

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
    const thumbnailWidth = thumbnail.offsetWidth;
    const scrollLeft =
      thumbnail.offsetLeft - (containerWidth - thumbnailWidth) / 2;

    container.parentElement.scrollTo({
      left: Math.max(0, scrollLeft),
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
    return <div style={styles.sliderLoading}>Cargando...</div>;
  }

  if (images.length === 0) {
    return <div style={styles.sliderError}>No hay imágenes para mostrar</div>;
  }

  return (
    <div style={styles.sliderContainer}>
      <div
        key={state.currentIndex}
        style={{
          ...styles.sliderBackground,
          backgroundImage: `url(${images[state.currentIndex]})`,
        }}
      >
        <div style={styles.sliderOverlay} />
      </div>

      <div style={styles.sliderTopGradient} />

      <div style={styles.sliderBottomContainer}>
        <div style={styles.sliderThumbnails}>
          <div style={styles.thumbnailsContainer} ref={thumbnailsRef}>
            <div style={styles.thumbnailSpacer}></div>
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                style={{
                  ...styles.thumbnailButton,
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
                  style={{
                    ...styles.thumbnailImageContainer,
                    ...(state.currentIndex === index && styles.thumbnailActive),
                  }}
                >
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    style={styles.thumbnailImage}
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
