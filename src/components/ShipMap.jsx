import React from 'react';

const ShipMap = ({ selectedCabin, targetMuster, onCabinSelect, emergencyType, showRoute }) => {
  // Realistic cruise ship layout based on modern vessels
  const decks = {
    'Deck 12': { cabins: ['1201', '1202', '1203', '1204'], type: 'suite', color: 'bg-purple-600' },
    'Deck 11': { cabins: ['1101', '1102', '1103', '1104', '1105', '1106'], type: 'balcony', color: 'bg-blue-600' },
    'Deck 10': { cabins: ['1001', '1002', '1003', '1004', '1005', '1006'], type: 'balcony', color: 'bg-blue-600' },
    'Deck 9': { cabins: ['901', '902', '903', '904', '905', '906', '907', '908'], type: 'ocean-view', color: 'bg-green-600' },
    'Deck 8': { cabins: ['801', '802', '803', '804', '805', '806', '807', '808'], type: 'ocean-view', color: 'bg-green-600' },
    'Deck 7': { cabins: ['701', '702', '703', '704', '705', '706', '707', '708', '709', '710'], type: 'interior', color: 'bg-gray-600' },
    'Deck 6': { cabins: ['601', '602', '603', '604', '605', '606', '607', '608', '609', '610'], type: 'interior', color: 'bg-gray-600' },
  };

  const musterStations = [
    { id: 'A', name: 'Muster Station A', position: { top: '15%', left: '10%' }, decks: ['Deck 12', 'Deck 11'] },
    { id: 'B', name: 'Muster Station B', position: { top: '15%', right: '10%' }, decks: ['Deck 10', 'Deck 9'] },
    { id: 'C', name: 'Muster Station C', position: { top: '85%', left: '10%' }, decks: ['Deck 8', 'Deck 7'] },
    { id: 'D', name: 'Muster Station D', position: { top: '85%', right: '10%' }, decks: ['Deck 6'] },
  ];

  const getRouteColor = (emergency) => {
    switch (emergency) {
      case 'fire': return '#ef4444';
      case 'storm': return '#3b82f6';
      case 'collision': return '#f97316';
      default: return '#10b981';
    }
  };

  const getCabinDeck = (cabin) => {
    for (const [deckName, deckInfo] of Object.entries(decks)) {
      if (deckInfo.cabins.includes(cabin)) {
        return deckName;
      }
    }
    return 'Deck 7'; // default
  };

  const getAssignedMusterStation = (cabin) => {
    const deck = getCabinDeck(cabin);
    const station = musterStations.find(ms => ms.decks.includes(deck));
    return station ? station.id : 'A';
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-600">
      <h2 className="text-2xl font-bold text-white mb-4">MS CruiseSafe - Ship Layout</h2>
      
      {/* Ship Outline */}
      <div className="relative bg-slate-700/50 rounded-lg p-8 min-h-[500px] border-2 border-slate-500">
        {/* Ship Hull */}
        <div className="absolute inset-4 border-2 border-blue-300 rounded-full opacity-30"></div>
        
        {/* Bridge */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-3 py-1 rounded text-xs font-bold">
          🚢 BRIDGE
        </div>

        {/* Route Line */}
        {showRoute && selectedCabin && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill={getRouteColor(emergencyType)}
                />
              </marker>
            </defs>
            <path
              d="M 50% 50% L 20% 20%"
              stroke={getRouteColor(emergencyType)}
              strokeWidth="4"
              strokeDasharray="8,4"
              markerEnd="url(#arrowhead)"
              opacity="0.9"
              className="animate-pulse"
            />
          </svg>
        )}

        {/* Muster Stations */}
        {musterStations.map((station) => (
          <div
            key={station.id}
            className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-white font-bold border-2 transition-all ${
              getAssignedMusterStation(selectedCabin) === station.id
                ? 'bg-green-500 border-green-300 shadow-lg shadow-green-500/50 animate-pulse'
                : 'bg-blue-500 border-blue-300'
            }`}
            style={station.position}
            title={station.name}
          >
            {station.id}
          </div>
        ))}

        {/* Deck Layout */}
        <div className="absolute inset-8 grid grid-rows-7 gap-2">
          {Object.entries(decks).map(([deckName, deckInfo], deckIndex) => (
            <div key={deckName} className="flex items-center space-x-2">
              <div className="text-white text-xs font-bold w-16">{deckName}</div>
              <div className="flex space-x-1 flex-1">
                {deckInfo.cabins.map((cabin) => (
                  <button
                    key={cabin}
                    className={`w-8 h-6 rounded text-xs font-bold text-white transition-all transform hover:scale-110 ${
                      selectedCabin === cabin
                        ? 'bg-yellow-500 border-2 border-yellow-300 shadow-lg shadow-yellow-500/50'
                        : `${deckInfo.color} hover:brightness-110`
                    }`}
                    onClick={() => onCabinSelect(cabin)}
                    title={`Cabin ${cabin} - ${deckInfo.type}`}
                  >
                    {cabin.slice(-2)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ship Features */}
        <div className="absolute bottom-4 left-4 text-blue-300 text-xs space-y-1">
          <div>🎭 Theater - Deck 6</div>
          <div>🍽️ Dining - Deck 7</div>
          <div>🏊 Pool - Deck 9</div>
        </div>

        <div className="absolute bottom-4 right-4 text-blue-300 text-xs space-y-1">
          <div>⬆️ Bow (Front)</div>
          <div>⬇️ Stern (Back)</div>
        </div>

        {/* Lifeboats */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
          <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold rotate-90">
            🚤 LIFEBOATS
          </div>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
          <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold -rotate-90">
            🚤 LIFEBOATS
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-blue-200">
            Selected: <span className="font-bold text-yellow-300">{selectedCabin || 'None'}</span>
          </p>
          <p className="text-blue-200">
            Deck: <span className="font-bold text-blue-300">{selectedCabin ? getCabinDeck(selectedCabin) : 'N/A'}</span>
          </p>
        </div>
        <div>
          <p className="text-blue-200">
            Muster Station: <span className="font-bold text-green-300">{selectedCabin ? getAssignedMusterStation(selectedCabin) : 'N/A'}</span>
          </p>
          <p className="text-blue-200">
            Distance: <span className="font-bold text-orange-300">{selectedCabin ? '~2 minutes' : 'N/A'}</span>
          </p>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-slate-300 text-xs">
          💡 Click any cabin number to select your location • Muster stations are assigned by deck
        </p>
      </div>
    </div>
  );
};

export default ShipMap;