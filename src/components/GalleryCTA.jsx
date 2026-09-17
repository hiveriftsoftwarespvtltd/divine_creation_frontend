import React from 'react';

export default function GalleryCTA() {
  return (
    <section className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1450px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

          {/* LEFT: Want Full Catalogue? */}
          <div className="bg-[#faf8f5] border border-slate-100/80 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div className="flex gap-4 items-start text-left">
              <div className="shrink-0 pt-1">
                <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-[17px] font-bold text-slate-800">
                  Want Full Catalogue?
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[240px]">
                  Download our premium collection catalogue in PDF format.
                </p>
                <div className="pt-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#EE3A57]/60 hover:bg-[#EE3A57]/10 text-slate-800 text-[10.5px] font-bold uppercase tracking-wider rounded-xl transition-all"
                  >
                    Download Catalogue
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE: Looking for Something Custom? */}
          <div className="bg-[#faf8f5] border border-slate-100/80 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div className="flex gap-4 items-start text-left">
              <div className="shrink-0 pt-1">
                <svg className="w-9 h-9 text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-[17px] font-bold text-slate-800">
                  Looking for Something Custom?
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[240px]">
                  We create custom masterpieces as per your requirement.
                </p>
                <div className="pt-3">
                  <a
                    href="/custom-order"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#2563EB]/60 hover:bg-[#2563EB]/10 text-slate-800 text-[10.5px] font-bold uppercase tracking-wider rounded-xl transition-all"
                  >
                    Request Custom Design
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Need Help? Solid Navy Block */}
          <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 shadow-md flex flex-col justify-between border border-slate-800">
            <div className="flex gap-4 items-start text-left">
              <div className="shrink-0 pt-1">
                <svg className="w-9 h-9 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-[17px] font-bold text-white">
                  Need Help?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-[240px]">
                  Talk to our expert for guidance & assistance.
                </p>
                <div className="pt-3 flex flex-wrap gap-2.5">
                  <a
                    href="tel:+919811066081"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-[10.5px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                  >
                    📞 Call +91 98110 66081
                  </a>
                  <a
                    href="https://wa.me/919818946081"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                  >
                    💬 WhatsApp +91 98189 46081
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
