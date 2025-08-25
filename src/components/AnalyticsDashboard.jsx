import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, AlertTriangle, Clock, Shield } from 'lucide-react';

const AnalyticsDashboard = ({ isDarkMode }) => {
  const [analytics, setAnalytics] = useState({
    totalPassengers: 2847,
    crewMembers: 1156,
    emergencyDrills: 12,
    responseTime: 4.2,
    safetyScore: 98.5,
    incidentReports: 3
  });

  const [chartData, setChartData] = useState([
    { month: 'Jan', drills: 8, incidents: 2 },
    { month: 'Feb', drills: 12, incidents: 1 },
    { month: 'Mar', drills: 15, incidents: 0 },
    { month: 'Apr', drills: 18, incidents: 1 },
    { month: 'May', drills: 22, incidents: 0 },
    { month: 'Jun', drills: 25, incidents: 0 }
  ]);

  const [realtimeData, setRealtimeData] = useState({
    currentDrills: 0,
    activeAlerts: 0,
    systemStatus: 'All Systems Operational'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        responseTime: (Math.random() * 2 + 3).toFixed(1),
        safetyScore: (Math.random() * 2 + 97).toFixed(1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, title, value, unit, trend, color }) => (
    <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-slate-800/60 border-slate-600' : 'bg-white/90 border-gray-200'} backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`h-6 w-6 ${color}`} />
        {trend && (
          <div className={`flex items-center text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp className="h-3 w-3 mr-1" />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {value}{unit}
      </div>
      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
        {title}
      </div>
    </div>
  );

  return (
    <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800/80 border-slate-600' : 'bg-white/90 border-gray-200'} backdrop-blur-lg`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <BarChart3 className="h-6 w-6 mr-2 text-purple-500" />
          📈 Analytics Dashboard
        </h3>
        <div className="px-3 py-1 bg-green-600 text-green-100 rounded-full text-xs font-bold">
          🔴 LIVE DATA
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon={Users}
          title="Total Passengers"
          value={analytics.totalPassengers.toLocaleString()}
          unit=""
          color="text-blue-500"
          trend={2.3}
        />
        <StatCard
          icon={Shield}
          title="Safety Score"
          value={analytics.safetyScore}
          unit="%"
          color="text-green-500"
          trend={0.8}
        />
        <StatCard
          icon={Clock}
          title="Avg Response Time"
          value={analytics.responseTime}
          unit="min"
          color="text-orange-500"
          trend={-12.5}
        />
        <StatCard
          icon={AlertTriangle}
          title="Emergency Drills"
          value={analytics.emergencyDrills}
          unit=""
          color="text-red-500"
          trend={15.2}
        />
        <StatCard
          icon={Users}
          title="Crew Members"
          value={analytics.crewMembers.toLocaleString()}
          unit=""
          color="text-purple-500"
        />
        <StatCard
          icon={BarChart3}
          title="Incident Reports"
          value={analytics.incidentReports}
          unit=""
          color="text-yellow-500"
          trend={-25.0}
        />
      </div>

      {/* Chart Visualization */}
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100'} mb-4`}>
        <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Monthly Safety Performance
        </h4>
        <div className="flex items-end space-x-2 h-32">
          {chartData.map((data, index) => (
            <div key={data.month} className="flex-1 flex flex-col items-center">
              <div className="flex space-x-1 mb-2">
                <div
                  className="w-4 bg-blue-500 rounded-t"
                  style={{ height: `${(data.drills / 25) * 80}px` }}
                  title={`${data.drills} drills`}
                ></div>
                <div
                  className="w-4 bg-red-500 rounded-t"
                  style={{ height: `${(data.incidents / 5) * 80 + 10}px` }}
                  title={`${data.incidents} incidents`}
                ></div>
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                {data.month}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
            <span className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Emergency Drills</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
            <span className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Incidents</span>
          </div>
        </div>
      </div>

      {/* Real-time Status */}
      <div className={`p-4 rounded-lg border-l-4 border-green-500 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
        <div className={`font-semibold mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
          System Status
        </div>
        <div className={`text-sm ${isDarkMode ? 'text-green-200' : 'text-green-600'}`}>
          ✅ {realtimeData.systemStatus}
        </div>
        <div className={`text-xs mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;