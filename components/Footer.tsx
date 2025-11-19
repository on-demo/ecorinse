import React from 'react';
import { LeafIcon } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <LeafIcon className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-2xl font-bold text-white">Mobile Car Wash</span>
            </div>
            <p className="text-center md:text-left">Skip the Queue, Save the Planet.</p>
          </div>
          <div className="text-center">
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <p>Phone: (357) 99 225 220</p>
            <p>Email: contact@ecorinse.com</p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <p className="text-gray-500">(Social media links coming soon)</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mobile Car Wash. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
