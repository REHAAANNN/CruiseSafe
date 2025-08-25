import React, { useState, useEffect } from 'react';
import { Cloud, Wind, Waves, Thermometer } from 'lucide-react';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 18,
    windSpeed: 12,
    waveHeight: 1.8,
    visibility: 8,
    conditions: 'Partly Cloudy'
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching weather data
    const fetchWeather = () => {
      setTimeout(() => {
        setWeatherData({
          temperature: Math.floor(Math.random() * 10) + 15,
          windSpeed: Math.floor(Math.random() * 15) + 5,
          waveHeight: Number((Math.random() * 2 + 0.5).toFixed(1)),
          visibility: Math.floor(Math.random() * 5) + 5,
          conditions: ['Clear', 'Partly Cloudy', 'Overcast', 'Light Rain'][Math.floor(Math.random() * 4)]
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Cloud className="h-6 w-6 mr-2 text-blue-400" />
          Current Conditions
        </h3>
        <div className="text-xs text-slate-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-6 bg-slate-600 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center text-blue-300 mb-2">
              <Thermometer className="h-4 w-4 mr-2" />
              <span className="text-sm">Temperature</span>
            </div>
            <div className="text-2xl font-bold text-white">{weatherData.temperature}°C</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center text-green-300 mb-2">
              <Wind className="h-4 w-4 mr-2" />
              <span className="text-sm">Wind Speed</span>
            </div>
            <div className="text-2xl font-bold text-white">{weatherData.windSpeed} kts</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center text-cyan-300 mb-2">
              <Waves className="h-4 w-4 mr-2" />
              <span className="text-sm">Wave Height</span>
            </div>
            <div className="text-2xl font-bold text-white">{weatherData.waveHeight}m</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center text-purple-300 mb-2">
              <span className="text-sm">Visibility</span>
            </div>
            <div className="text-2xl font-bold text-white">{weatherData.visibility} km</div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600/50 rounded-lg">
        <p className="text-blue-200 text-sm font-medium">{weatherData.conditions}</p>
        <p className="text-blue-300/80 text-xs mt-1">
          Conditions are {weatherData.waveHeight > 2 ? 'rough' : weatherData.waveHeight > 1.5 ? 'moderate' : 'calm'} - 
          {weatherData.visibility < 5 ? ' reduced visibility' : ' good visibility'}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;