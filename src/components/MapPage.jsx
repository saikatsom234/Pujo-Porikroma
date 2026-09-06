import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Search, Map as MapIcon, Route, ArrowLeft } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';
import { batchOnePujos } from '../data/pujos-part1';
import { batchTwoPujos } from '../data/pujos-part2';
import { batchThreePujos } from '../data/pujos-part3';
import MarkerClusterGroup from 'react-leaflet-cluster';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const rawPujos = [...batchOnePujos, ...batchTwoPujos, ...batchThreePujos];

// Remove duplicate items based on exact lowercase name matching
const uniquePujosMap = new Map();
rawPujos.forEach(pujo => {
  const cleanName = pujo.name.trim().toLowerCase();
  if (!uniquePujosMap.has(cleanName)) {
    uniquePujosMap.set(cleanName, pujo);
  }
});
const allPujos = Array.from(uniquePujosMap.values());

// Format the new data and combine with some sample metro/toilet data
const formattedPujos = allPujos.map((p, index) => ({
  id: `pujo-${index}`,
  type: 'pandal',
  name: p.name,
  lat: p.lat,
  lng: p.lng
}));

const locationData = [
  ...formattedPujos,
  { id: 'm1', type: 'metro', name: 'Dum Dum Metro', lat: 22.6225, lng: 88.3912 },
  { id: 'm2', type: 'metro', name: 'Sealdah Metro', lat: 22.5683, lng: 88.3714 },
  { id: 't1', type: 'toilet', name: 'Public Toilet', lat: 22.5710, lng: 88.3650 }
];

// Helper to create custom HTML markers
const createCustomIcon = (type, count) => {
  let bgColor = '#c0392b'; // deep red/coral for pandals
  if (type === 'metro') bgColor = '#2980b9'; // blue for metro
  if (type === 'toilet') bgColor = '#16a085'; // teal for toilet

  const html = `
    <div class="custom-marker" style="background-color: ${bgColor};">
      <span>${type === 'pandal' ? '⛩️' : type === 'metro' ? '🚇' : '🚻'}</span>
    </div>
  `;

  return L.divIcon({
    className: 'custom-marker-wrapper',
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Component to handle recentering when clicking a marker
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
  const [activeFilter, setActiveFilter] = useState('all'); // all, pandal, metro, toilet
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]); // Default Kolkata
  
  const filteredData = locationData.filter(loc => activeFilter === 'all' || loc.type === activeFilter);

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
              placeholder="Search pandals, metro, toilets" 
              className="w-full outline-none text-sm font-medium text-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          <button 
            onClick={() => setActiveFilter(activeFilter === 'pandal' ? 'all' : 'pandal')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold shadow-sm transition-colors ${activeFilter === 'pandal' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-white text-gray-600'}`}
          >
            ⛩️ PANDALS
          </button>
          <button 
            onClick={() => setActiveFilter(activeFilter === 'metro' ? 'all' : 'metro')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold shadow-sm transition-colors ${activeFilter === 'metro' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-white text-gray-600'}`}
          >
            🚇 METRO
          </button>
          <button 
            onClick={() => setActiveFilter(activeFilter === 'toilet' ? 'all' : 'toilet')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold shadow-sm transition-colors ${activeFilter === 'toilet' ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'bg-white text-gray-600'}`}
          >
            🚻 TOILETS
          </button>
        </div>
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

          <MarkerClusterGroup chunkedLoading>
            {filteredData.map(loc => (
              <Marker 
                key={loc.id} 
                position={[loc.lat, loc.lng]} 
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
          <div className="w-12 h-12 rounded-full bg-red-100 flex justify-center items-center text-red-500 text-xl">
            {selectedLocation?.type === 'pandal' ? '⛩️' : selectedLocation?.type === 'metro' ? '🚇' : '🚻'}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 m-0">{selectedLocation ? selectedLocation.name : 'Select a location'}</h3>
            <p className="text-gray-500 text-sm m-0 mt-1">Tap any pin to preview</p>
          </div>
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
