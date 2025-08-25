import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Navigation, MapPin, Anchor, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ShipLocationTracker = ({ isDarkMode }) => {
  const [shipPosition, setShipPosition] = useState([25.7617, -80.1918]); // Miami start
  const [destination] = useState([18.2208, -66.5901]); // San Juan, Puerto Rico
  const [route, setRoute] = useState([[25.7617, -80.1918]]);
  const [voyageData, setVoyageData] = useState({
    speed: 22,
    heading: 135,
    distanceToDestination: 1045,
    estimatedArrival: new Date(Date.now() + 47 * 60 * 60 * 1000)
  });

  // Custom ship icon
  const shipIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2L20 10H28L22 16L26 24H6L10 16L4 10H12L16 2Z" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
        <circle cx="16" cy="16" r="3" fill="#EF4444"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  const destinationIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#10B981"/>
      </svg>
    `),
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });

  // Simulate ship movement
  useEffect(() => {
    const interval = setInterval(() => {
      setShipPosition(prev => {
        const [lat, lng] = prev;
        const [destLat, destLng] = destination;
        
        // Calculate movement towards destination
        const latDiff = (destLat - lat) * 0.001;
        const lngDiff = (destLng - lng) * 0.001;
        
        const newLat = lat + latDiff;
        const newLng = lng + lngDiff;
        
        // Update route
        setRoute(prevRoute => [...prevRoute, [newLat, newLng]]);
        
        // Update voyage data
        const distance = Math.sqrt(Math.pow(destLat - newLat, 2) + Math.pow(destLng - newLng, 2)) * 69; // Rough miles
        setVoyageData(prev => ({
          ...prev,
          distanceToDestination: Math.max(0, distance),
          estimatedArrival: new Date(Date.now() + (distance / prev.speed) * 60 * 60 * 1000)
        }));
        
        return [newLat, newLng];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [destination]);

  return (
    <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800/80 border-slate-600' : 'bg-white/90 border-gray-200'} backdrop-blur-lg`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-semibold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <Navigation className="h-6 w-6 mr-2 text-blue-500" />
          🚢 Ship Location Tracker
        </h3>
        <div className="px-3 py-1 bg-green-600 text-green-100 rounded-full text-xs font-bold">
          ⚡ LIVE TRACKING
        </div>
      </div>

      {/* Map */}
      <div className="h-64 rounded-lg overflow-hidden mb-4 border-2 border-blue-200">
        <MapContainer
          center={[22, -73]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          className="z-10"
        >
          <TileLayer
            url={isDarkMode 
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {/* Ship marker */}
          <Marker position={shipPosition} icon={shipIcon}>
            <Popup>
              <div className="text-center">
                <strong>🚢 MS CruiseSafe</strong><br/>
                Speed: {voyageData.speed} knots<br/>
                Heading: {voyageData.heading}°
              </div>
            </Popup>
          </Marker>
          
          {/* Destination marker */}
          <Marker position={destination} icon={destinationIcon}>
            <Popup>
              <div className="text-center">
                <strong>📍 San Juan, Puerto Rico</strong><br/>
                Final Destination
              </div>
            </Popup>
          </Marker>
          
          {/* Route line */}
          <Polyline 
            positions={route} 
            color="#3B82F6" 
            weight={3}
            opacity={0.7}
            dashArray="10, 5"
          />
        </MapContainer>
      </div>

      {/* Voyage Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
          <div className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
            Distance Remaining
          </div>
          <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {voyageData.distanceToDestination.toFixed(0)} nm
          </div>
        </div>
        
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
          <div className={`text-sm font-medium mb-1 flex items-center ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
            <Clock className="h-3 w-3 mr-1" />
            ETA
          </div>
          <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {voyageData.estimatedArrival.toLocaleDateString()} {voyageData.estimatedArrival.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipLocationTracker;