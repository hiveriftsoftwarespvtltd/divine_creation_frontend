import React from 'react';

const features = [
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
    title: 'Premium',
    subtitle: 'Quality',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Custom',
    subtitle: 'Manufacturing',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94L14.7 6.3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.3 14.7L6.3 17.7M17.7 6.3l-3 3" />
      </svg>
    ),
  },
  {
    title: 'Timely',
    subtitle: 'Delivery',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Trusted by',
    subtitle: 'Businesses',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Best After Sales',
    subtitle: 'Support',
    icon: (
      <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function FeaturesBar() {
  return (
    <section className="bg-white py-6 sm:py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1550px] mx-auto bg-[#faf8f5]/60 border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0 items-center justify-center lg:divide-x lg:divide-slate-200/80">
          
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 px-2 md:px-4 lg:px-6 justify-start lg:justify-center"
            >
              {/* Icon */}
              <div className="shrink-0 flex items-center justify-center">
                {feat.icon}
              </div>
              
              {/* Text */}
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-800 text-[13.5px] sm:text-[14px] leading-tight">
                  {feat.title}
                </h4>
                <p className="text-[11.5px] text-slate-500 font-medium leading-tight">
                  {feat.subtitle}
                </p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
