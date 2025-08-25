import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Users, Clock } from 'lucide-react';

const EvacuationAnimation = ({ selectedCabin, targetMuster, emergencyType, isDarkMode }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [evacuationProgress, setEvacuationProgress] = useState(0);
  const [peopleEvacuated, setPeopleEvacuated] = useState(0);

  const evacuationSteps = [
    { id: 1, name: 'Alarm Sounded', duration: 2, people: 0 },
    { id: 2, name: 'Cabin Evacuation', duration: 3, people: 150 },
    { id: 3, name: 'Corridor Movement', duration: 4, people: 300 },
    { id: 4, name: 'Stairwell Navigation', duration: 5, people: 450 },
    { id: 5, name: 'Muster Station Assembly', duration: 6, people: 600 },
    { id: 6, name: 'Headcount Complete', duration: 2, people: 650 }
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setEvacuationProgress(0);
    setPeopleEvacuated(0);
  };

  const pauseAnimation = () => {
    setIsAnimating(false);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setEvacuationProgress(0);
    setPeopleEvacuated(0);
  };

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setEvacuationProgress(prev => {
        const newProgress = prev + 1;
        const totalDuration = evacuationSteps.reduce((sum, step) => sum + step.duration, 0);
        
        if (newProgress >= totalDuration * 10) {
          setIsAnimating(false);
          return totalDuration * 10;
        }

        // Update current step
        let cumulativeDuration = 0;
        for (let i = 0; i < evacuationSteps.length; i++) {
          cumulativeDuration += evacuationSteps[i].duration * 10;
          if (newProgress <= cumulativeDuration) {
            setCurrentStep(i);
            setPeopleEvacuated(evacuationSteps[i].people);
            break;
          }
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const getProgressPercentage = () => {
    const totalDuration = evacuationSteps.reduce((sum, step) => sum + step.duration, 0) * 10;
    return (evacuationProgress / totalDuration) * 100;
  };

  const getEmergencyColor = () => {
    switch (emergencyType) {
      case 'fire': return 'text-red-400';
      case 'storm': return 'text-blue-400';
      case 'collision': return 'text-orange-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800/80 border-slate-600' : 'bg-white/90 border-gray-200'} backdrop-blur-lg`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-semibold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <Users className="h-6 w-6 mr-2 text-purple-500" />
          🧭 Evacuation Path Animation
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          isAnimating ? 'bg-red-600 text-red-100 animate-pulse' : 'bg-gray-600 text-gray-100'
        }`}>
          {isAnimating ? '🚨 EVACUATING' : '⏸️ READY'}
        </div>
      </div>

      {/* Animation Controls */}
      <div className="flex space-x-3 mb-6">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white rounded-lg font-semibold transition-colors"
        >
          <Play className="h-4 w-4" />
          <span>Start</span>
        </button>
        
        <button
          onClick={pauseAnimation}
          disabled={!isAnimating}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-500 text-white rounded-lg font-semibold transition-colors"
        >
          <Pause className="h-4 w-4" />
          <span>Pause</span>
        </button>
        
        <button
          onClick={resetAnimation}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className={`flex justify-between text-sm mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          <span>Evacuation Progress</span>
          <span>{getProgressPercentage().toFixed(1)}%</span>
        </div>
        <div className={`w-full rounded-full h-4 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
          <div
            className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full transition-all duration-300 relative"
            style={{ width: `${getProgressPercentage()}%` }}
          >
            <div className="absolute right-0 top-0 w-4 h-4 bg-white rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Current Step Display */}
      <div className={`p-4 rounded-lg mb-4 border-l-4 ${
        emergencyType === 'fire' ? 'border-red-500 bg-red-900/20' :
        emergencyType === 'storm' ? 'border-blue-500 bg-blue-900/20' :
        emergencyType === 'collision' ? 'border-orange-500 bg-orange-900/20' :
        'border-green-500 bg-green-900/20'
      }`}>
        <div className={`text-lg font-bold mb-2 ${getEmergencyColor()}`}>
          Step {currentStep + 1}: {evacuationSteps[currentStep]?.name || 'Ready to Start'}
        </div>
        <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          From Cabin {selectedCabin} → Muster Station {targetMuster}
        </div>
      </div>

      {/* Evacuation Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {peopleEvacuated}
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            People Evacuated
          </div>
        </div>
        
        <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {Math.floor(evacuationProgress / 10)}s
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Time Elapsed
          </div>
        </div>
        
        <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {evacuationSteps.length - currentStep - 1}
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Steps Remaining
          </div>
        </div>
      </div>

      {/* Visual Animation Area */}
      <div className={`mt-4 h-32 rounded-lg border-2 border-dashed relative overflow-hidden ${
        isDarkMode ? 'border-slate-600 bg-slate-900/50' : 'border-gray-300 bg-gray-50'
      }`}>
        <div className="absolute inset-0 flex items-center justify-center">
          {isAnimating ? (
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="text-2xl animate-pulse">🏃‍♂️🏃‍♀️🏃‍♂️</div>
              <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <div className={`text-center ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">Click Start to begin evacuation simulation</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvacuationAnimation;