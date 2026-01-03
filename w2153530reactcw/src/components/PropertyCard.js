// PropertyCard.js - Shows a single property in the grid
// Can be dragged to add to favourites

import React, { useCallback } from 'react';

// format price with pound sign and commas
export const formatPrice = (price) => {
  return `£${price.toLocaleString('en-GB')}`;
};

// format date to readable format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

function PropertyCard({
  property,
  onViewDetails,
  onAddToFavourites,
  onRemoveFromFavourites,
  isFavourite
}) {
  // toggle favourite when heart clicked
  const handleFavouriteClick = useCallback((e) => {
    e.stopPropagation();
    if (isFavourite) {
      onRemoveFromFavourites(property.id);
    } else {
      onAddToFavourites(property);
    }
  }, [property, isFavourite, onAddToFavourites, onRemoveFromFavourites]);

  // view property details when card clicked
  const handleCardClick = useCallback(() => {
    onViewDetails(property);
  }, [property, onViewDetails]);

  // drag start - store property data
  const handleDragStart = useCallback((e) => {
    e.dataTransfer.setData('application/json', JSON.stringify(property));
    e.dataTransfer.effectAllowed = 'copy';
    e.currentTarget.classList.add('property-card--dragging');
  }, [property]);

  // drag end - remove dragging style
  const handleDragEnd = useCallback((e) => {
    e.currentTarget.classList.remove('property-card--dragging');
  }, []);

  // keyboard support
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  }, [handleCardClick]);

  return (
    <article
      className="property-card"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleCardClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${property.shortDescription}`}
    >
      {/* Property Image */}
      <div className="property-card__image-container">
        <img
          src={property.images[0]}
          alt={property.shortDescription}
          className="property-card__image"
          loading="lazy"
        />
        
        {/* Property Type Badge */}
        <span className="property-card__badge">{property.type}</span>
        
        {/* Favourite Button */}
        <button
          className={`property-card__favorite-btn ${isFavourite ? 'property-card__favorite-btn--active' : ''}`}
          onClick={handleFavouriteClick}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Property Content */}
      <div className="property-card__content">
        {/* Price */}
        <div className="property-card__price">
          {formatPrice(property.price)}
        </div>

        {/* Short Description */}
        <h3 className="property-card__title">
          {property.shortDescription}
        </h3>

        {/* Property Details */}
        <div className="property-card__details">
          <span className="property-card__detail">
            🛏️ {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
          </span>
          <span className="property-card__detail">
            📋 {property.tenure}
          </span>
        </div>

        {/* Location */}
        <div className="property-card__location">
          📍 {property.location.address}, {property.postcode}
        </div>

        {/* Date Added */}
        <div className="property-card__date">
          Added: {formatDate(property.dateAdded)}
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
