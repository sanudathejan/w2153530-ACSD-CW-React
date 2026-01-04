// PropertyTabs.js - Tabbed content for property details
// Shows description, floor plan, and map location

import React, { useState, useCallback } from 'react';

// tab options
const TABS = [
  { id: 'description', label: 'Description', icon: '📝' },
  { id: 'floorplan', label: 'Floor Plan', icon: '📐' },
  { id: 'location', label: 'Location', icon: '📍' }
];

function PropertyTabs({ property }) {
  const [activeTab, setActiveTab] = useState('description');

  // switch tab
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // keyboard navigation for tabs
  const handleKeyDown = useCallback((e, index) => {
    let newIndex;
    
    switch (e.key) {
      case 'ArrowLeft':
        newIndex = index === 0 ? TABS.length - 1 : index - 1;
        break;
      case 'ArrowRight':
        newIndex = index === TABS.length - 1 ? 0 : index + 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = TABS.length - 1;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    setActiveTab(TABS[newIndex].id);
  }, []);

  // google maps url
  const getMapUrl = useCallback(() => {
    const { lat, lng } = property.location.coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  }, [property.location.coordinates]);

  return (
    <div className="tabs" role="tablist" aria-label="Property information tabs">
      {/* Tab Headers */}
      <div className="tabs__header">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`tabs__tab ${activeTab === tab.id ? 'tabs__tab--active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            <span role="img" aria-hidden="true">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabs__content">
        {/* Description Panel */}
        <div
          id="panel-description"
          className={`tabs__panel ${activeTab === 'description' ? 'tabs__panel--active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-description"
          hidden={activeTab !== 'description'}
        >
          <div className="description">
            <h3>About this property</h3>
            <p>{property.longDescription}</p>
            
            <h3>Key Features</h3>
            <ul>
              <li>{property.bedrooms} bedroom {property.type.toLowerCase()}</li>
              <li>{property.tenure} property</li>
              <li>Located in {property.postcode}</li>
              <li>Added on {new Date(property.dateAdded).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</li>
            </ul>
          </div>
        </div>

        {/* Floor Plan Panel */}
        <div
          id="panel-floorplan"
          className={`tabs__panel ${activeTab === 'floorplan' ? 'tabs__panel--active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-floorplan"
          hidden={activeTab !== 'floorplan'}
        >
          <div className="floor-plan">
            <h3 className="mb-md">Floor Plan</h3>
            <img
              src={property.floorPlan}
              alt={`Floor plan for ${property.shortDescription}`}
              className="floor-plan__image"
            />
          </div>
        </div>

        {/* Location/Map Panel */}
        <div
          id="panel-location"
          className={`tabs__panel ${activeTab === 'location' ? 'tabs__panel--active' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-location"
          hidden={activeTab !== 'location'}
        >
          <div className="location">
            <h3 className="mb-md">Location</h3>
            <p className="mb-md">
              <strong>Address:</strong> {property.location.address}, {property.location.city}, {property.postcode}
            </p>
            <div className="map-container">
              <iframe
                src={getMapUrl()}
                title={`Map showing location of ${property.location.address}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyTabs;
