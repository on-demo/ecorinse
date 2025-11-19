import React from 'react';

const ContactSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <p className="text-gray-300">
              Have questions or need a custom quote? We're here to help!
            </p>
            <div>
              <p className="font-bold">Phone:</p>
              <a href="tel:123-456-7890" className="text-yellow-400 hover:text-yellow-300">(357) 99 225 220</a>
            </div>
            <div>
              <p className="font-bold">Email:</p>
              <a href="mailto:contact@ecorinse.com" className="text-yellow-400 hover:text-yellow-300">contact@ecorinse.com</a>
            </div>
             <div>
              <p className="font-bold">Operating Hours:</p>
              <p className="text-gray-300">Mon - Sat, 7:00 AM - 3:00 PM</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
             <input type="text" placeholder="Your Name" className="w-full bg-gray-700 p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none" required />
             <input type="email" placeholder="Your Email" className="w-full bg-gray-700 p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none" required />
             <textarea placeholder="Your Message" rows={4} className="w-full bg-gray-700 p-3 rounded-lg border border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none" required></textarea>
             <button type="submit" className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition duration-300">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
