import React from 'react';
import { SparklesIcon } from './IconComponents';

const ServiceBenefit = ({ title, description }: { title: string, description: string }) => (
    <div className="bg-gray-800 p-6 rounded-lg flex">
        <SparklesIcon className="h-8 w-8 text-yellow-400 mr-4 flex-shrink-0 mt-1" />
        <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Why Choose EcoRinse?</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We use a state-of-the-art, no-rinse solution that safely lifts dirt and grime away from your car's surface, leaving a protective, glossy finish. It's better for your car and better for the planet.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceBenefit 
                title="Water Saving" 
                description="Our process uses a fraction of the water of a traditional car wash, saving a vital resource."
            />
            <ServiceBenefit 
                title="Superior Clean & Shine" 
                description="Lifts dirt without scratching and leaves a lasting, protective shine that repels dust and water."
            />
            <ServiceBenefit 
                title="Ultimate Convenience" 
                description="We come to you, at your home or office. Skip the queues and save your valuable time."
            />
            <ServiceBenefit 
                title="Environmentally Safe" 
                description="Our products are biodegradable and non-toxic, ensuring no harmful runoff pollutes our waterways."
            />
             <ServiceBenefit 
                title="Protects Your Vehicle" 
                description="Safe for all surfaces, including paint, clear coats, plastic, and rubber. No abrasive materials used."
            />
             <ServiceBenefit 
                title="No Mess, No Residue" 
                description="The no-rinse formula means no soapy puddles or white residue left behind. Just a sparkling clean car."
            />
        </div>
        <div className="text-center mt-16">
             <a href="#booking" className="inline-block bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-full hover:bg-yellow-300 transition duration-300 text-xl">
                Book Your Wash Today
             </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
