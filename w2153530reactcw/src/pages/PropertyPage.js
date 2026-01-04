// PropertyPage.js - Full property details page
// Shows images, info, and tabbed content

import React from 'react';
import ImageGallery from '../components/ImageGallery';
import PropertyTabs from '../components/PropertyTabs';
import { formatPrice } from '../components/PropertyCard';

function PropertyPage({
  property,
  onBack,
  onAddToFavourites,
  onRemoveFromFavourites,
  isFavourite
}) {
  // show message if no property
  if (!property) {
    return (
      <div className="property-details">
        <p>Property not found.</p>
        <button className="btn btn--primary" onClick={onBack}>
          Back to Search
        </button>
      </div>
    );
  }

  const isPropertyFavourite = isFavourite(property.id);

  // toggle favourite
  const handleFavouriteToggle = () => {
    if (isPropertyFavourite) {
      onRemoveFromFavourites(property.id);
    } else {
      onAddToFavourites(property);
    }
  };

  return (
    <div className="property-details">
      {/* Back Navigation */}
      <button className="property-details__back" onClick={onBack}>
        ← Back to Search Results
      </button>

      {/* Image Gallery */}
      <ImageGallery
        images={property.images}
        propertyTitle={property.shortDescription}
      />

      {/* Property Info Section */}
      <div className="property-info">
        {/* Main Info */}
        <div className="property-info__main">
          <div className="property-info__header">
            {/* Price */}
            <div className="property-info__price">
              {formatPrice(property.price)}
            </div>

            {/* Address */}
            <div className="property-info__address">
              {property.location.address}, {property.location.city}, {property.postcode}
            </div>

            {/* Property Highlights */}
            <div className="property-info__highlights">
              <div className="property-info__highlight">
                <span className="property-info__highlight-icon">🏠</span>
                <span>{property.type}</span>
              </div>
              <div className="property-info__highlight">
                <span className="property-info__highlight-icon">🛏️</span>
                <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
              </div>
              <div className="property-info__highlight">
                <span className="property-info__highlight-icon">📋</span>
                <span>{property.tenure}</span>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <p className="description">
            {property.shortDescription}
          </p>
        </div>

        {/* Sidebar with Actions */}
        <div className="property-sidebar">
          <div className="property-sidebar__agent">
            <div className="property-sidebar__agent-name">EstateAgent Pro</div>
            <div className="property-sidebar__agent-role">Your Property Experts</div>
          </div>

          <div className="property-sidebar__actions">
            <button
              className={`btn ${isPropertyFavourite ? 'btn--danger' : 'btn--success'}`}
              onClick={handleFavouriteToggle}
            >
              {isPropertyFavourite ? '❤️ Remove from Favourites' : '🤍 Add to Favourites'}
            </button>
            <button className="btn btn--primary">
              📞 Contact Agent
            </button>
            <button className="btn btn--secondary">
              📧 Request Viewing
            </button>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <PropertyTabs property={property} />
    </div>
  );
}

export default PropertyPage;
