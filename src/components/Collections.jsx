import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

import corporateGiftImg from '../assets/collection_corporate_gift.png';
import one1 from '../assets/one1.png';
import one8 from '../assets/one8.png';
import one12 from '../assets/one12.png';
import one14 from '../assets/one14.png';
import one16 from '../assets/one16.png';
import one17 from '../assets/one17.png';
import one19 from '../assets/one19.png';

const DEFAULT_FEATURED_PRODUCTS = [
  {
    _id: 'def-1',
    title: 'Omega Curved Bottle (600 ML)',
    category: 'Drinkware',
    image: one1
  },
  {
    _id: 'def-2',
    title: 'DC Corporate Gift Creation Set',
    category: 'Corporate Gifts',
    image: corporateGiftImg
  },
  {
    _id: 'def-3',
    title: 'Trophy DC EX 99 Leadership Award',
    category: 'Momentos',
    image: one17
  },
  {
    _id: 'def-4',
    title: 'Accent Sweep Wall Clock 12"',
    category: 'Wall Clocks',
    image: one16
  },
  {
    _id: 'def-5',
    title: 'DOUBLE LUNCH BOX 2-Tier Tiffin',
    category: 'Homeware',
    image: one8
  },
  {
    _id: 'def-6',
    title: 'Desktop Clock with Calculator',
    category: 'Desktop Collection',
    image: one12
  }
];

export default function Collections() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.products.getAll()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const featuredOnly = data.filter(p => p.featured);
          const listToShow = featuredOnly.length > 0 ? featuredOnly : data;
          setProducts(listToShow.slice(0, 6));
        } else {
          setProducts(DEFAULT_FEATURED_PRODUCTS);
        }
      })
      .catch(() => setProducts(DEFAULT_FEATURED_PRODUCTS));
  }, []);

  const displayList = products.length > 0 ? products : DEFAULT_FEATURED_PRODUCTS;

  const handleCardClick = (prod) => {
    if (prod._id && !prod._id.startsWith('def-')) {
      navigate(`/product/${prod._id}`);
    } else {
      navigate(`/collections?category=${encodeURIComponent(prod.category || 'Drinkware')}`);
    }
  };

  return (
    <section id="collections" className="bg-white py-8 sm:py-12 md:py-14 px-4 sm:px-8 lg:px-12 border-b border-slate-100 text-left">
      <div className="max-w-[1750px] mx-auto space-y-8">

        {/* Section Title */}
        <h2 className="text-center font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-[0.18em] text-slate-900">
          Featured <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">Collections</span>
        </h2>

        {/* 6-Column Responsive Grid showing real product images and titles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 justify-center">
          {displayList.map((prod, idx) => (
            <div
              key={prod._id || idx}
              onClick={() => handleCardClick(prod)}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group border border-slate-200/80 transition-all duration-300 hover:scale-[1.03] hover:shadow-md cursor-pointer bg-slate-950 flex flex-col justify-end"
            >
              {/* Product Image */}
              <img
                src={prod.image || one1}
                alt={prod.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              {/* Category Pill Tag */}
              <div className="absolute top-2.5 left-2.5 z-20">
                <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider text-white bg-slate-950/80 backdrop-blur-xs border border-slate-700/80 shadow-xs truncate max-w-[110px] block">
                  {prod.category || 'CORPORATE GIFT'}
                </span>
              </div>

              {/* Title & Explore Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-3 pb-4 z-20 space-y-2">
                <div className="text-white w-full px-1">
                  <h4 className="font-serif text-xs sm:text-sm font-extrabold leading-tight tracking-wide drop-shadow-sm line-clamp-2">
                    {prod.title}
                  </h4>
                </div>

                {/* Explore Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(prod);
                  }}
                  className="bg-white hover:bg-[#EE3A57] text-slate-900 hover:text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Explore
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
