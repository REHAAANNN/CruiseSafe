import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertTriangle, MapPin } from 'lucide-react';

const StepGuide = ({ steps, emergencyType, isActive, selectedCabin, targetMuster, isDarkMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    if (isActive && steps.length > 0) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
            return prev + 1;
          } else {
            setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
            return prev;
          }
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isActive, steps.length]);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setCompletedSteps([]);
    }
  }, [isActive]);

  const getEmergencyColor = () => {
    switch (emergencyType) {
      case 'fire': return 'text-red-400';
      case 'storm': return 'text-blue-400';
      case 'collision': return 'text-orange-400';
      default: return 'text-green-400';
    }
  };

  const getEmergencyBg = () => {
    switch (emergencyType) {
      case 'fire': return 'bg-red-900/20 border-red-600/50';
      case 'storm': return 'bg-blue-900/20 border-blue-600/50';
      case 'collision': return 'bg-orange-900/20 border-orange-600/50';
      default: return 'bg-green-900/20 border-green-600/50';
    }
  };

  return (
    <div className={`backdrop-blur-sm rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800/80 border-slate-600' : 'bg-white/90 border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>📋 Evacuation Steps</h2>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          isActive ? 'bg-red-600 text-red-100 animate-pulse' : 'bg-gray-600 text-gray-100'
        }`}>
          {isActive ? '🚨 ACTIVE' : '⏸️ READY'}
        </div>
      </div>

      {/* Current Location Info */}
      <div className={`p-4 rounded-lg mb-4 border-l-4 ${getEmergencyBg()}`}>
        <div className={`font-semibold mb-2 ${getEmergencyColor()}`}>
          Current Emergency: {emergencyType ? emergencyType.toUpperCase() : 'None'}
        </div>
        <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          <div className="flex items-center space-x-4">
            <span>📍 Cabin: {selectedCabin}</span>
            <span>🎯 Target: Muster Station {targetMuster}</span>
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {steps.length === 0 ? (
          <div className={`text-center py-8 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Select an emergency scenario to see evacuation steps</p>
          </div>
        ) : (
          steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
                completedSteps.includes(index)
                  ? isDarkMode ? 'bg-green-900/30 border border-green-600/50' : 'bg-green-50 border border-green-200'
                  : currentStep === index && isActive
                  ? isDarkMode ? 'bg-yellow-900/30 border border-yellow-600/50 animate-pulse' : 'bg-yellow-50 border border-yellow-200 animate-pulse'
                  : isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {completedSteps.includes(index) ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : currentStep === index && isActive ? (
                  <Clock className="h-6 w-6 text-yellow-500 animate-spin" />
                ) : (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    isDarkMode ? 'border-slate-400 text-slate-400' : 'border-gray-400 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  completedSteps.includes(index)
                    ? 'text-green-700 line-through'
                    : currentStep === index && isActive
                    ? isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
                    : isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {step}
                </p>
                {currentStep === index && isActive && (
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    ⏱️ In progress...
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Progress Summary */}
      {steps.length > 0 && (
        <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              Progress
            </span>
            <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {completedSteps.length}/{steps.length}
            </span>
          </div>
          <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'}`}>
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Emergency Tips */}
      <div className={`mt-4 p-3 rounded-lg border-l-4 border-blue-500 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
        <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          💡 Remember
        </h4>
        <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
          <li>• Stay calm and follow crew instructions</li>
          <li>• Help others who need assistance</li>
          <li>• Never use elevators during emergencies</li>
          <li>• Keep your life jacket on at all times</li>
        </ul>
      </div>
    </div>
  );
};

export default StepGuide;