import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Search, Map as MapIcon, Route, ArrowLeft, Filter, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './MapPage.css';

import { pujosData } from '../data/pujos-data';

// Helper to create custom HTML markers for individual pins
const createCustomIcon = (category) => {
  let bgColor = '#c0392b'; // Default red
  if (category === 'North Kolkata') bgColor = '#d35400'; // Orange
  if (category === 'South Kolkata') bgColor = '#8e44ad'; // Purple
  if (category === 'Salt Lake') bgColor = '#2980b9'; // Blue
  if (category === 'Bonedi Bari') bgColor = '#16a085'; // Teal
  if (category === 'Iconic') bgColor = '#f39c12'; // Yellow/Gold

  const html = `
    <div class="custom-marker" style="background-color: ${bgColor};">
      <span>⛩️</span>
    </div>
  `;

  return L.divIcon({
    className: 'custom-marker-wrapper',
    html,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
};

// Component to handle recentering
const RecenterMap = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
};

const MapPage = ({ onClose }) => {
  const [activeFilters, setActiveFilters] = useState({
    'Iconic': true,
    'North Kolkata': true,
    'South Kolkata': true,
    'Salt Lake': true,
    'Bonedi Bari': true
  });
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]); // Default Kolkata
  
  const toggleFilter = (category) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredData = pujosData.filter(loc => activeFilters[loc.category]);

  const handleMarkerClick = (loc) => {
    setSelectedLocation(loc);
    setMapCenter([loc.lat, loc.lng]);
  };

  return (
    <div className="map-page-container">
      {/* Top Search & Filter Bar */}
      <div className="map-top-bar">
        <div className="flex items-center gap-2 mb-3">
          <button onClick={onClose} className="p-2 bg-white rounded-full shadow-md text-gray-800">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 bg-white rounded-full px-4 py-3 flex items-center shadow-md">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search 293 pandals..." 
              className="w-full outline-none text-sm font-medium text-gray-700 bg-transparent"
            />
          </div>
          <button 
            onClick={() => setIsFilterDrawerOpen(true)}
            className="p-3 bg-white rounded-full shadow-md text-gray-800 relative"
          >
            <Filter size={18} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Filter Drawer Overlay */}
      <div className={`filter-drawer-overlay ${isFilterDrawerOpen ? 'open' : ''}`} onClick={() => setIsFilterDrawerOpen(false)}></div>
      
      {/* Filter Drawer */}
      <div className={`filter-drawer ${isFilterDrawerOpen ? 'open' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800 m-0">Filter Categories</h2>
          <button onClick={() => setIsFilterDrawerOpen(false)} className="text-gray-500 p-1">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col gap-3">
          {Object.keys(activeFilters).map(category => (
            <label key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer active:bg-gray-100 transition-colors">
              <span className="font-semibold text-gray-700 text-sm">{category}</span>
              <input 
                type="checkbox" 
                checked={activeFilters[category]} 
                onChange={() => toggleFilter(category)}
                className="w-5 h-5 rounded text-red-600 focus:ring-red-500 accent-red-600"
              />
            </label>
          ))}
        </div>
        
        <button 
          onClick={() => setIsFilterDrawerOpen(false)}
          className="w-full mt-6 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 active:bg-red-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>

      {/* Map Area */}
      <div className="map-wrapper">
        <MapContainer 
          center={[22.5726, 88.3639]} 
          zoom={12} 
          zoomControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            maxZoom={20}
          />
          <ZoomControl position="bottomright" />
          
          <RecenterMap center={mapCenter} zoom={14} />

          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
            showCoverageOnHover={false}
          >
            {filteredData.map(loc => (
              <Marker 
                key={loc.id} 
                position={[loc.lat, loc.lng]} 
                icon={createCustomIcon(loc.category)}
                eventHandlers={{
                  click: () => handleMarkerClick(loc)
                }}
              />
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      {/* Bottom Floating Preview Card */}
      <div className={`map-preview-card ${selectedLocation ? 'active' : ''}`}>
        <div className="preview-card-inner bg-white rounded-3xl p-4 shadow-xl mx-4 mb-20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex justify-center items-center text-red-500 text-xl flex-shrink-0">
            ⛩️
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="font-bold text-gray-800 m-0 truncate whitespace-nowrap">{selectedLocation ? selectedLocation.name : 'Select a location'}</h3>
            <p className="text-gray-500 text-sm m-0 mt-1 truncate whitespace-nowrap">{selectedLocation ? selectedLocation.category : 'Tap any pin to preview'}</p>
          </div>
          <button 
            className="p-2 text-gray-400 hover:text-gray-600"
            onClick={(e) => { e.stopPropagation(); setSelectedLocation(null); }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="map-bottom-nav">
        <div className="flex justify-around items-center h-full bg-white border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
          <button className="flex flex-col items-center justify-center w-full h-full text-red-600 font-medium">
            <MapIcon size={24} className="mb-1" />
            <span className="text-[10px] uppercase tracking-wider">Map</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-400 font-medium">
            <Route size={24} className="mb-1" />
            <span className="text-[10px] uppercase tracking-wider">Routes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
