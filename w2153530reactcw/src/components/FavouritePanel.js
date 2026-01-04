// FavouritesPanel.js - Shows saved favourite properties
// Supports drag and drop to add/remove

import React, { useState, useCallback } from 'react';
import { formatPrice } from './PropertyCard';

function FavouritesPanel({
  favourites,
  onRemove,
  onClear,
  onAdd,
  onViewProperty
}) {
  // for visual feedback when dragging
  const [isDragOver, setIsDragOver] = useState(false);
  const [isRemoveZoneDragOver, setIsRemoveZoneDragOver] = useState(false);

  // allow drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  // when property dropped, add to favourites
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const propertyData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (propertyData && propertyData.id) {
        onAdd(propertyData);
      }
    } catch (error) {
      console.error('Failed to parse dropped data:', error);
    }
  }, [onAdd]);

  // drag favourite item for removal
  const handleFavouriteDragStart = useCallback((e, property) => {
    e.dataTransfer.setData('text/plain', property.id);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('favourite-item--dragging');
  }, []);

  const handleFavouriteDragEnd = useCallback((e) => {
    e.currentTarget.classList.remove('favourite-item--dragging');
    setIsRemoveZoneDragOver(false);
  }, []);

  // remove zone handlers
  const handleRemoveZoneDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsRemoveZoneDragOver(true);
  }, []);

  const handleRemoveZoneDragLeave = useCallback(() => {
    setIsRemoveZoneDragOver(false);
  }, []);

  const handleRemoveZoneDrop = useCallback((e) => {
    e.preventDefault();
    setIsRemoveZoneDragOver(false);
    
    const propertyId = e.dataTransfer.getData('text/plain');
    if (propertyId) {
      onRemove(propertyId);
    }
  }, [onRemove]);

  return (
    <aside
      className={`favourites-panel ${isDragOver ? 'favourites-panel--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="Favourite properties"
    >
      <div className="favourites-panel__header">
        <h2 className="favourites-panel__title">
          ❤️ Favourites
          <span className="favourites-panel__count">{favourites.length}</span>
        </h2>
        {favourites.length > 0 && (
          <button
            className="btn btn--danger btn--small"
            onClick={onClear}
            aria-label="Clear all favourites"
          >
            Clear All
          </button>
        )}
      </div>

      {/* show empty message or list */}
      {favourites.length === 0 ? (
        <div className="favourites-panel__empty">
          <div className="favourites-panel__empty-icon">💝</div>
          <p>Drag properties here or click the heart to save your favourites</p>
        </div>
      ) : (
        <>
          <div className="favourites-panel__list">
            {favourites.map((property) => (
              <div
                key={property.id}
                className="favourite-item"
                draggable="true"
                onDragStart={(e) => handleFavouriteDragStart(e, property)}
                onDragEnd={handleFavouriteDragEnd}
                onClick={() => onViewProperty(property)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && onViewProperty(property)}
                aria-label={`View ${property.shortDescription}`}
              >
                <img
                  src={property.images[0]}
                  alt=""
                  className="favourite-item__image"
                  loading="lazy"
                />
                <div className="favourite-item__info">
                  <div className="favourite-item__price">
                    {formatPrice(property.price)}
                  </div>
                  <div className="favourite-item__title">
                    {property.shortDescription}
                  </div>
                </div>
                <button
                  className="favourite-item__remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(property.id);
                  }}
                  aria-label={`Remove ${property.shortDescription} from favourites`}
                  title="Remove from favourites"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* drag here to remove */}
          <div
            className={`remove-zone ${isRemoveZoneDragOver ? 'remove-zone--active' : ''}`}
            onDragOver={handleRemoveZoneDragOver}
            onDragLeave={handleRemoveZoneDragLeave}
            onDrop={handleRemoveZoneDrop}
          >
            🗑️ Drag here to remove
          </div>
        </>
      )}
    </aside>
  );
}

export default FavouritesPanel;
