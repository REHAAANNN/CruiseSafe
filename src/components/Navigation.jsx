import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ship, Menu, X, AlertTriangle } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-900 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
              <Ship className="h-8 w-8 text-blue-300" />
              <span className="text-xl font-bold">CruiseSafe</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-purple-700 text-white' 
                  : 'text-purple-200 hover:bg-purple-800 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/emergency-demo"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                isActive('/emergency-demo') 
                  ? 'bg-red-700 text-white' 
                  : 'text-red-200 hover:bg-red-800 hover:text-white'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Emergency Demo</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-200 focus:outline-none focus:text-blue-200 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-800">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              isActive('/') 
                ? 'bg-blue-700 text-white' 
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              isActive('/dashboard') 
                ? 'bg-purple-700 text-white' 
                : 'text-purple-200 hover:bg-purple-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/emergency-demo"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
              isActive('/emergency-demo') 
                ? 'bg-red-700 text-white' 
                : 'text-red-200 hover:bg-red-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Emergency Demo</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;