import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, Clock, Users, MapPin } from 'lucide-react';

const EvacuationGuide = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const evacuationSteps = [
    {
      id: 'immediate',
      title: '🚨 Immediate Actions (0-2 minutes)',
      priority: 'critical',
      steps: [
        'Stay calm and do not panic',
        'Listen carefully to announcements',
        'Put on warm clothing and closed-toe shoes',
        'Grab your life jacket from under the bed',
        'Take your cabin key and identification',
        'Do NOT use elevators - use stairs only'
      ]
    },
    {
      id: 'preparation',
      title: '🦺 Life Jacket Instructions (2-5 minutes)',
      priority: 'high',
      steps: [
        'Put life jacket over your head',
        'Pull the jacket down over your body',
        'Wrap the straps around your waist',
        'Tie the straps in front with a bow knot',
        'Ensure the whistle is accessible',
        'Help others who need assistance'
      ]
    },
    {
      id: 'evacuation',
      title: '🚶 Evacuation Route (5-10 minutes)',
      priority: 'high',
      steps: [
        'Exit your cabin and close the door',
        'Follow the emergency lighting system',
        'Stay on the starboard (right) or port (left) side as directed',
        'Hold handrails and move quickly but safely',
        'Do not stop to collect personal belongings',
        'Assist elderly, disabled, or injured passengers'
      ]
    },
    {
      id: 'muster',
      title: '📍 At Muster Station (10-15 minutes)',
      priority: 'medium',
      steps: [
        'Report to your assigned muster station',
        'Find your designated crew member',
        'Stay in your assigned group',
        'Remain quiet to hear instructions',
        'Wait for headcount completion',
        'Follow crew directions for next steps'
      ]
    },
    {
      id: 'lifeboat',
      title: '🚤 Lifeboat Deployment (If Required)',
      priority: 'medium',
      steps: [
        'Wait for "Abandon Ship" signal (7 short + 1 long blast)',
        'Board lifeboats as directed by crew',
        'Women, children, and elderly board first',
        'Sit where directed and hold on',
        'Keep life jacket on at all times',
        'Follow lifeboat commander instructions'
      ]
    }
  ];

  const emergencySignals = [
    {
      signal: 'General Emergency',
      sound: '7 short blasts + 1 long blast',
      meaning: 'All passengers report to muster stations',
      action: 'Get life jacket and go to muster station'
    },
    {
      signal: 'Fire Emergency',
      sound: 'Continuous ringing bell',
      meaning: 'Fire detected on ship',
      action: 'Evacuate area, close doors behind you'
    },
    {
      signal: 'Man Overboard',
      sound: '3 long blasts',
      meaning: 'Person has fallen overboard',
      action: 'Look for person in water, alert crew'
    },
    {
      signal: 'All Clear',
      sound: '2 long blasts',
      meaning: 'Emergency is over',
      action: 'Return to normal activities'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-900/20';
      case 'high': return 'border-orange-500 bg-orange-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-900/20';
      default: return 'border-blue-500 bg-blue-900/20';
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-600">
      <div className="flex items-center mb-6">
        <AlertTriangle className="h-8 w-8 text-red-400 mr-3" />
        <h2 className="text-3xl font-bold text-white">Emergency Evacuation Guide</h2>
      </div>

      {/* Quick Reference */}
      <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-bold text-red-200 mb-2">⚡ Quick Reference</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-red-100"><strong>Emergency Number:</strong> Dial 911</p>
            <p className="text-red-100"><strong>Your Muster Station:</strong> Check cabin door</p>
          </div>
          <div>
            <p className="text-red-100"><strong>Life Jackets:</strong> Under your bed</p>
            <p className="text-red-100"><strong>Assembly Time:</strong> Within 15 minutes</p>
          </div>
        </div>
      </div>

      {/* Evacuation Steps */}
      <div className="space-y-4 mb-8">
        {evacuationSteps.map((section) => (
          <div
            key={section.id}
            className={`border rounded-lg transition-all ${getPriorityColor(section.priority)}`}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5"
            >
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              {expandedSection === section.id ? (
                <ChevronDown className="h-5 w-5 text-white" />
              ) : (
                <ChevronRight className="h-5 w-5 text-white" />
              )}
            </button>
            
            {expandedSection === section.id && (
              <div className="px-4 pb-4">
                <div className="space-y-2">
                  {section.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <p className="text-slate-200 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Emergency Signals */}
      <div className="bg-slate-700/50 rounded-lg p-4">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <span className="text-2xl mr-2">🔔</span>
          Emergency Signals
        </h3>
        <div className="grid gap-3">
          {emergencySignals.map((signal, index) => (
            <div key={index} className="bg-slate-600/50 rounded p-3">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-yellow-300">{signal.signal}</h4>
                <span className="text-xs text-slate-400">{signal.sound}</span>
              </div>
              <p className="text-slate-300 text-sm mb-1">{signal.meaning}</p>
              <p className="text-blue-200 text-sm font-medium">→ {signal.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-6 bg-blue-900/30 border border-blue-600/50 rounded-lg p-4">
        <h3 className="text-lg font-bold text-blue-200 mb-3">📋 Important Reminders</h3>
        <ul className="space-y-2 text-sm text-blue-100">
          <li>• Participate in the mandatory safety drill within 24 hours of boarding</li>
          <li>• Familiarize yourself with your cabin's nearest exit routes</li>
          <li>• Keep your cabin key with you during emergencies</li>
          <li>• Never ignore emergency alarms - they are never false alarms</li>
          <li>• Follow crew instructions at all times - they are trained professionals</li>
          <li>• Stay with your group and do not wander off during emergencies</li>
        </ul>
      </div>
    </div>
  );
};

export default EvacuationGuide;