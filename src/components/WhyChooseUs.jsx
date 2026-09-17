import React from 'react';
import svg1 from '../assets/SVg 01.svg';
import svg2 from '../assets/Svg 02.svg';
import svg3 from '../assets/SVg03.svg';
import svg4 from '../assets/SVg 04.svg';
import svg5 from '../assets/SVG 05.svg';
import svg6 from '../assets/SVg 06.svg';
import svg7 from '../assets/Svg 07.svg';
import svg8 from '../assets/SVg 08.svg';

export default function WhyChooseUs() {
  const colFeatures = [
    { title: 'Premium Materials', icon: svg1 },
    { title: 'Fully Devotion', icon: svg2 },
    { title: 'Corporate Decoration', icon: svg4 },
    { title: 'Quality Assurance', icon: svg3 }
  ];

  const artFeatures = [
    { title: 'Bulk Manufacturing', icon: svg5 },
    { title: 'Safe Packaging', icon: svg6 },
    { title: 'Worldwide Shipping', icon: svg7 },
    { title: 'Dedicated Support', icon: svg8 }
  ];

  return (
    <section className="bg-[#0F172A] py-8 md:py-10 px-6 sm:px-12 md:px-20 border-t border-b border-slate-800 relative overflow-hidden">

      {/* Central Full-Height Vertical Red Line Divider */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-[#EE3A57] z-10 pointer-events-none opacity-90 shadow-[0_0_8px_rgba(238,58,87,0.4)]" />

      <div className="max-w-[1550px] mx-auto md:px-6 relative">

        {/* Desktop View: All 4 items inside bordered cards (lg and up) */}
        <div className="hidden lg:grid grid-cols-2 gap-8 xl:gap-14 relative">

          {/* Section 1: Collections */}
          <div className="space-y-6">
            <h3 className="text-center font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.16em] text-white pb-2">
              <span className="text-[#EE3A57]">Why</span> Choose Collections
            </h3>

            {/* Boxed All 4 Items with Dividers */}
            <div className="flex border border-white/20 rounded-2xl bg-white/5 py-6 px-2 divide-x divide-white/20">
              {colFeatures.map((feat, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center text-center space-y-3.5 px-2">
                  <div className="flex items-center justify-center h-20 w-20 xl:h-24 xl:w-24">
                    <img src={feat.icon} alt={feat.title} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-sans text-[11px] xl:text-xs font-bold text-slate-100 tracking-wide leading-tight">
                    {feat.title.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="block">{word}</span>
                    ))}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Divine Creations */}
          <div className="space-y-6">
            <h3 className="text-center font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.16em] text-white pb-2">
              <span className="text-[#EE3A57]">Why</span> Choose Divine Creations
            </h3>

            {/* Boxed All 4 Items with Dividers */}
            <div className="flex border border-white/20 rounded-2xl bg-white/5 py-6 px-2 divide-x divide-white/20">
              {artFeatures.map((feat, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center text-center space-y-3.5 px-2">
                  <div className="flex items-center justify-center h-20 w-20 xl:h-24 xl:w-24">
                    <img src={feat.icon} alt={feat.title} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-sans text-[11px] xl:text-xs font-bold text-slate-100 tracking-wide leading-tight">
                    {feat.title.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="block">{word}</span>
                    ))}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Mobile/Tablet View: Clean Grid (hidden lg) */}
        <div className="lg:hidden flex flex-col gap-10">

          {/* Section 1: Collections */}
          <div className="space-y-4">
            <h3 className="text-center font-serif text-base sm:text-lg font-bold uppercase tracking-[0.16em] text-white pb-2">
              <span className="text-[#EE3A57]">Why</span> Choose Collections
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {colFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="border border-white/80 bg-[#0E0E3B]/30 rounded-2xl p-4 text-center flex flex-col items-center justify-center space-y-3 aspect-[4/5]"
                >
                  <div className="flex items-center justify-center h-20 w-20">
                    <img src={feat.icon} alt={feat.title} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-sans text-[11px] sm:text-xs font-bold text-slate-100 tracking-wide leading-tight">
                    {feat.title.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="block">{word}</span>
                    ))}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Divine Creations */}
          <div className="space-y-4">
            <h3 className="text-center font-serif text-base sm:text-lg font-extrabold uppercase tracking-[0.16em] text-white pb-2">
              <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">Why</span> Choose Divine Creations
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {artFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="border border-white/80 bg-[#0E0E3B]/30 rounded-2xl p-4 text-center flex flex-col items-center justify-center space-y-3 aspect-[4/5]"
                >
                  <div className="flex items-center justify-center h-20 w-20">
                    <img src={feat.icon} alt={feat.title} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-sans text-[11px] sm:text-xs font-bold text-slate-100 tracking-wide leading-tight">
                    {feat.title.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="block">{word}</span>
                    ))}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
