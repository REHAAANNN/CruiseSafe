import React, { useState, useEffect } from 'react';
import { AlertTriangle, Flame, CloudRain, RotateCcw } from 'lucide-react';
import ShipMap from '../components/ShipMap';
import StepGuide from '../components/StepGuide';
import AlertBanner from '../components/AlertBanner';
import EmergencySound from '../components/EmergencySound';

const EmergencyDemo = ({ isDarkMode }) => {
  const [emergencyType, setEmergencyType] = useState(null);
  const [selectedCabin, setSelectedCabin] = useState('1001');
  const [targetMuster, setTargetMuster] = useState('A');
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [evacuationSteps, setEvacuationSteps] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleEmergencySimulation = (type) => {
    setEmergencyType(type);
    setIsSimulationActive(true);
    generateEvacuationSteps(type, selectedCabin, targetMuster);
  };

  const generateEvacuationSteps = (emergency, cabin, muster) => {
    const baseSteps = [
      'Stay calm and do not panic',
      `Exit cabin ${cabin} immediately`,
      'Take your life jacket from under the bed',
      'Put on warm clothing if possible',
      'Follow the emergency lighting system'
    ];

    const emergencySpecificSteps = {
      storm: [
        'Hold onto handrails at all times',
        'Avoid open decks due to rough seas',
        `Proceed to muster station ${muster}`,
        'Wait for further instructions from crew'
      ],
      fire: [
        'Stay low to avoid smoke inhalation',
        'Do NOT use elevators',
        'Feel doors before opening (check for heat)',
        `Proceed quickly to muster station ${muster}`,
        'Report to crew for headcount'
      ],
      collision: [
        'Check for injuries - help others if able',
        'Gather at your assigned muster station',
        `Proceed to muster station ${muster}`,
        'Await instructions for lifeboat deployment'
      ]
    };

    const specificSteps = emergency ? emergencySpecificSteps[emergency] : [];
    setEvacuationSteps([...baseSteps, ...specificSteps]);
  };

  const clearSimulation = () => {
    setEmergencyType(null);
    setIsSimulationActive(false);
    setEvacuationSteps([]);
  };

  const handleCabinSelect = (cabin) => {
    setSelectedCabin(cabin);
    if (isSimulationActive && emergencyType) {
      generateEvacuationSteps(emergencyType, cabin, targetMuster);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  useEffect(() => {
    // Determine optimal muster station based on cabin deck and emergency type
    const optimalMuster = (cabin, emergency) => {
      const cabinNumber = parseInt(cabin);
      const deck = Math.floor(cabinNumber / 100);
      
      if (emergency === 'fire') {
        // For fire, choose based on deck level
        return deck >= 10 ? 'A' : deck >= 8 ? 'B' : deck >= 7 ? 'C' : 'D';
      }
      // For other emergencies, use deck-based assignment
      return deck >= 11 ? 'A' : deck >= 9 ? 'B' : deck >= 7 ? 'C' : 'D';
    };

    if (emergencyType) {
      const newMuster = optimalMuster(selectedCabin, emergencyType);
      setTargetMuster(newMuster);
      generateEvacuationSteps(emergencyType, selectedCabin, newMuster);
    }
  }, [selectedCabin, emergencyType]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      <div className="ocean-bg"></div>
      
      {isSimulationActive && (
        <AlertBanner 
          type={emergencyType || 'storm'} 
          message={`${emergencyType?.toUpperCase()} EMERGENCY SIMULATION ACTIVE`}
        />
      )}

      <EmergencySound 
        isActive={isSimulationActive && soundEnabled}
        emergencyType={emergencyType}
        onToggleSound={toggleSound}
      />

      <div className="relative py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🚢 Emergency Evacuation Simulator
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Experience realistic emergency scenarios and learn proper evacuation procedures. 
              Select your cabin and simulate different emergency situations to understand the safest evacuation routes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ShipMap 
                selectedCabin={selectedCabin}
                targetMuster={targetMuster}
                emergencyType={emergencyType}
                onCabinSelect={handleCabinSelect}
                showRoute={isSimulationActive}
              />
            </div>

            <div className="space-y-6">
              <StepGuide 
                steps={evacuationSteps}
                emergencyType={emergencyType}
                isActive={isSimulationActive}
                selectedCabin={selectedCabin}
                targetMuster={targetMuster}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Emergency Simulation Controls</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleEmergencySimulation('storm')}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                  disabled={isSimulationActive && emergencyType === 'storm'}
                >
                  <CloudRain className="h-5 w-5" />
                  <span>🌊 Simulate Storm</span>
                </button>
                
                <button
                  onClick={() => handleEmergencySimulation('fire')}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                  disabled={isSimulationActive && emergencyType === 'fire'}
                >
                  <Flame className="h-5 w-5" />
                  <span>🔥 Simulate Fire</span>
                </button>
                
                <button
                  onClick={() => handleEmergencySimulation('collision')}
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                  disabled={isSimulationActive && emergencyType === 'collision'}
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span>⚡ Simulate Collision</span>
                </button>
                
                <button
                  onClick={clearSimulation}
                  className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                  disabled={!isSimulationActive}
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>🔄 Clear</span>
                </button>
                
                {isSimulationActive && (
                  <button
                    onClick={toggleSound}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg ${
                      soundEnabled 
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                  >
                    <span>{soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDemo;