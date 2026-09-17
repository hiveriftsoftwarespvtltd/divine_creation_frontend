import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../utils/api';
import buddhaStatuesImg from '../assets/expertise_buddha_statues.png';
import homeDecorImg from '../assets/expertise_home_decor.png';
import meditationDecorImg from '../assets/expertise_meditation_decor.png';
import gardenStatuesImg from '../assets/expertise_garden_statues.png';
import corporateGiftsImg from '../assets/expertise_corporate_gifts.png';
import templeSculpturesImg from '../assets/expertise_temple_sculptures.png';
import wallArtImg from '../assets/expertise_wall_art.png';
import customizedProductsImg from '../assets/expertise_customized_products.png';

const defaultImagesMap = {
  'corporate': corporateGiftsImg,
  'gift': corporateGiftsImg,
  'drinkware': homeDecorImg,
  'flask': homeDecorImg,
  'notebook': customizedProductsImg,
  'trophy': meditationDecorImg,
  'memento': meditationDecorImg,
  'clock': wallArtImg,
  'kitchen': homeDecorImg,
  'bar': corporateGiftsImg,
  'customized': customizedProductsImg,
};

const getCategoryImage = (cat) => {
  if (cat && cat.image) return cat.image;
  const nameLower = (cat?.name || '').toLowerCase();
  for (const [key, img] of Object.entries(defaultImagesMap)) {
    if (nameLower.includes(key)) return img;
  }
  return corporateGiftsImg;
};

export default function Expertise() {
  const [categories, setCategories] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    api.categories.getAll()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(err => console.error("Failed to fetch categories for Expertise:", err));
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const staticList = [
    { name: 'Corporate Gifts', image: corporateGiftsImg },
    { name: 'Drinkware & Flasks', image: homeDecorImg },
    { name: 'Gift Sets & Notebooks', image: customizedProductsImg },
    { name: 'Mementos & Trophies', image: meditationDecorImg },
    { name: 'Kitchenware & Dinner Sets', image: homeDecorImg },
    { name: 'Wall Clocks', image: wallArtImg },
    { name: 'Bar Accessories', image: corporateGiftsImg },
    { name: 'Desktop Collection', image: customizedProductsImg }
  ];

  const displayList = categories.length > 0
    ? categories.map(cat => ({
        id: cat._id || cat.id,
        name: cat.name,
        image: cat.image || getCategoryImage(cat)
      }))
    : staticList;

  return (
    <section id="expertise" className="bg-[#faf9f8] py-8 sm:py-12 md:py-14 px-4 sm:px-8 lg:px-12 border-b border-slate-100 relative group/section">
      <div className="max-w-[1750px] mx-auto">

        {/* Section Heading */}
        <h2 className="text-center font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-[0.18em] text-slate-900 mb-8 sm:mb-10">
          Explore Our <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">Expertise</span>
        </h2>

        {/* Carousel Outer Container with Left/Right Buttons */}
        <div className="relative px-2 sm:px-8">
          
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 border border-slate-200/80 shadow-md hover:shadow-lg flex items-center justify-center z-30 transition-all duration-300 hover:scale-110 hover:text-accent cursor-pointer"
            aria-label="Previous Categories"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 border border-slate-200/80 shadow-md hover:shadow-lg flex items-center justify-center z-30 transition-all duration-300 hover:scale-110 hover:text-accent cursor-pointer"
            aria-label="Next Categories"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
          </button>

          {/* Carousel Track (Horizontal Scrollable Area) */}
          <div
            ref={sliderRef}
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none no-scrollbar scroll-smooth py-2 px-1"
          >
            {displayList.map((item, idx) => (
              <Link
                to={`/collections?category=${encodeURIComponent(item.name)}`}
                key={item.id || idx}
                className="shrink-0 w-[130px] sm:w-[160px] md:w-[180px] lg:w-[195px] group flex flex-col items-center space-y-3 cursor-pointer"
              >
                {/* Rounded Square Image Container */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200/70 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-md bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getCategoryImage(item);
                    }}
                  />
                </div>

                {/* Caption */}
                <span className="text-[11.5px] sm:text-xs font-bold text-slate-800 group-hover:text-accent tracking-wide text-center transition-colors line-clamp-2">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

        </div>

        {/* Center View All Button */}
        <div className="pt-10 text-center">
          <Link
            to="/collections"
            className="inline-block px-8 py-3.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            View All Collections
          </Link>
        </div>

      </div>
    </section>
  );
}
