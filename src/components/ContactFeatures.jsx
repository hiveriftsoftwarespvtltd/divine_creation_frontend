import React from 'react';

const contactFeaturesList = [
  {
    title: '100% Quality',
    description: 'Premium materials & fine craftsmanship',
    icon: (
      <svg className="w-10 h-10 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="1.8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 2.4 3.4-.6.6 3.4 2.4 2.4-1.8 3 1.8 3-2.4 2.4-.6 3.4-3.4-.6-2.4 2.4-2.4-2.4-3.4.6-.6-3.4-2.4-2.4 1.8-3-1.8-3 2.4-2.4.6-3.4 3.4.6L12 2z" />
      </svg>
    )
  },
  {
    title: 'Custom Designs',
    description: 'We create as per your imagination',
    icon: (
      <svg className="w-10 h-10 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <circle cx="11" cy="13" r="6.5" strokeDasharray="3 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.24 4.76a2 2 0 112.83 2.83L8 17.66l-4 1 1-4L15.24 4.76z" />
      </svg>
    )
  },
  {
    title: 'Bulk Orders',
    description: 'Special pricing for bulk requirements',
    icon: (
      <svg className="w-10 h-10 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        {/* Box 1 (top center) */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L7 5v5.5l5 3 5-3V5l-5-3zM7 5l5 3 5-3M12 8v5.5" />
        {/* Box 2 (bottom left) */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 10.5L2 13.5v5.5l5 3 5-3v-5.5l-5-3zM2 13.5l5 3 5-3M7 16.5v5.5" />
        {/* Box 3 (bottom right) */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 10.5l-5 3v5.5l5 3 5-3v-5.5l-5-3zM12 13.5l5 3 5-3M17 16.5v5.5" />
      </svg>
    )
  },
  {
    title: 'Pan India Delivery',
    description: 'Safe & timely delivery across India',
    icon: (
      <svg className="w-10 h-10 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h11v7H3V8zM14 9.5h4.5l2.5 2.5v3h-7v-5.5zM6 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1 11h2M1.5 13h1.5" />
      </svg>
    )
  },
  {
    title: 'Reliable Support',
    description: 'We are always here to help you',
    icon: (
      <svg className="w-10 h-10 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12v6c0 1.1.9 2 2 2h2v-8H4v-2c0-4.41 3.59-8 8-8s8 4.41 8 8v2h-2v8h2c1.1 0 2-.9 2-2v-6c0-5.52-4.48-10-10-10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 16a2 2 0 012 2v2a2 2 0 01-2 2h-2v-6h2zM6 16H4a2 2 0 00-2 2v2a2 2 0 002 2h2v-6z" />
      </svg>
    )
  }
];

export default function ContactFeatures() {
  return (
    <section className="w-full bg-[#faf8f5]/40 py-10 px-4 sm:px-6 lg:px-12 border-t border-slate-100/80">
      <div className="max-w-[1450px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
          {contactFeaturesList.map((feat, index) => (
            <div key={index} className="flex items-center gap-4 text-left">
              {/* Icon */}
              <div className="shrink-0 flex items-center justify-center">
                {feat.icon}
              </div>

              {/* Content */}
              <div className="space-y-0.5">
                <h4 className="text-slate-800 text-[13.5px] font-extrabold tracking-wide">
                  {feat.title}
                </h4>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed max-w-[200px]">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
