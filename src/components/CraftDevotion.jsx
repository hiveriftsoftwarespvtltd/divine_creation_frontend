import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

import defaultLaserImg from '../assets/laser_engraving_corporate_gifting.jpg';
import defaultTrophyImg from '../assets/metal_etching_trophy_crafting.jpg';
import defaultEmbossingImg from '../assets/leatherette_gifting_embossing.jpg';
import defaultDrinkwareImg from '../assets/executive_drinkware_set.jpg';

export default function CraftDevotion() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    badge: 'ADVANCED MANUFACTURING & BRANDING',
    title: 'Precision Branding',
    titleSub: 'For Corporate Gifts',
    description:
      'Equipped with Laser Engraving, Metal Marking, Chemical Etching, and Glass Sand Carving machinery at Badli Industrial Estate, Divine Creations transforms your concepts and company logos into executive corporate gifts with high demographic impact.',
    buttonText: 'SEE OUR PROCESS',
    buttonLink: '/custom-order',
    cards: [
      {
        tag: 'Fiber Laser Marking',
        title: 'Custom Laser Engraved Bottles',
        linkText: 'Click to View Catalog →',
        category: 'Drinkware',
        image: '',
      },
      {
        tag: '',
        title: 'Metal Trophies',
        linkText: 'View Items →',
        category: 'Mementos & Trophies',
        image: '',
      },
      {
        tag: '',
        title: 'Leatherette Diaries',
        linkText: 'View Items →',
        category: 'Gift Sets & Notebooks',
        image: '',
      },
      {
        tag: 'Executive Gift Combo',
        title: 'Corporate Gift Sets',
        linkText: 'Click to View Catalog →',
        category: 'Corporate Gifts',
        image: '',
      },
    ],
  });

  useEffect(() => {
    const fetchCraftData = async () => {
      try {
        const res = await api.about.get();
        if (res && res.manufacturing) {
          setData((prev) => ({
            ...prev,
            ...res.manufacturing,
            cards: res.manufacturing.cards?.length ? res.manufacturing.cards : prev.cards,
          }));
        }
      } catch (err) {
        console.error('Failed to load live Manufacturing data:', err);
      }
    };
    fetchCraftData();
  }, []);

  const handleImageClick = (categoryName) => {
    if (categoryName) {
      navigate(`/collections?category=${encodeURIComponent(categoryName)}`);
    } else {
      navigate('/collections');
    }
  };

  const card0 = data.cards?.[0] || {};
  const card1 = data.cards?.[1] || {};
  const card2 = data.cards?.[2] || {};
  const card3 = data.cards?.[3] || {};

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-slate-100 text-left">
      <div className="max-w-[1750px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-4 space-y-5 lg:space-y-6">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#EE3A57] block">
              {data.badge || 'ADVANCED MANUFACTURING & BRANDING'}
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              {data.title} <br className="hidden sm:inline" />
              {data.titleSub}
            </h2>
            
            <div className="h-[2px] w-14 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
            
            <p className="font-sans text-slate-600 text-[13px] sm:text-sm leading-relaxed sm:leading-loose font-medium">
              {data.description}
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => navigate(data.buttonLink || '/custom-order')}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0E0E3B] hover:bg-[#1a1a4a] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                {data.buttonText || 'SEE OUR PROCESS'}
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
                onClick={() => handleImageClick(card0.category || 'Drinkware')}
                className="sm:col-span-5 h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group relative cursor-pointer bg-slate-950"
              >
                <img
                  src={card0.image || defaultLaserImg}
                  alt={card0.title || 'Precision Laser Engraving on Corporate Stainless Steel Flask'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex flex-col gap-1">
                  {card0.tag && (
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#EE3A57] bg-white/95 px-2 py-0.5 rounded w-max">
                      {card0.tag}
                    </span>
                  )}
                  <h4 className="font-bold text-sm sm:text-base leading-tight">
                    {card0.title || 'Custom Laser Engraved Bottles'}
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-300 flex items-center gap-1 group-hover:text-white transition-colors">
                    {card0.linkText || 'Click to View Catalog →'}
                  </span>
                </div>
              </div>
              
              {/* Image 2 & 3: Middle stacked column */}
              <div className="sm:col-span-3 flex flex-col gap-4">
                <div
                  onClick={() => handleImageClick(card1.category || 'Mementos & Trophies')}
                  className="h-[132px] sm:h-[172px] md:h-[202px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group relative cursor-pointer bg-slate-950"
                >
                  <img
                    src={card1.image || defaultTrophyImg}
                    alt={card1.title || 'Custom Metal Marking & Etching Award Trophy'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    {card1.tag && (
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#EE3A57] bg-white/95 px-1.5 py-0.5 rounded w-max mb-1 inline-block">
                        {card1.tag}
                      </span>
                    )}
                    <h4 className="font-bold text-xs leading-tight">
                      {card1.title || 'Metal Trophies'}
                    </h4>
                    <span className="text-[9px] font-semibold text-slate-300">
                      {card1.linkText || 'View Items →'}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => handleImageClick(card2.category || 'Gift Sets & Notebooks')}
                  className="h-[132px] sm:h-[172px] md:h-[202px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group relative cursor-pointer bg-slate-950"
                >
                  <img
                    src={card2.image || defaultEmbossingImg}
                    alt={card2.title || 'Executive Leatherette Embossed Journal Notebook'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    {card2.tag && (
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#EE3A57] bg-white/95 px-1.5 py-0.5 rounded w-max mb-1 inline-block">
                        {card2.tag}
                      </span>
                    )}
                    <h4 className="font-bold text-xs leading-tight">
                      {card2.title || 'Leatherette Diaries'}
                    </h4>
                    <span className="text-[9px] font-semibold text-slate-300">
                      {card2.linkText || 'View Items →'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Image 4: Right tall executive drinkware set image */}
              <div
                onClick={() => handleImageClick(card3.category || 'Corporate Gifts')}
                className="sm:col-span-4 h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 group relative cursor-pointer bg-slate-950"
              >
                <img
                  src={card3.image || defaultDrinkwareImg}
                  alt={card3.title || 'Custom Executive Corporate Gifting Set'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex flex-col gap-1">
                  {card3.tag && (
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#2563EB] bg-white/95 px-2 py-0.5 rounded w-max">
                      {card3.tag}
                    </span>
                  )}
                  <h4 className="font-bold text-sm sm:text-base leading-tight">
                    {card3.title || 'Corporate Gift Sets'}
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-300 flex items-center gap-1 group-hover:text-white transition-colors">
                    {card3.linkText || 'Click to View Catalog →'}
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
