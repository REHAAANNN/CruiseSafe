import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Anchor, Navigation } from 'lucide-react';

const DestinationTracker = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 25.7617,
    lng: -80.1918,
    location: "Miami, Florida"
  });

  const [destination] = useState({
    lat: 18.2208,
    lng: -66.5901,
    location: "San Juan, Puerto Rico"
  });

  const [voyageData, setVoyageData] = useState({
    distanceRemaining: 1045,
    totalDistance: 1045,
    speed: 22,
    estimatedArrival: new Date(Date.now() + 47 * 60 * 60 * 1000), // 47 hours from now
    weatherDelay: 0
  });

  const [isMoving, setIsMoving] = useState(true);

  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setVoyageData(prev => {
        const newDistance = Math.max(0, prev.distanceRemaining - (prev.speed * 0.1)); // Simulate movement
        const progress = ((prev.totalDistance - newDistance) / prev.totalDistance) * 100;
        
        return {
          ...prev,
          distanceRemaining: newDistance,
          estimatedArrival: new Date(Date.now() + (newDistance / prev.speed) * 60 * 60 * 1000)
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isMoving]);

  const formatTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressPercentage = () => {
    return ((voyageData.totalDistance - voyageData.distanceRemaining) / voyageData.totalDistance) * 100;
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const arrival = voyageData.estimatedArrival;
    const diffMs = arrival - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    }
    return `${diffMinutes}m`;
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Navigation className="h-6 w-6 mr-2 text-blue-400" />
          Voyage Progress
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          isMoving ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
        }`}>
          {isMoving ? '⚡ UNDERWAY' : '⚓ ANCHORED'}
        </div>
      </div>

      {/* Route Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center text-blue-300 mb-2">
            <Anchor className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Current Position</span>
          </div>
          <p className="text-white font-semibold">{currentPosition.location}</p>
          <p className="text-slate-300 text-xs">
            {currentPosition.lat.toFixed(4)}°N, {Math.abs(currentPosition.lng).toFixed(4)}°W
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center text-green-300 mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Destination</span>
          </div>
          <p className="text-white font-semibold">{destination.location}</p>
          <p className="text-slate-300 text-xs">
            {destination.lat.toFixed(4)}°N, {Math.abs(destination.lng).toFixed(4)}°W
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-300 mb-2">
          <span>Voyage Progress</span>
          <span>{getProgressPercentage().toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-500 h-3 rounded-full transition-all duration-1000 relative"
            style={{ width: `${getProgressPercentage()}%` }}
          >
            <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Voyage Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-orange-300 text-sm font-medium mb-1">Distance Remaining</div>
          <div className="text-white text-xl font-bold">
            {voyageData.distanceRemaining.toFixed(0)} <span className="text-sm font-normal">nautical miles</span>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-purple-300 text-sm font-medium mb-1">Current Speed</div>
          <div className="text-white text-xl font-bold">
            {voyageData.speed} <span className="text-sm font-normal">knots</span>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-cyan-300 text-sm font-medium mb-1 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Time Remaining
          </div>
          <div className="text-white text-lg font-bold">{getTimeRemaining()}</div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-green-300 text-sm font-medium mb-1">Estimated Arrival</div>
          <div className="text-white text-sm font-bold">
            {formatTime(voyageData.estimatedArrival)}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-3">
        <div className="flex items-center text-blue-200 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          <span>All systems normal • Smooth sailing conditions • On schedule</span>
        </div>
        {voyageData.weatherDelay > 0 && (
          <div className="flex items-center text-yellow-200 text-sm mt-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            <span>Weather delay: +{voyageData.weatherDelay} minutes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationTracker;