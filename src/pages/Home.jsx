import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, AlertTriangle, Shield, ArrowRight, MapPin, BookOpen } from 'lucide-react';
import AlertBanner from '../components/AlertBanner';
import WeatherCard from '../components/WeatherCard';
import SafetyTip from '../components/SafetyTip';
import DestinationTracker from '../components/DestinationTracker';
import EvacuationGuide from '../components/EvacuationGuide';
import ShipLocationTracker from '../components/ShipLocationTracker';
import EvacuationAnimation from '../components/EvacuationAnimation';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const Home = ({ isDarkMode }) => {
  const [activeModal, setActiveModal] = React.useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen">
      <div className="ocean-bg"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
            🚢 CruiseSafe
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Your comprehensive maritime safety companion for cruise adventures
          </p>
          <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto">
            Stay informed with real-time weather updates, emergency alerts, and safety guidance 
            to ensure your journey remains safe and enjoyable.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {/* Weather Updates Card */}
            <button 
              onClick={() => openModal('weather')}
              className="bg-blue-900/60 backdrop-blur-lg rounded-xl p-6 border border-blue-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 text-left w-full"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4 mx-auto">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">⛅ Weather Updates</h3>
              <p className="text-blue-100 text-sm">
                Get real-time maritime weather alerts to stay prepared for storms and high tides.
              </p>
            </button>

            {/* Emergency Alerts Card */}
            <button 
              onClick={() => openModal('emergency')}
              className="bg-red-900/60 backdrop-blur-lg rounded-xl p-6 border border-red-700/50 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 text-left w-full"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-lg mb-4 mx-auto">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">🚨 Emergency Alerts</h3>
              <p className="text-red-100 text-sm">
                Receive instant notifications in case of fire, collision, or extreme weather.
              </p>
            </button>

            {/* Safety Guide Card */}
            <button 
              onClick={() => openModal('safety')}
              className="bg-green-900/60 backdrop-blur-lg rounded-xl p-6 border border-green-700/50 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 text-left w-full"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-4 mx-auto">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">📋 Safety Guide</h3>
              <p className="text-green-100 text-sm">
                Step-by-step evacuation instructions to guide you to the nearest safe zone.
              </p>
            </button>
          </div>

          <Link
            to="/emergency-demo"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🚨 Emergency Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Alert Banner */}
      <AlertBanner />

      {/* Additional Information Sections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <ShipLocationTracker isDarkMode={isDarkMode} />
            <EvacuationAnimation 
              selectedCabin="1001" 
              targetMuster="A" 
              emergencyType="storm" 
              isDarkMode={isDarkMode} 
            />
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <WeatherCard />
            <DestinationTracker />
            <SafetyTip />
          </div>
        </div>
      </section>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-600 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {activeModal === 'weather' && '⛅ Weather Information'}
                {activeModal === 'emergency' && '🚨 Emergency Procedures'}
                {activeModal === 'safety' && '📋 Safety Guide'}
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {activeModal === 'weather' && (
                <div className="space-y-6">
                  <WeatherCard />
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-white mb-3">📡 Weather Monitoring</h3>
                    <p className="text-slate-300 mb-4">
                      Our advanced weather monitoring system provides real-time updates on:
                    </p>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Sea conditions and wave heights</li>
                      <li>• Wind speed and direction</li>
                      <li>• Visibility and precipitation</li>
                      <li>• Storm tracking and warnings</li>
                      <li>• Temperature and humidity levels</li>
                    </ul>
                  </div>
                </div>
              )}
              {activeModal === 'emergency' && (
                <div className="space-y-6">
                  <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-red-200 mb-3">🚨 Emergency Response System</h3>
                    <p className="text-red-100 mb-4">
                      In case of emergency, our system will:
                    </p>
                    <ul className="space-y-2 text-red-100">
                      <li>• Send immediate alerts to all passengers</li>
                      <li>• Provide audio and visual emergency signals</li>
                      <li>• Display evacuation routes on your device</li>
                      <li>• Connect you with emergency services</li>
                      <li>• Track your location for rescue operations</li>
                    </ul>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-white mb-3">📞 Emergency Contacts</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white font-semibold">Ship Emergency: 911</p>
                        <p className="text-white font-semibold">Bridge: Ext. 100</p>
                        <p className="text-white font-semibold">Medical: Ext. 911</p>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Security: Ext. 200</p>
                        <p className="text-white font-semibold">Guest Services: Ext. 300</p>
                        <p className="text-white font-semibold">Coast Guard: Channel 16</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeModal === 'safety' && <EvacuationGuide />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;