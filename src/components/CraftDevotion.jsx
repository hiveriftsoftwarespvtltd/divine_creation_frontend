import React from 'react';
import { useNavigate } from 'react-router-dom';

import laserEngravingImg from '../assets/laser_engraving_corporate_gifting.jpg';
import trophyCraftingImg from '../assets/metal_etching_trophy_crafting.jpg';
import embossingImg from '../assets/leatherette_gifting_embossing.jpg';
import drinkwareSetImg from '../assets/executive_drinkware_set.jpg';

export default function CraftDevotion() {
  const navigate = useNavigate();

  const handleImageClick = (categoryName) => {
    if (categoryName) {
      navigate(`/collections?category=${encodeURIComponent(categoryName)}`);
    } else {
      navigate('/collections');
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-slate-100 text-left">
      <div className="max-w-[1750px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-4 space-y-5 lg:space-y-6">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#EE3A57] block">
              ADVANCED MANUFACTURING & BRANDING
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              Precision Branding <br className="hidden sm:inline" />
              For Corporate Gifts
            </h2>
            
            <div className="h-[2px] w-14 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
            
            <p className="font-sans text-slate-600 text-[13px] sm:text-sm leading-relaxed sm:leading-loose font-medium">
              Equipped with Laser Engraving, Metal Marking, Chemical Etching, and Glass Sand Carving machinery at Badli Industrial Estate, Divine Creations transforms your concepts and company logos into executive corporate gifts with high demographic impact.
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => navigate('/custom-order')}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0E0E3B] hover:bg-[#1a1a4a] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                SEE OUR PROCESS
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Right Column: Image Grid Collage with OnClick Product Navigation */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
              
              {/* Image 1: Left tall fiber laser engraving image */}
              <div
                onClick={() => handleImageClick('Drinkware')}
                className="sm:col-span-5 h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group relative cursor-pointer bg-slate-950"
              >
                <img
                  src={laserEngravingImg}
                  alt="Precision Laser Engraving on Corporate Stainless Steel Flask"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex flex-col gap-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#EE3A57] bg-white/95 px-2 py-0.5 rounded w-max">
                    Fiber Laser Marking
                  </span>
                  <h4 className="font-bold text-sm sm:text-base leading-tight">
                    Custom Laser Engraved Bottles
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-300 flex items-center gap-1 group-hover:text-white transition-colors">
                    Click to View Catalog &rarr;
                  </span>
                </div>
              </div>
              
              {/* Image 2 & 3: Middle stacked column */}
              <div className="sm:col-span-3 flex flex-col gap-4">
                <div
                  onClick={() => handleImageClick('Mementos & Trophies')}
                  className="h-[132px] sm:h-[172px] md:h-[202px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group relative cursor-pointer bg-slate-950"
                >
                  <img
                    src={trophyCraftingImg}
                    alt="Custom Metal Marking & Etching Award Trophy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <h4 className="font-bold text-xs leading-tight">
                      Metal Trophies
                    </h4>
                    <span className="text-[9px] font-semibold text-slate-300">View Items &rarr;</span>
                  </div>
                </div>

                <div
                  onClick={() => handleImageClick('Gift Sets & Notebooks')}
                  className="h-[132px] sm:h-[172px] md:h-[202px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group relative cursor-pointer bg-slate-950"
                >
                  <img
                    src={embossingImg}
                    alt="Executive Leatherette Embossed Journal Notebook"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <h4 className="font-bold text-xs leading-tight">
                      Leatherette Diaries
                    </h4>
                    <span className="text-[9px] font-semibold text-slate-300">View Items &rarr;</span>
                  </div>
                </div>
              </div>
              
              {/* Image 4: Right tall executive drinkware set image */}
              <div
                onClick={() => handleImageClick('Corporate Gifts')}
                className="sm:col-span-4 h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group relative cursor-pointer bg-slate-950"
              >
                <img
                  src={drinkwareSetImg}
                  alt="Custom Executive Corporate Gifting Set"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex flex-col gap-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#2563EB] bg-white/95 px-2 py-0.5 rounded w-max">
                    Executive Gift Combo
                  </span>
                  <h4 className="font-bold text-sm sm:text-base leading-tight">
                    Corporate Gift Sets
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-300 flex items-center gap-1 group-hover:text-white transition-colors">
                    Click to View Catalog &rarr;
                  </span>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
