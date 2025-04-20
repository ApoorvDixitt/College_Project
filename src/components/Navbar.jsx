import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-500 to-teal-500 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-white font-bold text-xl">Recipe Finder</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`text-white hover:text-green-200 transition-colors ${
                isActive('/') ? 'font-bold border-b-2 border-white' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/indian-recipes" 
              className={`text-white hover:text-green-200 transition-colors ${
                isActive('/indian-recipes') ? 'font-bold border-b-2 border-white' : ''
              }`}
            >
              Indian Recipes
            </Link>
            <Link 
              to="/favorites" 
              className={`text-white hover:text-green-200 transition-colors ${
                isActive('/favorites') ? 'font-bold border-b-2 border-white' : ''
              }`}
            >
              Favorites
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="mobile-menu-button outline-none focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden pb-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <Link 
            to="/" 
            className={`block py-2 px-4 text-sm text-white hover:bg-green-600 ${
              isActive('/') ? 'bg-green-600 font-bold' : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/indian-recipes" 
            className={`block py-2 px-4 text-sm text-white hover:bg-green-600 ${
              isActive('/indian-recipes') ? 'bg-green-600 font-bold' : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Indian Recipes
          </Link>
          <Link 
            to="/favorites" 
            className={`block py-2 px-4 text-sm text-white hover:bg-green-600 ${
              isActive('/favorites') ? 'bg-green-600 font-bold' : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 