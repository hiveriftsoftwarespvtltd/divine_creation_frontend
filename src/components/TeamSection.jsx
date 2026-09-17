import React from 'react';

const teamMembers = [
  {
    name: 'Rajeev Malhotra',
    role: 'Founder & Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&q=80',
  },
  {
    name: 'Anita Sharma',
    role: 'Design Head',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face&q=80',
  },
  {
    name: 'Vikram Singh',
    role: 'Production Head',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&q=80',
  },
  {
    name: 'Meera Jain',
    role: 'Craftsmanship Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&q=80',
  },
  {
    name: 'Suresh Yadav',
    role: 'Quality Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&q=80',
  },
];

export default function TeamSection() {
  return (
    <section className="bg-[#faf8f5] py-14 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-slate-200 overflow-hidden">
      <div className="max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Side: Team Grid (65% width on desktop) */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* Header */}
            <div className="space-y-2 text-left">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.28em] text-accent block">
                MEET OUR TEAM
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                Passionate People, <span className="text-accent">Exceptional Art</span>
              </h2>
              <div className="h-[2px] w-12 bg-accent/40 rounded-full" />
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4 md:gap-6 justify-center">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  {/* Portrait with Golden Ring Frame */}
                  <div className="relative w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-[2px] bg-gradient-to-tr from-accent/30 via-accent/80 to-accent/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <div className="w-full h-full rounded-full p-1 bg-white">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Name and Role */}
                  <div className="mt-4">
                    <h4 className="text-[13px] sm:text-xs md:text-[13.5px] font-bold text-slate-800 leading-snug">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side: Mission Quote Card (35% width on desktop) */}
          <div className="lg:col-span-4 h-full flex items-center">
            <div className="relative w-full bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100/50 overflow-hidden flex flex-col justify-between min-h-[220px] md:min-h-[260px] group hover:shadow-lg transition-shadow duration-300">
              
              {/* Subtle Mandala Watermark on bottom right */}
              <div className="absolute right-0 bottom-0 w-[140px] h-[140px] opacity-[0.06] pointer-events-none translate-x-4 translate-y-4">
                <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-accent">
                  <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1"/>
                  {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => (
                    <line key={deg} x1="100" y1="10" x2="100" y2="190"
                      stroke="currentColor" strokeWidth="0.5"
                      transform={`rotate(${deg} 100 100)`}
                    />
                  ))}
                </svg>
              </div>
              
              {/* Quote Icon */}
              <div className="text-4xl sm:text-5xl font-serif text-accent leading-none">
                “
              </div>
              
              {/* Quote Text */}
              <p className="font-sans text-slate-700 text-[13px] sm:text-sm leading-relaxed my-4 z-10">
                Our mission is simple – to keep the rich heritage of Indian craftsmanship alive and share it with the world through unique, meaningful creations.
              </p>
              
              {/* Divider & Author */}
              <div className="space-y-2 z-10">
                <div className="h-[2px] w-6 bg-accent rounded-full" />
                <div>
                  <h4 className="text-[13px] sm:text-xs md:text-[13.5px] font-bold text-slate-800 leading-none">
                    Rajeev Malhotra
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Founder & Director
                  </p>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
