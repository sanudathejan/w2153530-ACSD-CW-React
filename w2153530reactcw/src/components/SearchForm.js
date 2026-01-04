// SearchForm.js - Search form with filters for properties
// Filter by type, price, bedrooms, date, and postcode

import React, { useState, useCallback } from 'react';

function SearchForm({ onSearch, onReset }) {
  // form fields
  const [formData, setFormData] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });

  // eslint-disable-next-line no-unused-vars
  const [touched, setTouched] = useState({});

  // update form field
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  }, []);

  // submit form
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // build criteria object
    const criteria = {};
    
    if (formData.propertyType) {
      criteria.propertyType = formData.propertyType;
    }
    if (formData.minPrice) {
      criteria.minPrice = parseInt(formData.minPrice, 10);
    }
    if (formData.maxPrice) {
      criteria.maxPrice = parseInt(formData.maxPrice, 10);
    }
    if (formData.minBedrooms) {
      criteria.minBedrooms = parseInt(formData.minBedrooms, 10);
    }
    if (formData.maxBedrooms) {
      criteria.maxBedrooms = parseInt(formData.maxBedrooms, 10);
    }
    if (formData.dateFrom) {
      criteria.dateFrom = new Date(formData.dateFrom);
    }
    if (formData.dateTo) {
      criteria.dateTo = new Date(formData.dateTo);
    }
    if (formData.postcode) {
      criteria.postcode = formData.postcode.toUpperCase().trim();
    }
    
    onSearch(criteria);
  }, [formData, onSearch]);

  // reset form
  const handleReset = useCallback(() => {
    setFormData({
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
    setTouched({});
    onReset();
  }, [onReset]);

  // dropdown options
  const propertyTypes = [
    { value: '', label: 'Any Type' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  const priceOptions = [
    { value: '', label: 'No limit' },
    { value: '100000', label: '£100,000' },
    { value: '200000', label: '£200,000' },
    { value: '300000', label: '£300,000' },
    { value: '400000', label: '£400,000' },
    { value: '500000', label: '£500,000' },
    { value: '600000', label: '£600,000' },
    { value: '750000', label: '£750,000' },
    { value: '1000000', label: '£1,000,000' },
    { value: '1500000', label: '£1,500,000' },
    { value: '2000000', label: '£2,000,000' }
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' }
  ];

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      {/* Property Type - Dropdown Select Widget */}
      <div className="form-group">
        <label htmlFor="propertyType" className="form-group__label">
          Property Type
        </label>
        <select
          id="propertyType"
          name="propertyType"
          className="form-group__select"
          value={formData.propertyType}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby="propertyType-help"
        >
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range - Min/Max Select Widgets */}
      <div className="form-group form-group--range">
        <label className="form-group__label">Price Range</label>
        <div className="form-group__inputs">
          <select
            id="minPrice"
            name="minPrice"
            className="form-group__select"
            value={formData.minPrice}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label="Minimum price"
          >
            <option value="">Min Price</option>
            {priceOptions.slice(1).map((price) => (
              <option key={`min-${price.value}`} value={price.value}>
                {price.label}
              </option>
            ))}
          </select>
          <select
            id="maxPrice"
            name="maxPrice"
            className="form-group__select"
            value={formData.maxPrice}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label="Maximum price"
          >
            <option value="">Max Price</option>
            {priceOptions.slice(1).map((price) => (
              <option key={`max-${price.value}`} value={price.value}>
                {price.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bedrooms Range - Min/Max Select Widgets */}
      <div className="form-group form-group--range">
        <label className="form-group__label">Bedrooms</label>
        <div className="form-group__inputs">
          <select
            id="minBedrooms"
            name="minBedrooms"
            className="form-group__select"
            value={formData.minBedrooms}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label="Minimum bedrooms"
          >
            <option value="">Min Beds</option>
            {bedroomOptions.slice(1).map((bed) => (
              <option key={`min-${bed.value}`} value={bed.value}>
                {bed.label}
              </option>
            ))}
          </select>
          <select
            id="maxBedrooms"
            name="maxBedrooms"
            className="form-group__select"
            value={formData.maxBedrooms}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label="Maximum bedrooms"
          >
            <option value="">Max Beds</option>
            {bedroomOptions.slice(1).map((bed) => (
              <option key={`max-${bed.value}`} value={bed.value}>
                {bed.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date Added Range - Date Picker Widgets */}
      <div className="form-group form-group--range">
        <label className="form-group__label">Date Added</label>
        <div className="form-group__inputs">
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            className="form-group__input"
            value={formData.dateFrom}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label="From date"
          />
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            className="form-group__input"
            value={formData.dateTo}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label="To date"
          />
        </div>
      </div>

      {/* Postcode Area - Text Input with Pattern Widget */}
      <div className="form-group">
        <label htmlFor="postcode" className="form-group__label">
          Postcode Area
        </label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          className="form-group__input"
          value={formData.postcode}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. BR1, NW1, SW19"
          pattern="[A-Za-z]{1,2}[0-9]{1,2}"
          title="Enter postcode area (e.g., BR1, NW1)"
          aria-describedby="postcode-help"
          autoComplete="off"
        />
        <small id="postcode-help" className="sr-only">
          Enter the first part of the postcode
        </small>
      </div>

      {/* Form Actions */}
      <div className="search-form__actions">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={handleReset}
        >
          Reset
        </button>
        <button type="submit" className="btn btn--primary">
          🔍 Search Properties
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
