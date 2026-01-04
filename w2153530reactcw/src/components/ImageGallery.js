// ImageGallery.js - Shows property images with thumbnails and lightbox

import React, { useState, useCallback, useEffect } from 'react';

function ImageGallery({ images, propertyTitle }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // go to previous image
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  }, [images.length]);

  // go to next image
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
  }, [images.length]);

  // click thumbnail to change image
  const handleThumbnailClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const handleOpenLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  // keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        switch (e.key) {
          case 'ArrowLeft':
            handlePrevious();
            break;
          case 'ArrowRight':
            handleNext();
            break;
          case 'Escape':
            handleCloseLightbox();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrevious, handleNext, handleCloseLightbox]);

  // stop scrolling when lightbox open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  return (
    <>
      {/* Main Gallery */}
      <div className="gallery" role="region" aria-label="Property image gallery">
        {/* Main Image */}
        <div className="gallery__main">
          <img
            src={images[currentIndex]}
            alt={`${propertyTitle} - ${currentIndex + 1} of ${images.length}`}
            className="gallery__main-image"
            onClick={handleOpenLightbox}
          />
          
          {/* Navigation Buttons */}
          <button
            className="gallery__nav-btn gallery__nav-btn--prev"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="gallery__nav-btn gallery__nav-btn--next"
            onClick={handleNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>

        {/* Thumbnails */}
        <div className="gallery__thumbnails" role="tablist" aria-label="Image thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`gallery__thumbnail ${index === currentIndex ? 'gallery__thumbnail--active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
              role="tab"
              aria-selected={index === currentIndex}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-label="Image lightbox"
          onClick={handleCloseLightbox}
        >
          {/* Close Button */}
          <button
            className="lightbox__close"
            onClick={handleCloseLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Lightbox Image */}
          <img
            src={images[currentIndex]}
            alt={`${propertyTitle} - ${currentIndex + 1} of ${images.length}`}
            className="lightbox__image"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navigation */}
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>

          {/* Image Counter */}
          <div className="lightbox__counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}

export default ImageGallery;
