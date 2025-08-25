import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const AlertBanner = ({ type = 'warning', message, onDismiss }) => {
  const getAlertStyles = (alertType) => {
    switch (alertType) {
      case 'fire':
        return 'bg-red-600 border-red-500 text-red-100';
      case 'storm':
        return 'bg-blue-600 border-blue-500 text-blue-100';
      case 'collision':
        return 'bg-orange-600 border-orange-500 text-orange-100';
      default:
        return 'bg-yellow-600 border-yellow-500 text-yellow-100';
    }
  };

  const getDefaultMessage = (alertType) => {
    switch (alertType) {
      case 'fire':
        return 'FIRE EMERGENCY - Follow evacuation procedures immediately';
      case 'storm':
        return 'STORM WARNING - Heavy seas expected, secure all loose items';
      case 'collision':
        return 'COLLISION ALERT - Remain calm and await further instructions';
      default:
        return 'SAFETY ALERT - Please pay attention to crew instructions';
    }
  };

  if (!message && type === 'warning') return null;

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 border-b-2 ${getAlertStyles(type)} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
            <span className="font-bold text-sm md:text-base">
              {message || getDefaultMessage(type)}
            </span>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 rounded hover:bg-white/20 transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;