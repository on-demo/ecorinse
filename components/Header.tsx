import React, { useState, useEffect } from 'react';
import { LeafIcon } from './IconComponents';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center">
            <LeafIcon className="h-8 w-8 text-yellow-400" />
            <span className="ml-2 text-2xl font-bold text-white">Mobile Car Wash</span>
          </a>
          <nav className="hidden md:flex space-x-8">
            <a href="#booking" className="text-gray-300 hover:text-yellow-400 transition">Book Now</a>
            <a href="#services" className="text-gray-300 hover:text-yellow-400 transition">Services</a>
            <a href="#contact" className="text-gray-300 hover:text-yellow-400 transition">Contact</a>
          </nav>
           <a href="#booking" className="md:hidden inline-block bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-yellow-300 transition duration-300 text-sm">
              Book Now
           </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
