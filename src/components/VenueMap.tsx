import React from 'react';

export const VenueMap: React.FC = () => {
  return (
    <section className="relative w-full z-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,210,255,0.15)] bg-black/60">
          <iframe
            title="Panimalar Engineering College Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.726667954575!2d80.0754854758778!3d13.053073013141388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261bf39547d2b%3A0xc480f2d4e84b25fb!2sPanimalar%20Engineering%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </section>
  );
};
