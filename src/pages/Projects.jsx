import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import DynamicPageHero from '../components/DynamicPageHero';
import clinthero from '../assets/a (6).png';
import clintmobilehero from '../assets/clintmobilehero.png';

export default function Projects() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.clients.getAll()
      .then(data => {
        if (Array.isArray(data)) {
          setClients(data);
        }
      })
      .catch(err => console.error("Failed to load clients list:", err))
      .finally(() => setLoading(false));
  }, []);

  const displayClients = clients;

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Dynamic Hero Banner Section */}
      <DynamicPageHero
        pageKey="clients"
        fallbackDesktop={clinthero}
        fallbackMobile={clintmobilehero}
        defaultTitle="Our Esteemed Corporate Clients"
        defaultSubtitle="Trusted by Government Ministries, Multinationals & Leading Enterprises Across India"
      />

      {/* Main Clients Grid Section */}
      <div className="max-w-[1450px] mx-auto py-12 sm:py-20 px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3.5 max-w-[700px] mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 relative inline-block">
            Our Prestigious Clients
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium pt-3">
            We are honored to have crafted custom designs, sculptures, and corporate gifting solutions for government institutions, embassies, corporate giants, and retail destinations.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 pt-4">
          {displayClients.map((client, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-100/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#EE3A57]/40 transition-all duration-300 flex flex-col items-center justify-between min-h-[170px]"
            >
              {/* Logo Image wrapper */}
              <div className="w-full flex-grow flex items-center justify-center p-2.5">
                <img
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  className="max-h-16 sm:max-h-20 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Client Name text */}
              <h4 className="text-slate-700 text-center text-[10.5px] sm:text-xs font-bold leading-tight tracking-wide mt-4 w-full group-hover:text-[#EE3A57] transition-colors border-t border-slate-50 pt-3">
                {client.name}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Become Our Next Client Banner */}
      <div className="max-w-[1450px] mx-auto pb-16 px-4 sm:px-6 lg:px-12">
        <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
          
          {/* Left Side: Handshake Icon & Content */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
            {/* Red Handshake outline badge */}
            <div className="w-16 h-16 rounded-full border-2 border-[#EE3A57] flex items-center justify-center shrink-0 bg-[#EE3A57]/10">
              <svg className="w-8 h-8 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-8.25-.44l-.3-.3a1.5 1.5 0 010-2.12l1.63-1.63a3 3 0 014.24 0l1.63 1.63a1.5 1.5 0 010 2.12l-.3.3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V6M8.22 10.78L6 8.56M15.78 10.78l2.22-2.22" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 14v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4" />
              </svg>
            </div>
            
            {/* Text details */}
            <div className="space-y-1">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                Become Our Next Client
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-medium max-w-[620px]">
                Join 1000+ satisfied clients who trust Divine Creations for quality, creativity and reliability.
              </p>
            </div>
          </div>
          
          {/* Right Side: Get in Touch Button */}
          <div className="shrink-0 w-full md:w-auto text-center">
            <a
              href="/contact"
              className="inline-block w-full md:w-auto px-7 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs sm:text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-[1.02]"
            >
              Get In Touch
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
