import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingSection from './components/BookingSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans antialiased">
      <Header />
      <main>
        <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
             <img src="https://picsum.photos/1920/1080?grayscale&blur=2" alt="Blurred background of a car" className="absolute inset-0 w-full h-full object-cover z-[-1]" />
             <div className="relative z-10 text-center px-4">
                 <div className="flex justify-center items-center mb-4">
                     <h1 className="text-5xl md:text-7xl font-bold ml-2">Mobile Car Wash</h1>
                 </div>
                 <p className="text-lg md:text-2xl text-gray-200 mt-2">Skip the Queue, Save the Planet.</p>
                 <p className="text-md md:text-xl text-gray-300">Mobile Car Wash Made Easy.</p>
                 <a href="#booking" className="mt-8 inline-block bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300 text-lg">
                    Book Now
                 </a>
             </div>
        </div>
        
        <BookingSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
