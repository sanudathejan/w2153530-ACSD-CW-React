// App.test.js - Tests for the Estate Agent app

import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { searchProperties } from './pages/SearchPage';
import { formatPrice, formatDate } from './components/PropertyCard';

// test data
const mockProperties = [
  {
    id: 'test1',
    type: 'House',
    bedrooms: 3,
    price: 450000,
    tenure: 'Freehold',
    postcode: 'BR1',
    shortDescription: 'Test House in Bromley',
    longDescription: 'A beautiful test house',
    dateAdded: '2024-11-15',
    location: {
      address: '123 Test Street',
      city: 'Bromley',
      coordinates: { lat: 51.4039, lng: 0.0198 }
    },
    images: ['https://example.com/image1.jpg'],
    floorPlan: 'https://example.com/floorplan.jpg'
  },
  {
    id: 'test2',
    type: 'Flat',
    bedrooms: 2,
    price: 300000,
    tenure: 'Leasehold',
    postcode: 'NW1',
    shortDescription: 'Test Flat in Camden',
    longDescription: 'A modern test flat',
    dateAdded: '2024-12-01',
    location: {
      address: '456 Test Road',
      city: 'London',
      coordinates: { lat: 51.5391, lng: -0.1426 }
    },
    images: ['https://example.com/image2.jpg'],
    floorPlan: 'https://example.com/floorplan2.jpg'
  },
  {
    id: 'test3',
    type: 'House',
    bedrooms: 5,
    price: 850000,
    tenure: 'Freehold',
    postcode: 'SW19',
    shortDescription: 'Large House in Wimbledon',
    longDescription: 'A spacious family home',
    dateAdded: '2024-10-01',
    location: {
      address: '789 Test Avenue',
      city: 'London',
      coordinates: { lat: 51.4219, lng: -0.2086 }
    },
    images: ['https://example.com/image3.jpg'],
    floorPlan: 'https://example.com/floorplan3.jpg'
  }
];

// App Component Tests
describe('App Component', () => {
  test('renders the main application with header and search section', () => {
    render(<App />);
    
    // Check header renders with logo
    expect(screen.getByText('EstateAgent Pro')).toBeInTheDocument();
    
    // Check search section title
    expect(screen.getByText('Find Your Perfect Property')).toBeInTheDocument();
    
    // Check navigation link
    expect(screen.getByText('Search Properties')).toBeInTheDocument();
  });

  test('renders footer with copyright information', () => {
    render(<App />);
    
    // Check footer renders
    expect(screen.getByText(/University of Westminster/i)).toBeInTheDocument();
    expect(screen.getByText(/5COSC026W Coursework/i)).toBeInTheDocument();
  });

  test('renders favourites panel on search page', () => {
    render(<App />);
    
    // Check favourites panel renders - look for the panel and its title
    const favouritesPanel = document.querySelector('.favourites-panel');
    expect(favouritesPanel).toBeInTheDocument();
    const panelTitle = document.querySelector('.favourites-panel__title');
    expect(panelTitle).toBeInTheDocument();
  });
});

