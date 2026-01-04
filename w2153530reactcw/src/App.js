// App.js - Main component for the Estate Agent app
// Handles page switching and manages favourites list

import React, { useState, useCallback } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import propertiesData from './data/properties.json';

function App() {
  // which page to show - 'search' or 'property'
  const [currentView, setCurrentView] = useState('search');
  
  // the property user clicked to view
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // list of favourite properties
  const [favourites, setFavourites] = useState([]);

  // go to property details page
  const handleViewProperty = useCallback((property) => {
    setSelectedProperty(property);
    setCurrentView('property');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // go back to search page
  const handleBackToSearch = useCallback(() => {
    setCurrentView('search');
    setSelectedProperty(null);
  }, []);

  // add property to favourites (no duplicates allowed)
  const handleAddToFavourites = useCallback((property) => {
    setFavourites((prev) => {
      const exists = prev.some((fav) => fav.id === property.id);
      if (exists) {
        return prev;
      }
      return [...prev, property];
    });
  }, []);

  // remove property from favourites
  const handleRemoveFromFavourites = useCallback((propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  }, []);

  // clear all favourites
  const handleClearFavourites = useCallback(() => {
    setFavourites([]);
  }, []);

  // check if property is in favourites
  const isFavourite = useCallback(
    (propertyId) => favourites.some((fav) => fav.id === propertyId),
    [favourites]
  );

  return (
    <div className="app">
      <Header
        currentView={currentView}
        onNavigateHome={handleBackToSearch}
      />

      <main className="main-content">
        {currentView === 'search' ? (
          <SearchPage
            properties={propertiesData.properties}
            favourites={favourites}
            onViewProperty={handleViewProperty}
            onAddToFavourites={handleAddToFavourites}
            onRemoveFromFavourites={handleRemoveFromFavourites}
            onClearFavourites={handleClearFavourites}
            isFavourite={isFavourite}
          />
        ) : (
          <PropertyPage
            property={selectedProperty}
            onBack={handleBackToSearch}
            onAddToFavourites={handleAddToFavourites}
            onRemoveFromFavourites={handleRemoveFromFavourites}
            isFavourite={isFavourite}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
