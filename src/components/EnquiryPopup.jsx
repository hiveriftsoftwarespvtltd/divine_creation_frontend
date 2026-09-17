import React, { useState } from 'react';

export default function EnquiryPopup({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !subject) return;

    onSubmit({
      name,
      phone,
      email,
      subject,
      message
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      {/* Backdrop close trigger */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Dialog Card Container */}
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-12 text-slate-800">

        {/* Absolute Close Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors z-20 cursor-pointer"
          aria-label="Close form"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Column Left (Highlights) */}
        <div className="md:col-span-5 bg-slate-50/80 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 text-left">

          {/* Header Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-[#EE3A57]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-6-9-6zm0 18l-9-5 1.41-1.41L12 18.17l7.59-4.58L21 15l-9 6z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest">Enquiry Desk</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Send Enquiry
            </h2>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Please fill in the details below. Our corporate gifting representative will get back to you shortly.
            </p>
          </div>

          {/* Badges footer list */}
          <div className="grid grid-cols-4 gap-2 pt-6">
            {[
              { label: '100% Secure', desc: 'Enquiry', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { label: 'Quick', desc: 'Response', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { label: 'Best Price', desc: 'Guarantee', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'Pan India', desc: 'Delivery', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' }
            ].map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-1">
                <span className="p-1.5 bg-[#cca040]/10 text-[#cca040] rounded-lg shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                  </svg>
                </span>
                <span className="text-[8px] font-black text-slate-800 uppercase tracking-tight leading-none">{badge.label}</span>
                <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-tight leading-none">{badge.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column Right (Form inputs area) */}
        <form onSubmit={handleSubmit} className="md:col-span-7 p-6 sm:p-8 space-y-5 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#EE3A57] rounded-xl px-3 py-2.5 text-xs text-slate-850 focus:outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Your Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#EE3A57] rounded-xl px-3 py-2.5 text-xs text-slate-850 focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#EE3A57] rounded-xl px-3 py-2.5 text-xs text-slate-850 focus:outline-none transition-colors"
              />
            </div>

            {/* Subject Dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#EE3A57] rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="">Select subject</option>
                <option value="Corporate Gifting">Corporate Gifting</option>
                <option value="Custom Order & Branding">Custom Order & Branding</option>
                <option value="Bulk Purchase">Bulk Purchase</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>

            {/* Your Requirement Details Textarea */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Your Requirement Details
              </label>
              <textarea
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your requirement details..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#EE3A57] rounded-xl px-3 py-2.5 text-xs text-slate-850 focus:outline-none transition-colors leading-relaxed"
              />
            </div>
          </div>

          {/* Submit stack */}
          <div className="space-y-3 pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Submit Enquiry
            </button>
            <p className="text-[10px] text-slate-400 font-semibold text-center">
              🔒 We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
