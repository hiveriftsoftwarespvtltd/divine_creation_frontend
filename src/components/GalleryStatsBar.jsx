import React from 'react';

const stats = [
  {
    title: '500+',
    subtitle: 'Unique Designs',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.003 9.003 0 018.716 6.747M12 3a9.003 9.003 0 00-8.716 6.747M3 12h18" />
      </svg>
    ),
  },
  {
    title: '1000+',
    subtitle: 'Projects Completed',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: '150+',
    subtitle: 'Happy Clients',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: '20+',
    subtitle: 'Cities Served',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: '10+',
    subtitle: 'Years of Experience',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: '100%',
    subtitle: 'Customer Satisfaction',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

export default function GalleryStatsBar() {
  return (
    <div className="max-w-[1450px] mx-auto bg-[#faf8f5] border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0 items-center justify-center lg:divide-x lg:divide-slate-200/80">
        
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 px-2 md:px-4 lg:px-6 justify-start lg:justify-center"
          >
            {/* Icon */}
            <div className="shrink-0 flex items-center justify-center">
              {stat.icon}
            </div>
            
            {/* Text */}
            <div className="space-y-0.5 text-left">
              <h4 className="font-serif text-[17px] font-bold text-slate-800 leading-tight">
                {stat.title}
              </h4>
              <p className="text-[11.5px] text-slate-500 font-medium leading-tight">
                {stat.subtitle}
              </p>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}
