import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, LifeBuoy } from 'lucide-react';

const MaritimeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your maritime safety assistant. I can help you with emergency procedures, ship information, and safety questions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Rule-based response system
  const getResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Emergency keywords
    if (input.includes('emergency') || input.includes('help') || input.includes('urgent')) {
      if (input.includes('fire')) {
        return "🔥 FIRE EMERGENCY:\n1. Stay calm and alert others\n2. Call emergency number: 911\n3. Use stairs, never elevators\n4. Close doors behind you\n5. Go to your muster station\n6. Put on life jacket\n\nNeed more specific help?";
      }
      if (input.includes('storm') || input.includes('weather')) {
        return "🌊 STORM EMERGENCY:\n1. Stay indoors and secure loose items\n2. Hold handrails when moving\n3. Avoid open decks\n4. Listen for announcements\n5. Go to muster station if instructed\n\nFor current weather updates, check the Weather section.";
      }
      if (input.includes('collision') || input.includes('accident')) {
        return "⚡ COLLISION EMERGENCY:\n1. Brace for impact and stay calm\n2. Check for injuries\n3. Help others if able\n4. Listen for crew instructions\n5. Prepare for evacuation if needed\n\nDial 911 for immediate assistance.";
      }
      return "🚨 GENERAL EMERGENCY:\n1. Stay calm\n2. Listen to crew instructions\n3. Put on life jacket\n4. Go to your assigned muster station\n5. Help others if possible\n\nFor specific emergencies, tell me: fire, storm, or collision.";
    }

    // Muster station questions
    if (input.includes('muster') || input.includes('assembly')) {
      return "📍 MUSTER STATIONS:\n• Station A: Decks 11-12 (Upper decks)\n• Station B: Decks 9-10 (Mid-upper decks)\n• Station C: Decks 7-8 (Mid-lower decks)\n• Station D: Deck 6 (Lower deck)\n\nYour muster station is printed on your cabin door. Need help finding your cabin?";
    }

    // Life jacket questions
    if (input.includes('life jacket') || input.includes('lifejacket') || input.includes('vest')) {
      return "🦺 LIFE JACKET INSTRUCTIONS:\n1. Found under your bed\n2. Put over your head\n3. Pull down over body\n4. Wrap straps around waist\n5. Tie in front with bow knot\n6. Ensure whistle is accessible\n\nPractice putting it on before any emergency!";
    }

    // Ship layout questions
    if (input.includes('ship') || input.includes('layout') || input.includes('deck') || input.includes('cabin')) {
      return "🚢 SHIP LAYOUT:\n• Deck 12: Suites (1201-1204)\n• Deck 11: Balcony cabins (1101-1106)\n• Deck 10: Balcony cabins (1001-1006)\n• Deck 9: Ocean view (901-908)\n• Deck 8: Ocean view (801-808)\n• Deck 7: Interior cabins (701-710)\n• Deck 6: Interior cabins (601-610)\n\nWhat specific area are you looking for?";
    }

    // Contact information
    if (input.includes('contact') || input.includes('phone') || input.includes('call')) {
      return "📞 EMERGENCY CONTACTS:\n• Ship Emergency: 911\n• Bridge: Ext. 100\n• Medical: Ext. 911\n• Security: Ext. 200\n• Guest Services: Ext. 300\n• Coast Guard: Channel 16\n\nAll phones have these numbers programmed.";
    }

    // Weather questions
    if (input.includes('weather') || input.includes('forecast') || input.includes('conditions')) {
      return "🌤️ WEATHER INFO:\nCheck the Weather Updates section on the home page for:\n• Current conditions\n• Sea state\n• Wind speed\n• Visibility\n• Storm warnings\n\nWeather updates every 15 minutes.";
    }

    // Safety drill questions
    if (input.includes('drill') || input.includes('practice') || input.includes('training')) {
      return "🎯 SAFETY DRILLS:\n• Mandatory within 24 hours of boarding\n• Practice evacuation routes\n• Learn muster station location\n• Life jacket demonstration\n• Emergency signal explanations\n\nNext drill scheduled for tomorrow at 10 AM.";
    }

    // Medical questions
    if (input.includes('medical') || input.includes('doctor') || input.includes('sick') || input.includes('injured')) {
      return "🏥 MEDICAL ASSISTANCE:\n• Medical Center: Deck 7, Midship\n• Emergency Medical: Ext. 911\n• Doctor on call 24/7\n• Nurse station: Ext. 450\n• Pharmacy: Deck 7\n\nFor serious emergencies, call 911 immediately.";
    }

    // Location questions
    if (input.includes('location') || input.includes('where') || input.includes('position')) {
      return "📍 SHIP LOCATION:\nCurrently sailing in the Caribbean Sea\n• Speed: 22 knots\n• Heading: Southeast\n• Next port: San Juan, Puerto Rico\n• ETA: Tomorrow 8:00 AM\n\nCheck Ship Tracker for live updates.";
    }

    // Evacuation questions
    if (input.includes('evacuation') || input.includes('evacuate') || input.includes('abandon')) {
      return "🚶 EVACUATION PROCEDURES:\n1. Put on life jacket immediately\n2. Take warm clothing\n3. Use stairs only\n4. Follow emergency lighting\n5. Go to muster station\n6. Wait for crew instructions\n\nTry the Emergency Demo for practice!";
    }

    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm here to help with maritime safety questions. I can assist with:\n• Emergency procedures\n• Ship layout and locations\n• Safety equipment\n• Contact information\n• Weather updates\n\nWhat would you like to know?";
    }

    // Thank you responses
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! Stay safe and don't hesitate to ask if you need more help. Remember, in a real emergency, always follow crew instructions and call 911. Have a safe voyage! ⚓";
    }

    // Default response with suggestions
    return "I'm not sure about that specific question, but I can help you with:\n\n🚨 Emergency procedures (fire, storm, collision)\n📍 Muster stations and ship layout\n🦺 Life jacket instructions\n📞 Emergency contacts\n🌊 Weather information\n🏥 Medical assistance\n\nTry asking about any of these topics!";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-blue-600 hover:bg-blue-700 animate-pulse'
        }`}
        title="Maritime Safety Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-96 bg-slate-800 rounded-xl shadow-2xl border border-slate-600 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl flex items-center space-x-3">
            <div className="p-2 bg-blue-700 rounded-full">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Maritime Safety Assistant</h3>
              <p className="text-xs text-blue-100">Always here to help • Offline</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' ? 'bg-blue-600' : 'bg-slate-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="p-2 rounded-full bg-slate-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-slate-700 text-slate-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-600">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about safety procedures..."
                className="flex-1 bg-slate-700 text-white p-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              💡 Try asking: "What to do in fire emergency?" or "Where is my muster station?"
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MaritimeChatbot;