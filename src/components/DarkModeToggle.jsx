import React from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed top-20 right-4 z-50 p-3 rounded-full transition-all duration-300 shadow-lg ${
        isDarkMode 
          ? 'bg-yellow-500 hover:bg-yellow-400 text-yellow-900' 
          : 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
      }`}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </button>
  );
};

export default DarkModeToggle;