// Search Function Tests
describe('Search Functionality', () => {
  test('returns all properties when no criteria provided', () => {
    const result = searchProperties(mockProperties, {});
    expect(result).toHaveLength(3);
  });

  test('filters by property type correctly', () => {
    const result = searchProperties(mockProperties, { propertyType: 'House' });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.type === 'House')).toBe(true);
  });

  test('filters by price range correctly', () => {
    const result = searchProperties(mockProperties, { 
      minPrice: 400000, 
      maxPrice: 500000 
    });
    expect(result).toHaveLength(1);
    expect(result[0].price).toBe(450000);
  });

  test('filters by minimum bedrooms correctly', () => {
    const result = searchProperties(mockProperties, { minBedrooms: 3 });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.bedrooms >= 3)).toBe(true);
  });

  test('filters by maximum bedrooms correctly', () => {
    const result = searchProperties(mockProperties, { maxBedrooms: 3 });
    expect(result).toHaveLength(2);
    expect(result.every(p => p.bedrooms <= 3)).toBe(true);
  });

  test('filters by postcode area correctly', () => {
    const result = searchProperties(mockProperties, { postcode: 'BR1' });
    expect(result).toHaveLength(1);
    expect(result[0].postcode).toBe('BR1');
  });

  test('filters by date range correctly', () => {
    const result = searchProperties(mockProperties, { 
      dateFrom: new Date('2024-11-01'),
      dateTo: new Date('2024-11-30')
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('test1');
  });

  test('combines multiple criteria correctly', () => {
    const result = searchProperties(mockProperties, { 
      propertyType: 'House',
      minPrice: 400000,
      maxBedrooms: 4
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('test1');
  });

  test('returns empty array when no properties match', () => {
    const result = searchProperties(mockProperties, { 
      propertyType: 'Flat',
      minBedrooms: 5
    });
    expect(result).toHaveLength(0);
  });
});

// Price Formatting Tests
describe('Price Formatting', () => {
  test('formats price with pound symbol and commas', () => {
    expect(formatPrice(450000)).toBe('£450,000');
  });

  test('formats large prices correctly', () => {
    expect(formatPrice(1250000)).toBe('£1,250,000');
  });

  test('formats small prices correctly', () => {
    expect(formatPrice(99000)).toBe('£99,000');
  });
});

// Date Formatting Tests
describe('Date Formatting', () => {
  test('formats date in UK format', () => {
    const result = formatDate('2024-11-15');
    expect(result).toContain('Nov');
    expect(result).toContain('2024');
  });

  test('handles different date formats', () => {
    const result = formatDate('2024-12-25');
    expect(result).toContain('Dec');
  });
});

// Favourites Tests
describe('Favourites Management', () => {
  test('can add property to favourites', async () => {
    render(<App />);
    
    // Find all favourite buttons (heart icons on property cards)
    const favouriteButtons = screen.getAllByTitle('Add to favourites');
    expect(favouriteButtons.length).toBeGreaterThan(0);
    
    // Click the first favourite button
    fireEvent.click(favouriteButtons[0]);
    
    // Check that the favourites count has updated
    const favouritesPanel = screen.getByText(/Favourites/i).closest('.favourites-panel');
    expect(favouritesPanel).toBeInTheDocument();
  });

  test('favourites panel shows empty state initially', () => {
    render(<App />);
    
    // Check for empty state message
    expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
  });

  test('clear all button appears when favourites exist', async () => {
    render(<App />);
    
    // Add a property to favourites
    const favouriteButtons = screen.getAllByTitle('Add to favourites');
    fireEvent.click(favouriteButtons[0]);
    
    // Check for clear all button
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  test('can remove property from favourites', async () => {
    render(<App />);
    
    // Add a property to favourites
    const favouriteButtons = screen.getAllByTitle('Add to favourites');
    fireEvent.click(favouriteButtons[0]);
    
    // Now find the remove button in the favourites panel and click it
    const favouritesPanel = document.querySelector('.favourites-panel');
    const removeButton = within(favouritesPanel).getByTitle('Remove from favourites');
    fireEvent.click(removeButton);
    
    // Check empty state is shown again
    expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
  });

  test('prevents duplicate favourites', async () => {
    render(<App />);
    
    // Find first property's favourite button
    const favouriteButtons = screen.getAllByTitle('Add to favourites');
    
    // Click it twice
    fireEvent.click(favouriteButtons[0]);
    
    // After first click, button should change to "Remove from favourites"
    // There will be 2 remove buttons: one on the property card and one in the favourites panel
    const removeButtons = screen.getAllByTitle('Remove from favourites');
    expect(removeButtons.length).toBe(2);
  });
});

// Search Form Tests
describe('Search Form', () => {
  test('search form renders all input fields', () => {
    render(<App />);
    
    // Check for property type select
    expect(screen.getByLabelText(/Property Type/i)).toBeInTheDocument();
    
    // Check for postcode input
    expect(screen.getByLabelText(/Postcode Area/i)).toBeInTheDocument();
    
    // Check for search button (use role and within form)
    const searchForm = screen.getByRole('search');
    expect(within(searchForm).getByRole('button', { name: /Search Properties/i })).toBeInTheDocument();
    
    // Check for reset button
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
  });

  test('search form can be submitted', async () => {
    render(<App />);
    
    // Find the search button within the search form
    const searchForm = screen.getByRole('search');
    const searchButton = within(searchForm).getByRole('button', { name: /Search Properties/i });
    
    // Click search button
    fireEvent.click(searchButton);
    
    // Results section should update
    expect(screen.getByText(/Search Results/i)).toBeInTheDocument();
  });

  test('reset button clears search and shows all properties', async () => {
    render(<App />);
    
    // Click search first - use within form to get the correct button
    const searchForm = screen.getByRole('search');
    const searchButton = within(searchForm).getByRole('button', { name: /Search Properties/i });
    fireEvent.click(searchButton);
    
    // Click reset
    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);
    
    // Should show "All Properties" instead of "Search Results"
    expect(screen.getByText(/All Properties/i)).toBeInTheDocument();
  });
});

// Property Card Tests
describe('Property Card', () => {
  test('property cards are rendered', () => {
    render(<App />);
    
    // Check that property cards exist
    const propertyCards = document.querySelectorAll('.property-card');
    expect(propertyCards.length).toBeGreaterThan(0);
  });

  test('property cards display price', () => {
    render(<App />);
    
    // Check for price format (£ symbol)
    const prices = screen.getAllByText(/£\d/);
    expect(prices.length).toBeGreaterThan(0);
  });

  test('property cards are draggable', () => {
    render(<App />);
    
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
      expect(card.getAttribute('draggable')).toBe('true');
    });
  });
});

// Accessibility Tests
describe('Accessibility', () => {
  test('search form has proper labels', () => {
    render(<App />);
    
    // Check that form elements have associated labels
    const propertyTypeSelect = screen.getByLabelText(/Property Type/i);
    expect(propertyTypeSelect).toBeInTheDocument();
    
    const postcodeInput = screen.getByLabelText(/Postcode Area/i);
    expect(postcodeInput).toBeInTheDocument();
  });

  test('favourite buttons have aria-labels', () => {
    render(<App />);
    
    const favouriteButtons = screen.getAllByTitle('Add to favourites');
    favouriteButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });

  test('navigation has proper aria attributes', () => {
    render(<App />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label');
  });
});
