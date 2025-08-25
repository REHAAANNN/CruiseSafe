import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, AlertTriangle, Clock, Shield, Activity, MapPin } from 'lucide-react';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalPassengers: 2847,
    crewMembers: 1156,
    emergencyDrills: 12,
    responseTime: 4.2,
    safetyScore: 98.5,
    incidentReports: 3,
    activeAlerts: 0,
    systemStatus: 'All Systems Operational'
  });

  const [chartData, setChartData] = useState([
    { month: 'Jan', drills: 8, incidents: 2, satisfaction: 94 },
    { month: 'Feb', drills: 12, incidents: 1, satisfaction: 96 },
    { month: 'Mar', drills: 15, incidents: 0, satisfaction: 98 },
    { month: 'Apr', drills: 18, incidents: 1, satisfaction: 95 },
    { month: 'May', drills: 22, incidents: 0, satisfaction: 99 },
    { month: 'Jun', drills: 25, incidents: 0, satisfaction: 98 }
  ]);

  const [realtimeMetrics, setRealtimeMetrics] = useState({
    currentLocation: 'Caribbean Sea',
    weatherCondition: 'Clear',
    seaState: 'Calm',
    windSpeed: '12 knots',
    visibility: '10+ nautical miles'
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

  const StatCard = ({ icon: Icon, title, value, unit, trend, color, description }) => (
    <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600 hover:border-slate-500 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{title}</h3>
            <p className="text-slate-400 text-sm">{description}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-2">
        {value}<span className="text-lg font-normal text-slate-300">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      <div className="ocean-bg"></div>
      
      <div className="relative py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <BarChart3 className="h-10 w-10 mr-3 text-blue-400" />
              📊 Maritime Safety Dashboard
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Real-time monitoring and analytics for comprehensive maritime safety management
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Total Passengers"
              value={analytics.totalPassengers.toLocaleString()}
              unit=""
              color="bg-blue-600"
              trend={2.3}
              description="Currently aboard"
            />
            <StatCard
              icon={Shield}
              title="Safety Score"
              value={analytics.safetyScore}
              unit="%"
              color="bg-green-600"
              trend={0.8}
              description="Overall safety rating"
            />
            <StatCard
              icon={Clock}
              title="Response Time"
              value={analytics.responseTime}
              unit="min"
              color="bg-orange-600"
              trend={-12.5}
              description="Average emergency response"
            />
            <StatCard
              icon={AlertTriangle}
              title="Active Alerts"
              value={analytics.activeAlerts}
              unit=""
              color="bg-red-600"
              description="Current emergency alerts"
            />
          </div>

          {/* Charts and Analytics */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Performance Chart */}
            <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Activity className="h-6 w-6 mr-2 text-purple-400" />
                Monthly Safety Performance
              </h3>
              <div className="flex items-end space-x-2 h-48 mb-4">
                {chartData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div className="flex space-x-1 mb-2">
                      <div
                        className="w-6 bg-blue-500 rounded-t transition-all hover:bg-blue-400"
                        style={{ height: `${(data.drills / 25) * 120}px` }}
                        title={`${data.drills} drills`}
                      ></div>
                      <div
                        className="w-6 bg-red-500 rounded-t transition-all hover:bg-red-400"
                        style={{ height: `${(data.incidents / 5) * 120 + 10}px` }}
                        title={`${data.incidents} incidents`}
                      ></div>
                      <div
                        className="w-6 bg-green-500 rounded-t transition-all hover:bg-green-400"
                        style={{ height: `${(data.satisfaction / 100) * 120}px` }}
                        title={`${data.satisfaction}% satisfaction`}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-400">{data.month}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-slate-300">Emergency Drills</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                  <span className="text-slate-300">Incidents</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-slate-300">Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Real-time Status */}
            <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-cyan-400" />
                Real-time Ship Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Current Location</span>
                  <span className="text-white font-semibold">{realtimeMetrics.currentLocation}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Weather Condition</span>
                  <span className="text-green-400 font-semibold">{realtimeMetrics.weatherCondition}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Sea State</span>
                  <span className="text-blue-400 font-semibold">{realtimeMetrics.seaState}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Wind Speed</span>
                  <span className="text-yellow-400 font-semibold">{realtimeMetrics.windSpeed}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Visibility</span>
                  <span className="text-purple-400 font-semibold">{realtimeMetrics.visibility}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600">
              <h4 className="text-lg font-semibold text-white mb-4">Emergency Preparedness</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Crew Training</span>
                  <span className="text-green-400 font-bold">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Equipment Status</span>
                  <span className="text-green-400 font-bold">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Last Drill</span>
                  <span className="text-blue-400 font-bold">2 days ago</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600">
              <h4 className="text-lg font-semibold text-white mb-4">Communication Systems</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">PA System</span>
                  <span className="text-green-400 font-bold">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Emergency Phones</span>
                  <span className="text-green-400 font-bold">All Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Radio Contact</span>
                  <span className="text-green-400 font-bold">Clear</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-6 border border-slate-600">
              <h4 className="text-lg font-semibold text-white mb-4">Safety Equipment</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Life Jackets</span>
                  <span className="text-green-400 font-bold">3,200 Ready</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Lifeboats</span>
                  <span className="text-green-400 font-bold">16 Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Fire Systems</span>
                  <span className="text-green-400 font-bold">All Clear</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-green-900/30 border border-green-600/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-green-200 mb-2">🟢 System Status</h3>
                <p className="text-green-100">{analytics.systemStatus}</p>
              </div>
              <div className="text-right">
                <div className="text-green-200 text-sm">Last Updated</div>
                <div className="text-green-100 font-semibold">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;