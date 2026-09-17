import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { api } from '../utils/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.categories.getAll()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch((err) => console.error("Failed to load categories for Footer:", err));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Our Products', to: '/collections' },
    { label: 'Custom Orders', to: '/custom-order' },
    { label: 'Our Clients', to: '/our-clients' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Blogs', to: '/blogs' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Other Website', href: 'https://www.corporategiftsindia.net/', isExternal: true },
  ];

  const defaultCategories = [
    { name: 'Corporate Gift Sets' },
    { name: 'Drinkware & Flasks' },
    { name: 'Gift Sets & Notebooks' },
    { name: 'Mementos & Trophies' },
    { name: 'Kitchenware & Dinner Sets' },
    { name: 'Wall Clocks' },
    { name: 'Bar Accessories' },
    { name: 'Homeware & Lunch Boxes' },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  const socials = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/people/Divine-Creations/61592632652099/',
      color: '#1877F2',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/divinecreations.art',
      color: '#E1306C',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@divinecreations',
      color: '#FF0000',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/919818946081',
      color: '#25D366',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#0E0E3B] text-white">

      {/* ===== Main Footer Grid ===== */}
      <div className="max-w-[1750px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12
        grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8
      ">

        {/* Col 1: Logo + tagline + Contact */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-3">
          <Link to="/">
            <img src={logo} alt="Divine Creations" className="h-14 sm:h-16 w-auto object-contain" />
          </Link>
          <p className="text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed max-w-[220px]">
            Established 2007 in New Delhi. Premium Manufacturer & Exporter of Corporate Gifting, Executive Gift Sets, Drinkware & Awards.
          </p>
          <div className="pt-2 space-y-1.5 text-xs font-semibold">
            <a
              href="tel:+919811066081"
              className="flex items-center gap-2 text-slate-200 hover:text-[#C89B3C] transition-colors"
              title="Call Us"
            >
              <svg className="w-3.5 h-3.5 text-[#EE3A57] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call: <strong className="text-white">+91 98110 66081</strong></span>
            </a>
            <a
              href="https://wa.me/919818946081"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-colors"
              title="WhatsApp Us"
            >
              <svg className="w-3.5 h-3.5 text-[#25D366] shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
              </svg>
              <span>WA: <strong className="text-white">+91 98189 46081</strong></span>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-white">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                {l.isExternal ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D8D4CF] text-xs sm:text-sm font-semibold hover:text-[#C89B3C] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{l.label}</span>
                    <svg className="w-3 h-3 text-slate-400 group-hover:text-[#C89B3C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    to={l.to}
                    className="text-[#D8D4CF] text-xs sm:text-sm font-semibold hover:text-[#C89B3C] transition-colors"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Collections (Dynamic API + Height Limit with Scrollbar) */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-white">
            Collections
          </h4>
          <div className="max-h-48 overflow-y-auto pr-1 text-left space-y-2 scrollbar-thin scrollbar-thumb-[#C89B3C] scrollbar-track-white/10">
            <ul className="space-y-2">
              {displayCategories.map((c, idx) => {
                const catName = c.name || c;
                return (
                  <li key={c._id || c.id || idx}>
                    <Link
                      to={`/collections?category=${encodeURIComponent(catName)}`}
                      className="text-[#D8D4CF] text-xs sm:text-sm font-semibold hover:text-[#C89B3C] transition-colors block truncate"
                      title={catName}
                    >
                      {catName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Col 4: Follow Us */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-white">
            Follow Us
          </h4>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 group"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-opacity group-hover:opacity-80"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.icon}
                  </span>
                  <span className="text-[#D8D4CF] text-xs sm:text-sm font-semibold group-hover:text-[#C89B3C] transition-colors">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 5: Newsletter */}
        <div className="col-span-2 sm:col-span-1 space-y-3">
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-white">
            Newsletter
          </h4>
          <p className="text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed">
            Subscribe to get updates on new arrivals and offers.
          </p>

          {subscribed ? (
            <p className="text-[#EE3A57] text-[10px] font-bold uppercase tracking-wider">✓ Subscribed! Thank you.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900/60 border border-slate-700/80 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#EE3A57] transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] py-2.5 rounded-lg transition-all duration-300 shadow-md cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-[#1a1a4a]">
        <div className="max-w-[1750px] mx-auto px-5 sm:px-8 lg:px-12 py-3 text-center">
          <p className="text-[#D8D4CF] text-xs sm:text-sm font-semibold tracking-wide">
            © 2026 Divine Creations. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* ===== WhatsApp Floating Button ===== */}
      <a
        href="https://wa.me/919818946081"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-12 h-12 bg-[#25D366] hover:bg-[#1ebe57] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
        </svg>
      </a>

    </footer>
  );
}
