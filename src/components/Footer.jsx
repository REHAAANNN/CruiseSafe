import React from 'react';
import { Ship, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Ship className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">CruiseSafe</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your trusted maritime safety companion. Providing real-time weather updates, 
              emergency alerts, and step-by-step evacuation guidance for safer sea travel.
            </p>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Emergency Contacts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-slate-300">
                <Phone className="h-4 w-4 mr-2 text-red-400" />
                <span>Ship Emergency: 911</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="h-4 w-4 mr-2 text-blue-400" />
                <span>Bridge: Ext. 100</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Mail className="h-4 w-4 mr-2 text-green-400" />
                <span>Medical Center: Ext. 911</span>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                <span>Guest Services: Deck 5</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Safety Information</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div>🦺 Life jackets under beds</div>
              <div>📍 Muster stations on Deck 4</div>
              <div>🚪 Emergency exits marked in red</div>
              <div>📱 Download offline safety maps</div>
              <div>👨‍✈️ Crew members in orange vests</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400 text-sm">
          <p>© 2024 CruiseSafe Maritime Safety System. Designed for passenger safety and emergency preparedness.</p>
          <p className="mt-1">This app works offline. Keep your device charged and accessible at all times.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;