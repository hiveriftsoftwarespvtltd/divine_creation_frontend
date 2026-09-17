import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { api } from '../utils/api';

import one1 from '../assets/one1.png';
import one2 from '../assets/one2.png';
import one3 from '../assets/one3.png';
import one4 from '../assets/one4.png';
import one5 from '../assets/one5.png';
import one6 from '../assets/one6.png';

const DEFAULT_PRODUCTS = [
  {
    _id: 'def-1',
    title: 'DC Corporate Executive Gift Set',
    category: 'Corporate Gifts',
    material: 'Stainless Steel & PU Leather',
    image: one1
  },
  {
    _id: 'def-2',
    title: '4 in 1 Executive Leatherette Combo',
    category: 'Gift Sets',
    material: 'PU Leather & Metal',
    image: one2
  },
  {
    _id: 'def-3',
    title: 'Eco Friendly Bamboo Flask & Mug Set',
    category: 'Drinkware',
    material: 'Organic Bamboo & Steel',
    image: one3
  },
  {
    _id: 'def-4',
    title: 'DC Gold Corporate Award Trophy',
    category: 'Momentos',
    material: 'Brass & Optical Glass',
    image: one4
  },
  {
    _id: 'def-5',
    title: 'Executive Desk Organizer Clock',
    category: 'Desktop Collection',
    material: 'Acacia Wood & Acrylic',
    image: one5
  },
  {
    _id: 'def-6',
    title: 'Momento Star Award Trophy',
    category: 'Trophies',
    material: 'Gold Plated Brass',
    image: one6
  }
];

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      api.products.getAll().catch(() => []),
      api.content.get().catch(() => null)
    ]).then(([productsData, contentData]) => {
      if (Array.isArray(productsData) && productsData.length > 0) {
        setProducts(productsData);
      } else {
        setProducts(DEFAULT_PRODUCTS);
      }
      if (contentData) {
        setContent(contentData);
      }
    }).catch(err => console.error("Failed to load FeaturedProducts API data:", err));
  }, []);

  const featuredProductsList = products.filter(p => p.featured);
  const displayList = featuredProductsList.length > 0 ? featuredProductsList : (products.length > 0 ? products : DEFAULT_PRODUCTS);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  // 6 Products visible on desktop, 2 on mobile
  const getVisibleProducts = () => {
    if (displayList.length <= 6) return displayList;
    const visible = [];
    for (let i = 0; i < 6; i++) {
      visible.push(displayList[(currentIndex + i) % displayList.length]);
    }
    return visible;
  };

  const visibleProducts = getVisibleProducts();

  const handleProductClick = (prod) => {
    if (prod._id && !prod._id.startsWith('def-')) {
      navigate(`/product/${prod._id}`);
    } else {
      navigate(`/collections?category=${encodeURIComponent(prod.category || 'Drinkware')}`);
    }
  };

  const openWhatsAppEnquiry = (e, prod) => {
    e.stopPropagation();
    const message = `Hello Divine Creations! I want to enquire about product: ${prod.title}`;
    window.open(`https://wa.me/919818946081?text=${encodeURIComponent(message)}`, '_blank');
  };

  const sectionTitle = content?.ourProductsTitle || 'Our Products';

  const renderTwoColorTitle = (rawTitle) => {
    const text = rawTitle || 'Our Products';
    const words = text.trim().split(' ');
    if (words.length <= 1) {
      return <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">{text}</span>;
    }
    const firstWord = words[0];
    const rest = words.slice(1).join(' ');
    return (
      <>
        {firstWord}{' '}
        <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">
          {rest}
        </span>
      </>
    );
  };

  return (
    <section className="bg-white py-8 sm:py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-100 text-left">
      <div className="max-w-[1750px] mx-auto space-y-6">

        {/* Centered Section Header with 2-Color Brand Theme */}
        <div className="relative text-center pb-1 flex justify-center items-center">
          <h2 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-[0.18em] text-slate-900">
            {renderTwoColorTitle(sectionTitle)}
          </h2>

          {/* Top Carousel Arrow Controls (Positioned Absolute Right) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-[#EE3A57] text-slate-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
              aria-label="Previous Products"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-[#EE3A57] text-slate-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
              aria-label="Next Products"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* 6-Column Grid Layout on Desktop / 2-Column Grid on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {visibleProducts.map((prod, idx) => (
            <div
              key={prod._id || idx}
              onClick={() => handleProductClick(prod)}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group hover:-translate-y-1"
            >
              {/* Product Image Box */}
              <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                <img
                  src={prod.image || one1}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Category Pill Tag */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider text-white bg-slate-950/80 backdrop-blur-xs border border-slate-700/80 shadow-xs truncate max-w-[100px] block">
                    {prod.category || 'GIFT ITEM'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 flex flex-col flex-grow justify-between gap-2.5">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-[13px] leading-tight line-clamp-2 group-hover:text-[#EE3A57] transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium truncate mt-1">
                    {prod.material || 'Grade 304 Stainless Steel'}
                  </p>
                </div>

                {/* WhatsApp Enquiry Button */}
                <button
                  type="button"
                  onClick={(e) => openWhatsAppEnquiry(e, prod)}
                  className="w-full py-1.5 px-2 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3 fill-current" />
                  <span>Enquire Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
