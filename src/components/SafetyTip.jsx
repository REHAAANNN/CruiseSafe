import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';

const SafetyTip = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const safetyTips = [
    {
      title: "Life Jacket Location",
      content: "Your life jacket is stored under your bed or in the closet. Familiarize yourself with its location immediately after boarding.",
      icon: "🦺"
    },
    {
      title: "Muster Station",
      content: "Know your assigned muster station location. This information is on the back of your cabin door and on your keycard.",
      icon: "📍"
    },
    {
      title: "Emergency Signals",
      content: "Seven short blasts followed by one long blast is the abandon ship signal. General emergency is a continuous ring of the alarm bell.",
      icon: "🔔"
    },
    {
      title: "Cabin Safety",
      content: "Always keep your cabin key with you during emergencies. Do not use elevators during emergencies - use stairs only.",
      icon: "🔑"
    },
    {
      title: "Storm Preparation",
      content: "During rough weather, secure all loose items in your cabin and avoid being on open decks. Hold handrails when moving around the ship.",
      icon: "⛈️"
    },
    {
      title: "Fire Safety",
      content: "If you smell smoke, report it immediately. Never ignore fire alarms. Stay low if there's smoke and feel doors before opening them.",
      icon: "🔥"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % safetyTips.length);
    }, 10000); // Change tip every 10 seconds

    return () => clearInterval(timer);
  }, []);

  const nextTip = () => {
    setCurrentTip(prev => (prev + 1) % safetyTips.length);
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Lightbulb className="h-6 w-6 mr-2 text-yellow-400" />
          Safety Tip
        </h3>
        <button
          onClick={nextTip}
          className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
          aria-label="Next safety tip"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-[120px]">
        <div className="flex items-center mb-3">
          <div className="text-2xl mr-3">{safetyTips[currentTip].icon}</div>
          <h4 className="text-lg font-semibold text-blue-300">
            {safetyTips[currentTip].title}
          </h4>
        </div>
        
        <p className="text-slate-300 leading-relaxed">
          {safetyTips[currentTip].content}
        </p>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {safetyTips.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentTip ? 'bg-blue-400' : 'bg-slate-600'
            }`}
            onClick={() => setCurrentTip(index)}
            aria-label={`Go to tip ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SafetyTip;