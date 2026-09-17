import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { api } from '../utils/api';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    api.content.get()
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load navbar dynamic content:', err));
  }, []);

  return (
    <header className="w-full z-50 shadow-sm sticky top-0">
      {/* Top Banner (Dark Blue Background) */}
      <div className="bg-[#0E0E3B] text-white text-xs py-2.5 px-4 sm:px-8 border-b border-[#1a1a4a] hidden md:block">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left: Contact Info */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-6 text-slate-300 font-light">
            <span className="hidden lg:flex items-center gap-2 hover:text-white transition-colors duration-200">
              {/* Location Icon */}
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {content?.address ? (content.address.includes('|') ? content.address.split('|')[0].trim() : content.address) : 'Naraina Vihar, New Delhi'}
            </span>
            <a href={`mailto:${content?.email || 'info@divinecreations.com'}`} className="hidden sm:flex items-center gap-2 hover:text-white transition-colors duration-200">
              {/* Email Icon */}
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {content?.email || 'info@divinecreations.com'}
            </a>
            {/* Call Static Number */}
            <a
              href="tel:+919811066081"
              className="flex items-center gap-2 hover:text-white transition-colors duration-200 font-medium"
              title="Call Us Directly"
            >
              <svg className="w-4 h-4 text-[#EE3A57]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call: <strong className="text-white font-semibold">{content?.phone || '+91 98110 66081'}</strong></span>
            </a>
            {/* WhatsApp Direct Number */}
            <a
              href="https://wa.me/919818946081"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 font-medium"
              title="Chat on WhatsApp"
            >
              <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
              </svg>
              <span>WA: <strong className="text-white font-semibold">+91 98189 46081</strong></span>
            </a>
          </div>

          {/* Right: Social Follows */}
          <div className="flex items-center gap-3 text-slate-300">
            <span className="text-[11px] font-medium tracking-wide">Follow Us :</span>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/divinecreations.art"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 bg-[#E1306C] hover:bg-[#c1255b] rounded-full flex justify-center items-center text-white transition-all duration-200"
              aria-label="Instagram"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook Icon (Blue Circular Background) */}
            <a
              href="https://www.facebook.com/people/Divine-Creations/61592632652099/"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 bg-[#1877f2] hover:bg-[#156cd4] rounded-full flex justify-center items-center text-white transition-all duration-200"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>

            {/* YouTube Icon (Red Circular Background) */}
            <a
              href="https://www.youtube.com/@divinecreations"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 bg-[#ff0000] hover:bg-[#dd0000] rounded-full flex justify-center items-center text-white transition-all duration-200"
              aria-label="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation (White Background) */}
      <nav className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-[1500px] mx-auto flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Divine Creations Logo"
              className="h-14 sm:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links (High Contrast Primary Blue, Bold, Underline active) */}
          <div className="hidden xl:flex items-center gap-7 text-[15px] font-extrabold text-slate-800">
            <NavLink to="/" className={({ isActive }) => `hover:text-accent py-1.5 transition-colors relative ${isActive ? 'text-accent border-b-2 border-accent' : 'text-[#0b0e26]'}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `hover:text-accent py-1.5 transition-colors relative ${isActive ? 'text-accent border-b-2 border-accent' : 'text-[#0b0e26]'}`}>About Us</NavLink>
            <NavLink to="/collections" className={({ isActive }) => `hover:text-accent py-1.5 transition-colors relative ${isActive ? 'text-accent border-b-2 border-accent' : 'text-[#0b0e26]'}`}>Our Product</NavLink>
            <NavLink to="/custom-order" className={({ isActive }) => `hover:text-accent py-1.5 transition-colors relative ${isActive ? 'text-accent border-b-2 border-accent' : 'text-[#0b0e26]'}`}>Custom Orders</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `hover:text-accent py-1.5 transition-colors relative ${isActive ? 'text-accent border-b-2 border-accent' : 'text-[#0b0e26]'}`}>Gallery</NavLink>
            <NavLink to="/blogs" className={({ isActive }) => `hover:text-accent py-1.5 transition-colors relative ${isActive ? 'text-accent border-b-2 border-accent' : 'text-[#0b0e26]'}`}>Blogs</NavLink>
            <NavLink to="/our-clients" className={({ isActive }) => `hover:text-accent py-1.5 transition-colors relative ${isActive ? 'text-accent border-b-2 border-accent' : 'text-[#0b0e26]'}`}>Our Clients</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `hover:text-accent py-1.5 transition-colors relative ${isActive ? 'text-accent border-b-2 border-accent' : 'text-[#0b0e26]'}`}>Contact</NavLink>
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              REQUEST CATALOGUE
            </Link>

            {/* WhatsApp green circular icon */}
            <a
              href="https://wa.me/919818946081"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-[#25d366] hover:bg-[#20ba5a] rounded-full flex justify-center items-center text-white shadow-sm hover:scale-105 transition-all duration-200"
              aria-label="Chat on WhatsApp"
            >
              <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
              </svg>
            </a>
          </div>

          {/* Mobile Hamburger menu */}
          <div className="flex xl:hidden items-center gap-3">
            {/* Mobile WhatsApp option */}
            <a
              href="https://wa.me/919818946081"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 bg-[#25d366] rounded-full flex justify-center items-center text-white shadow-sm"
              aria-label="Chat on WhatsApp"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
              </svg>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 hover:text-accent focus:outline-none p-1"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`xl:hidden bg-white border-b border-slate-200 flex flex-col gap-4 text-sm font-semibold text-slate-800 shadow-inner z-40 absolute w-full left-0 transition-all duration-305 ease-in-out ${isMobileMenuOpen
          ? 'max-h-[500px] py-4 px-6 opacity-100 visible'
          : 'max-h-0 py-0 px-6 opacity-0 invisible overflow-hidden'
          }`}
      >
        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `hover:text-accent transition-colors py-1.5 border-b border-slate-100 ${isActive ? 'text-accent font-extrabold' : 'text-slate-800'}`}>Home</NavLink>
        <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `hover:text-accent transition-colors py-1.5 border-b border-slate-100 ${isActive ? 'text-accent font-extrabold' : 'text-slate-800'}`}>About Us</NavLink>
        <NavLink to="/collections" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `hover:text-accent transition-colors py-1.5 border-b border-slate-100 ${isActive ? 'text-accent font-extrabold' : 'text-slate-800'}`}>Our Product</NavLink>
        <NavLink to="/custom-order" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `hover:text-accent transition-colors py-1.5 border-b border-slate-100 ${isActive ? 'text-accent font-extrabold' : 'text-slate-800'}`}>Custom Orders</NavLink>
        <NavLink to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `hover:text-accent transition-colors py-1.5 border-b border-slate-100 ${isActive ? 'text-accent font-extrabold' : 'text-slate-800'}`}>Gallery</NavLink>
        <NavLink to="/blogs" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `hover:text-accent transition-colors py-1.5 border-b border-slate-100 ${isActive ? 'text-accent font-extrabold' : 'text-slate-800'}`}>Blogs</NavLink>
        <NavLink to="/our-clients" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `hover:text-accent transition-colors py-1.5 border-b border-slate-100 ${isActive ? 'text-accent font-extrabold' : 'text-slate-800'}`}>Our Clients</NavLink>
        <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `hover:text-accent transition-colors py-1.5 border-b border-slate-100 ${isActive ? 'text-accent font-extrabold' : 'text-slate-800'}`}>Contact</NavLink>

        <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="tel:+919811066081"
              className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors text-center"
            >
              📞 Call
            </a>
            <a
              href="https://wa.me/919818946081"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg transition-colors text-center"
            >
              💬 WhatsApp
            </a>
          </div>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center py-2.5 bg-[#0E0E3B] text-xs font-bold uppercase tracking-wider text-white rounded"
          >
            REQUEST CATALOGUE
          </Link>
        </div>
      </div>
    </header>
  );
}
