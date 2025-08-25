# 🚢 SafeVoyage - Maritime Safety Application

A comprehensive maritime safety companion designed for cruise ship passengers, providing real-time emergency guidance, ship navigation, and safety information.

## 🔗 Links
- Live URL: https://cruise-safe.vercel.app/
- Youtube Demo Video: https://youtu.be/uVpw5FQN5Ds
- Github: https://github.com/REHAAANNN/CruiseSafe.git

## 🌟 Features

### 🚨 Emergency Management
- **Real-time Emergency Alerts** - Instant notifications for fire, storm, and collision scenarios
- **Interactive Emergency Simulation** - Practice evacuation procedures with realistic scenarios
- **Emergency Sound System** - Authentic maritime emergency signals with different patterns
- **Step-by-step Evacuation Guide** - Detailed instructions with timing and visual feedback

### 🗺️ Ship Navigation & Layout
- **Realistic Ship Layout** - 7-deck cruise ship with 50+ cabins and muster stations
- **Interactive Ship Map** - Click cabins to see evacuation routes and muster station assignments
- **Live Ship Tracking** - Real-time location tracking with React Leaflet integration
- **Destination Progress** - Live voyage tracking from Miami to San Juan with ETA updates

### 📊 Analytics & Monitoring
- **Safety Dashboard** - Comprehensive analytics with real-time metrics
- **Performance Charts** - Monthly safety performance visualization
- **System Status** - Live monitoring of ship systems and equipment
- **Weather Integration** - Real-time weather updates and sea conditions

### 🤖 AI Assistant
- **Offline Maritime Chatbot** - Rule-based chatbot for emergency assistance
- **24/7 Safety Support** - Instant answers to safety questions without internet
- **Emergency Prioritization** - Quick responses for urgent safety queries
- **Maritime Knowledge Base** - Comprehensive database of ship procedures

### 🎨 User Experience
- **Dark/Light Mode Toggle** - Comfortable viewing in any lighting condition
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Smooth Animations** - Engaging evacuation path animations and transitions
- **Accessibility Features** - Screen reader support and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/safevoyage.git
cd safevoyage

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom maritime theme
- **Routing**: React Router DOM
- **Maps**: React Leaflet for ship tracking
- **Icons**: Lucide React
- **Audio**: Web Audio API for emergency sounds
- **State Management**: React Context API

## 📱 Application Structure

```
src/
├── components/           # Reusable UI components
│   ├── AlertBanner.jsx      # Emergency alert banners
│   ├── AnalyticsDashboard.jsx # Safety analytics
│   ├── DarkModeToggle.jsx   # Theme switcher
│   ├── DestinationTracker.jsx # Voyage progress
│   ├── EmergencySound.jsx   # Audio alert system
│   ├── EvacuationAnimation.jsx # Path animations
│   ├── EvacuationGuide.jsx  # Safety procedures
│   ├── Footer.jsx           # App footer
│   ├── MaritimeChatbot.jsx  # AI assistant
│   ├── Navigation.jsx       # Main navigation
│   ├── SafetyTip.jsx       # Safety information
│   ├── ShipLocationTracker.jsx # Live tracking
│   ├── ShipMap.jsx         # Interactive ship layout
│   ├── StepGuide.jsx       # Evacuation steps
│   └── WeatherCard.jsx     # Weather updates
├── contexts/            # React contexts
│   └── SafetyContext.jsx   # Global safety state
├── pages/              # Main application pages
│   ├── Dashboard.jsx       # Analytics dashboard
│   ├── EmergencyDemo.jsx   # Emergency simulation
│   └── Home.jsx           # Landing page
├── App.jsx             # Main application component
├── App.css             # Global styles
└── main.jsx           # Application entry point
```

## 🚨 Emergency Features

### Emergency Types Supported
- **🔥 Fire Emergency**: Continuous alarm with evacuation routes avoiding fire zones
- **🌊 Storm Emergency**: Weather-based alerts with indoor shelter guidance  
- **⚡ Collision Emergency**: Impact alerts with damage assessment and evacuation

### Muster Stations
- **Station A**: Decks 11-12 (Upper decks)
- **Station B**: Decks 9-10 (Mid-upper decks)  
- **Station C**: Decks 7-8 (Mid-lower decks)
- **Station D**: Deck 6 (Lower deck)

## 🤖 Chatbot Capabilities

The maritime safety chatbot can help with:

- **Emergency Procedures** - Step-by-step guidance for all emergency types
- **Ship Layout** - Cabin locations, deck information, and facility locations
- **Safety Equipment** - Life jacket instructions and emergency equipment locations
- **Contact Information** - All emergency and service contact numbers
- **Weather Updates** - Current conditions and forecasts
- **Medical Assistance** - Health services and emergency medical procedures
- **Evacuation Routes** - Personalized evacuation guidance based on location

### Sample Chatbot Queries
```
"What to do in fire emergency?"
"Where is my muster station?"
"How to put on life jacket?"
"Emergency contacts"
"Ship layout"
"Weather conditions"
"Medical assistance"
```

## 📊 Dashboard Metrics

The analytics dashboard tracks:

- **Passenger Count** - Total passengers and crew aboard
- **Safety Score** - Overall safety rating (target: 98%+)
- **Response Time** - Average emergency response time
- **Emergency Drills** - Monthly drill completion rates
- **Incident Reports** - Safety incident tracking
- **System Status** - Real-time equipment monitoring

### Development Guidelines
- Follow React best practices
- Use Tailwind CSS for styling
- Ensure mobile responsiveness
- Add proper error handling
- Include accessibility features
- Test emergency scenarios thoroughly

**⚓ Stay Safe, Stay Informed, Stay Connected**

Built with ❤️ for maritime safety by the SafeVoyage team.

*This application is designed to complement, not replace, official ship safety procedures and crew instructions.*