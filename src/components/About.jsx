import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import defaultAboutCraftImg from '../assets/about_corporate_gifting_craft.jpg';

// Helper to render icon by name
function renderHighlightIcon(iconType) {
  switch (iconType) {
    case 'clock':
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'shield':
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    case 'users':
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      );
    case 'gift':
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      );
    case 'award':
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004-4.875V6.75A3.75 3.75 0 0010.875 3h-1.75a3.75 3.75 0 00-3.75 3.75v3.75m8.504 0h-8.504" />
        </svg>
      );
    case 'star':
    default:
      return (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      );
  }
}

export default function About() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  const [data, setData] = useState({
    badge: 'ABOUT DIVINE CREATIONS',
    title: 'Traditional Indian Craftsmanship',
    titleHighlight: 'Modern Design',
    description:
      'Established in 2007 in New Delhi under Director M Ahuja, Divine Creations is a premier manufacturer, trader, and exporter of Corporate & Promotional Gift Items, Executive Gift Sets, Stainless Steel Flasks, Executive Notebooks, Trophy Mementos, and Custom Homeware.',
    image: '',
    buttonText: 'KNOW OUR STORY',
    buttonLink: '/about',
    highlights: [
      { title: '16+ Years', subtitle: 'Experience', icon: 'clock' },
      { title: 'GST Registered', subtitle: 'Proprietorship', icon: 'shield' },
      { title: 'Trusted', subtitle: 'Manufacturer', icon: 'users' },
      { title: 'Corporate', subtitle: 'Gifting Sets', icon: 'gift' },
    ],
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await api.about.get();
        if (res && res.overview) {
          setData((prev) => ({
            ...prev,
            ...res.overview,
            highlights: res.overview.highlights?.length ? res.overview.highlights : prev.highlights,
          }));
        }
      } catch (err) {
        console.error('Failed to load live About data:', err);
      }
    };
    fetchAboutData();
  }, []);

  const displayImage = data.image || defaultAboutCraftImg;

  return (
    <section className="bg-white py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-12 relative border-b border-slate-100 text-left">
      <div className="max-w-[1450px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Executive Gifting Image */}
          <div className="lg:col-span-5 w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-2xl shadow-md border border-slate-200/80 group bg-slate-950">
            <img
              src={displayImage}
              alt="Divine Creations Corporate Gifting & Executive Products"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#EE3A57] block mb-2">
                {data.badge || 'ABOUT DIVINE CREATIONS'}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {data.title}<br />
                Meets <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">{data.titleHighlight}</span>
              </h2>

              <div className="w-full h-[2px] bg-gradient-to-r from-[#EE3A57] to-[#2563EB] mt-2 rounded-full" />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {data.description}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
              {data.highlights.map((hl, index) => (
                <div key={index} className="flex items-center gap-3.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EE3A57]/10 flex items-center justify-center text-[#EE3A57] shrink-0 border border-[#EE3A57]/20">
                    {renderHighlightIcon(hl.icon)}
                  </div>
                  <div className="text-left font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    <span>{hl.title}</span>
                    <span className="block text-slate-500 font-semibold">{hl.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            {!isAboutPage && (
              <div className="pt-4">
                <Link
                  to={data.buttonLink || '/about'}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {data.buttonText || 'KNOW OUR STORY'}
                </Link>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
