import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    api.clients.getAll()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBrands(data);
        }
      })
      .catch(err => console.error("Failed to load marquee brands:", err));
  }, []);

  if (!brands || brands.length === 0) {
    return null;
  }

  // Duplicate the list of brands to make a seamless infinite loop on wide screens
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="bg-[#f5f2eb] py-8 sm:py-10 border-y border-slate-200/60 overflow-hidden relative">
      <div className="max-w-[1750px] mx-auto">
        
        {/* Section Title */}
        <h2 className="text-center font-serif text-[11px] sm:text-xs md:text-sm lg:text-2xl font-black uppercase tracking-[0.25em] text-slate-900 mb-8 px-6">
          Trusted by <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">Businesses</span> Across India
        </h2>

        {/* Infinite Loop Marquee Container */}
        <div className="w-full overflow-hidden flex relative">
          
          {/* Shadow Gradients for smooth fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f5f2eb] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f5f2eb] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="animate-marquee items-center">
            {duplicatedBrands.map((brand, index) => (
              <div 
                key={index}
                className="flex justify-center items-center shrink-0 w-auto h-18 sm:h-24 lg:h-28 mx-2 sm:mx-6 lg:mx-8 hover:scale-[1.05] transition-transform duration-300"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Decorative Indicator Dots */}
        <div className="flex justify-center items-center gap-3.5 mt-8">
          <span className="brand-dot-1 w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform" />
          <span className="brand-dot-2 w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform" />
          <span className="brand-dot-3 w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform" />
          <span className="brand-dot-4 w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform" />
        </div>

      </div>
    </section>
  );
}
