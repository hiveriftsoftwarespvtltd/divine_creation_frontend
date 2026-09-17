import React, { useState } from 'react';
import { api } from '../utils/api';

export default function StudioEnquiry() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('subject', 'Studio/Project Enquiry');
      formData.append('message', `[Project Type: ${form.projectType || 'Not Specified'}] ${form.message}`);

      await api.enquiries.create(formData);

      // WhatsApp redirect integration
      const waMessage = `Hi Divine Creations!\n\nI want to submit an Enquiry:\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Phone:* ${form.phone}\n*Project Type:* ${form.projectType || 'N/A'}\n*Message:* ${form.message}`;
      const waUrl = `https://wa.me/919818946081?text=${encodeURIComponent(waMessage)}`;

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', projectType: '', message: '' });
      window.open(waUrl, '_blank');

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert('Failed to send enquiry: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-100">
      <div className="max-w-[1750px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

        {/* ===== LEFT CARD: Visit Our Studio ===== */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">

          {/* Info Details */}
          <div className="space-y-6 w-full md:w-[52%]">
            <h3 className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0A0F3E]">
              Visit Our Studio
            </h3>

            <ul className="space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3.5">
                <div className="h-5 w-5 shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-[#EE3A57] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-slate-650 leading-relaxed">
                  Office: E-285, Terrace Floor, Naraina Vihar, New Delhi<br />Factory: S-46, Badli Industrial Estate, Delhi
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3.5">
                <div className="h-5 w-5 shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#EE3A57] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 text-[11px] sm:text-xs">
                  <a href="tel:+919811066081" className="font-semibold text-slate-800 hover:text-[#EE3A57] transition-colors">
                    Call: +91 98110 66081
                  </a>
                  <span className="hidden sm:inline text-slate-300">|</span>
                  <a href="https://wa.me/919818946081" target="_blank" rel="noreferrer" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    WhatsApp: +91 98189 46081
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3.5">
                <div className="h-5 w-5 shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#EE3A57] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-650">
                  info@divinecreations.com
                </span>
              </li>

              {/* Working Hours */}
              <li className="flex items-center gap-3.5">
                <div className="h-5 w-5 shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#C89B3C] fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-slate-650">
                  Mon - Sat: 10:00 AM - 7:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Map Frame Container */}
          <div className="w-full md:w-[45%] h-[200px] sm:h-[220px] rounded-2xl overflow-hidden border-4 border-white shadow-sm shrink-0">
            <iframe
              title="Divine Creations Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5647573030386!2d77.03964951167448!3d28.672740232145892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05a415ffad03%3A0xc3fa59ab73d3ea7!2sSafipur%20%2F%20Ranhola!5e0!3m2!1sen!2sin!4v1719940000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* ===== RIGHT CARD: Send Us An Enquiry ===== */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">

          <div className="space-y-4">
            <h3 className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0A0F3E]">
              Send Us An Enquiry
            </h3>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs font-semibold px-4 py-2.5 rounded-xl text-center">
                ✓ Enquiry submitted! Opening WhatsApp chat window...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Row 1: Name, Email, Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#EE3A57] placeholder-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#EE3A57] placeholder-slate-400"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#EE3A57] placeholder-slate-400"
                />
              </div>

              {/* Row 2: Project Type, Message */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Custom Styled Select wrapper */}
                <div className="relative">
                  <select
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200/80 rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm text-slate-500 focus:outline-none focus:border-[#EE3A57] appearance-none cursor-pointer"
                  >
                    <option value="" disabled hidden>Select Requirement Type</option>
                    <option value="Corporate Gift Sets">Corporate Gift Sets</option>
                    <option value="Drinkware & Vacuum Flasks">Drinkware & Vacuum Flasks</option>
                    <option value="Trophies & Award Mementos">Trophies & Award Mementos</option>
                    <option value="Executive Notebooks & Diaries">Executive Notebooks & Diaries</option>
                    <option value="Wall Clocks & Homeware">Wall Clocks & Homeware</option>
                    <option value="Bar & Desktop Accessories">Bar & Desktop Accessories</option>
                    <option value="Custom Corporate Solutions">Custom Corporate Branding</option>
                  </select>
                  {/* Chevron Down Icon */}
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Message Text Input spans 2 columns */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#EE3A57] placeholder-slate-400"
                  />
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] disabled:opacity-60 text-white font-extrabold uppercase tracking-widest text-[10px] sm:text-xs rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
