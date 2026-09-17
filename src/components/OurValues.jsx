import React from 'react';

const values = [
  {
    title: ['Authentic', 'Craftsmanship'],
    desc: 'Time-honoured techniques crafted by skilled artisans with passion.',
    iconColor: '#F05A28',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9">
        {/* Outline craftsman working with hands */}
        <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        <path d="M12 13c-3.3 0-6 1.8-6 5v2h12v-2c0-3.2-2.7-5-6-5z" />
        <path d="M8 8h8M9 6h6" />
      </svg>
    ),
  },
  {
    title: ['Premium', 'Quality'],
    desc: 'Top-grade materials and meticulous attention to every detail.',
    iconColor: '#ED1E79',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9">
        {/* Star Badge outline */}
        <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" />
        <path d="M12 7.5l1.2 2.6 2.8.4-2 2 0.5 2.8-2.5-1.3-2.5 1.3 0.5-2.8-2-2 2.8-.4z" />
      </svg>
    ),
  },
  {
    title: ['Custom', 'Solutions'],
    desc: 'Tailor-made designs that reflect your vision and spiritual essence.',
    iconColor: '#F7931E',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9">
        {/* Customized solutions gear */}
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    title: ['Ethical &', 'Sustainable'],
    desc: 'We follow responsible practices for people and the planet.',
    iconColor: '#00A896',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9">
        {/* Shield with leaf outline */}
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8c-1.5 1-2 2.5-2 4a3 3 0 0 0 5.2 2" />
      </svg>
    ),
  },
  {
    title: ['Timely', 'Delivery'],
    desc: 'Commitment to quality and on-time delivery, every time.',
    iconColor: '#C89B3C',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9">
        {/* Clock timer/box outline */}
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: ['Dedicated', 'Support'],
    desc: 'We are with you from concept to creation and beyond.',
    iconColor: '#F15A24',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9">
        {/* Customer support headset outline */}
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
];

export default function OurValues() {
  return (
    <section className="bg-[#FAF8F5] py-14 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-slate-200">
      <div className="max-w-[1750px] mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 space-y-2">
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.28em] text-[#EE3A57] block">
            What Defines Us
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-bold text-slate-900 leading-tight">
            Our Values, Your Trust
          </h2>
          {/* Logo theme flourish divider line */}
          <div className="flex items-center justify-center gap-4 pt-3 max-w-[280px] mx-auto">
            <div className="h-[2px] flex-grow bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
            <span className="text-[#EE3A57] text-xs font-serif">✥</span>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-[#2563EB] to-[#EE3A57] rounded-full" />
          </div>
        </div>

        {/* Values Row with vertical dividers, no cards, text-left */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-8 lg:gap-0">
          {values.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col gap-2 px-4 lg:px-5 lg:border-r lg:border-slate-200/80 last:lg:border-r-0 cursor-default text-left"
            >
              {/* Header: Icon & Title side-by-side */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <h3 className="text-[14px] sm:text-[15px] font-serif font-bold text-slate-800 leading-snug">
                  <span className="lg:hidden">{item.title.join(' ')}</span>
                  <span className="hidden lg:block">
                    {item.title.map((line, lIdx) => (
                      <span key={lIdx} className="block">{line}</span>
                    ))}
                  </span>
                </h3>
              </div>

              {/* Description below */}
              <p className="text-[13px] sm:text-[13.5px] md:text-[15px] lg:text-[17px] font-normal text-slate-500 leading-relaxed mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
