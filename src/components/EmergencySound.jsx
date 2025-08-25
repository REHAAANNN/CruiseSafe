import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const EmergencySound = ({ isActive, emergencyType, onToggleSound }) => {
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);

  // Emergency sound patterns
  const soundPatterns = {
    fire: {
      frequency: 800,
      pattern: [200, 200, 200, 200, 200, 200], // Continuous ringing
      volume: 0.3
    },
    storm: {
      frequency: 400,
      pattern: [100, 100, 100, 100, 100, 100, 100, 1000], // 7 short + 1 long
      volume: 0.4
    },
    collision: {
      frequency: 600,
      pattern: [500, 300, 500, 300, 500, 1500], // 3 long blasts
      volume: 0.35
    }
  };

  const createAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playEmergencySound = (type) => {
    const audioContext = createAudioContext();
    const pattern = soundPatterns[type];
    
    if (!pattern) return;

    let patternIndex = 0;
    
    const playPattern = () => {
      if (!isActive) return;

      // Create oscillator and gain node
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Set frequency and volume
      oscillator.frequency.setValueAtTime(pattern.frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(pattern.volume, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + pattern.pattern[patternIndex] / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + pattern.pattern[patternIndex] / 1000);
      
      patternIndex = (patternIndex + 1) % pattern.pattern.length;
      
      // Schedule next sound
      setTimeout(() => {
        if (isActive) {
          playPattern();
        }
      }, pattern.pattern[patternIndex] + 100);
    };

    playPattern();
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
      oscillatorRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isActive && emergencyType) {
      // Resume audio context if suspended (required by some browsers)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      playEmergencySound(emergencyType);
    } else {
      stopSound();
    }

    return () => {
      stopSound();
    };
  }, [isActive, emergencyType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-red-600 text-white p-3 rounded-lg shadow-lg border border-red-500">
      <div className="flex items-center space-x-2">
        <Volume2 className="h-5 w-5 animate-pulse" />
        <span className="text-sm font-bold">EMERGENCY ALERT</span>
        <button
          onClick={onToggleSound}
          className="p-1 hover:bg-red-700 rounded"
          title="Toggle sound"
        >
          <VolumeX className="h-4 w-4" />
        </button>
      </div>
      <div className="text-xs mt-1 opacity-90">
        {emergencyType?.toUpperCase()} - Sound Pattern Active
      </div>
    </div>
  );
};

export default EmergencySound;