// SearchPage.js - Main page with search form and property results

import React, { useState, useMemo, useCallback } from 'react';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import FavouritesPanel from '../components/FavouritePanel';

// Function to filter properties based on search criteria
export const searchProperties = (properties, criteria) => {
  // if no criteria, return all
  if (!criteria || Object.keys(criteria).length === 0) {
    return properties;
  }

  return properties.filter((property) => {
    // check property type
    if (criteria.propertyType && criteria.propertyType !== '') {
      if (property.type.toLowerCase() !== criteria.propertyType.toLowerCase()) {
        return false;
      }
    }

    // check min price
    if (criteria.minPrice !== undefined && criteria.minPrice !== '') {
      if (property.price < criteria.minPrice) {
        return false;
      }
    }

    // check max price
    if (criteria.maxPrice !== undefined && criteria.maxPrice !== '') {
      if (property.price > criteria.maxPrice) {
        return false;
      }
    }

    // check min bedrooms
    if (criteria.minBedrooms !== undefined && criteria.minBedrooms !== '') {
      if (property.bedrooms < criteria.minBedrooms) {
        return false;
      }
    }

    // check max bedrooms
    if (criteria.maxBedrooms !== undefined && criteria.maxBedrooms !== '') {
      if (property.bedrooms > criteria.maxBedrooms) {
        return false;
      }
    }

    // check date from
    if (criteria.dateFrom) {
      const propertyDate = new Date(property.dateAdded);
      if (propertyDate < criteria.dateFrom) {
        return false;
      }
    }

    // check date to
    if (criteria.dateTo) {
      const propertyDate = new Date(property.dateAdded);
      if (propertyDate > criteria.dateTo) {
        return false;
      }
    }

    // check postcode
    if (criteria.postcode && criteria.postcode !== '') {
      const searchPostcode = criteria.postcode.toUpperCase().trim();
      const propertyPostcode = property.postcode.toUpperCase().trim();
      if (!propertyPostcode.startsWith(searchPostcode)) {
        return false;
      }
    }

    return true;
  });
};

// SearchPage component
function SearchPage({
  properties,
  favourites,
  onViewProperty,
  onAddToFavourites,
  onRemoveFromFavourites,
  onClearFavourites,
  isFavourite
}) {
  const [searchCriteria, setSearchCriteria] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  // handle search
  const handleSearch = useCallback((criteria) => {
    setSearchCriteria(criteria);
    setHasSearched(true);
  }, []);

  // handle reset
  const handleReset = useCallback(() => {
    setSearchCriteria({});
    setHasSearched(false);
  }, []);

  // filter properties based on criteria
  const filteredProperties = useMemo(() => {
    return searchProperties(properties, searchCriteria);
  }, [properties, searchCriteria]);

  const displayProperties = hasSearched ? filteredProperties : properties;

  return (
    <div className="page-layout">
      <div className="page-layout__main">
        {/* Search Section */}
        <section className="search-section" aria-labelledby="search-title">
          <h1 id="search-title" className="search-section__title">
            Find Your Perfect Property
          </h1>
          <SearchForm onSearch={handleSearch} onReset={handleReset} />
        </section>

        {/* Results Section */}
        <section className="results-section" aria-labelledby="results-title">
          <div className="results-section__header">
            <h2 id="results-title" className="results-section__title">
              {hasSearched ? 'Search Results' : 'All Properties'}
            </h2>
            <span className="results-section__count">
              {displayProperties.length} {displayProperties.length === 1 ? 'property' : 'properties'} found
            </span>
          </div>

          {displayProperties.length > 0 ? (
            <div className="property-grid">
              {displayProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={onViewProperty}
                  onAddToFavourites={onAddToFavourites}
                  onRemoveFromFavourites={onRemoveFromFavourites}
                  isFavourite={isFavourite(property.id)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results__icon">🏠</div>
              <h3 className="no-results__title">No properties found</h3>
              <p>Try adjusting your search criteria to find more properties.</p>
              <button className="btn btn--primary mt-lg" onClick={handleReset}>
                Clear Search
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Favourites Sidebar */}
      <div className="page-layout__sidebar">
        <FavouritesPanel
          favourites={favourites}
          onRemove={onRemoveFromFavourites}
          onClear={onClearFavourites}
          onAdd={onAddToFavourites}
          onViewProperty={onViewProperty}
        />
      </div>
    </div>
  );
}

export default SearchPage;
