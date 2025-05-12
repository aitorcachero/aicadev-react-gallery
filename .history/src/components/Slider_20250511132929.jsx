import React, { useState, useEffect } from 'react';
import './Slider.css';

export default function Slider() {
  const photos = [
    'https://images.wallpapersden.com/image/wxl-himalaya-4k_63661.jpg',
    'https://images.wallpapersden.com/image/download/4k-a-different-world_bWVqaG6UmZqaraWkpJRmbmdlrWZlbWU.jpg',
    'https://images.wallpapersden.com/image/wxl-simple-sunset-hd-digital_78442.jpg',
    'https://images.wallpapersden.com/image/wxl-seashore-iceland-mountains-5k_75233.jpg',
    'https://images.wallpapersden.com/image/wxl-sunrise-4k-photography_87098.jpg',
    'https://images.wallpapersden.com/image/download/simple-sunset-hd-digital_bG1paWeUmZqaraWkpJRobWllrWdma2U.jpg',
    'https://images.wallpapersden.com/image/download/himalaya-4k_a2hra2aUmZqaraWkpJRpZWVlrWdnamU.jpg',
    'https://images.wallpapersden.com/image/wxl-seashore-iceland-mountains-5k_75233.jpg',
    'https://images.wallpapersden.com/image/wxl-sunrise-4k-photography_87098.jpg',
    'https://images.wallpapersden.com/image/wxl-rainbow-over-snowy-mountain_71166.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // Add this new state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
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
    <div className="relative h-screen w-full overflow-hidden p-20">
      {/* Main Background Image with Fade Transition */}
      <div
        key={currentIndex}
        className="absolute inset-0 transition-all duration-1000 ease-in-out w-full h-full p-20"
        style={{
          backgroundImage: `url(${photos[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black/30" />
      </div>

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />

      {/* Bottom Slider Container */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10">
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex gap-4 md:justify-center overflow-x-auto px-4 snap-x snap-mandatory scrollbar-hide pb-8 pt-6 md:overflow-x-hidden">
            <div className="flex-shrink-0 w-[calc(50%-3rem)] md:hidden"></div>
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 snap-center ${
                  currentIndex === index
                    ? 'ring-2 scale-110 -translate-y-4 shadow-lg shadow-black/50'
                    : 'ring-1 ring-white/50 opacity-70 hover:opacity-100 hover:-translate-y-2'
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
                  className={`h-full w-full rounded-lg overflow-hidden ${
                    currentIndex === index ? 'bg-black' : ''
                  }`}
                >
                  <Image
                    width={200}
                    height={200}
                    src={photo}
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full object-cover cursor-pointer"
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
