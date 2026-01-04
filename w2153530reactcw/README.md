# PropertyFinder

A property search website built with React for the Advanced Client-Side Web Development module (5COSC026W) at University of Westminster.

## What it does

- Search for properties by type, price, bedrooms, date added, and postcode
- View property details with image gallery, floor plan, and map
- Save favourite properties using drag and drop or clicking the heart button
- Responsive design that works on desktop, tablet, and mobile

## How to run

1. Install dependencies:
```
npm install
```

2. Start the app:
```
npm start
```

3. Open http://localhost:3000 in your browser

## Running tests

```
npm test
```

## Project structure

```
src/
├── App.js              - Main component, handles pages and favourites
├── App.css             - All the styles
├── components/
│   ├── Header.js       - Top navigation bar
│   ├── Footer.js       - Bottom footer
│   ├── SearchForm.js   - Search filters form
│   ├── PropertyCard.js - Property card in grid
│   ├── FavouritesPanel.js - Favourites sidebar
│   ├── PropertyTabs.js - Tabs for description/floorplan/map
│   └── ImageGallery.js - Image viewer with lightbox
├── pages/
│   ├── SearchPage.js   - Main search page
│   └── PropertyPage.js - Property details page
└── data/
    └── properties.json - Property data
```

## Features

- **Search**: Filter properties by multiple criteria
- **Favourites**: Drag and drop to add, drag to bin to remove
- **Responsive**: Works on all screen sizes
- **Accessible**: Keyboard navigation and screen reader support

## Built with

- React 19
- Create React App
- Jest for testing
