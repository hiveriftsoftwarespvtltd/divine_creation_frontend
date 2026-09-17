import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    file: null
  });
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    api.content.get()
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load contact settings:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email || '');
      formData.append('subject', form.subject || 'General Contact Enquiry');
      formData.append('message', form.message || '');
      if (form.file) {
        formData.append('image', form.file);
      }
      await api.enquiries.create(formData);

      // Construct and open WhatsApp url
      const waMessage = `Hi! I want to enquire about "${form.subject || 'General Enquiry'}".\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email}\n*Requirement:* ${form.message}`;
      const waUrl = `https://wa.me/919818946081?text=${encodeURIComponent(waMessage)}`;

      setSubmitted(true);

      // Redirect in new tab
      window.open(waUrl, '_blank');

      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', phone: '', email: '', subject: '', message: '', file: null });
      }, 4000);
    } catch (err) {
      alert("Failed to submit enquiry: " + err.message);
    }
  };

  return (
    <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-12 py-6 .">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

        {/* ================= COLUMN 1: Get In Touch (col-span-3) ================= */}
        <div className="lg:col-span-3 space-y-6">
          <div className="border-b border-slate-100 pb-2 text-left">
            <h2 className="font-serif text-lg font-bold text-slate-800 relative inline-block">
              Get In Touch
              <div className="absolute -bottom-2.5 left-0 w-12 h-[2px] bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
            </h2>
          </div>

          <div className="space-y-4">
            {/* Card 1: Call Us */}
            <div className="bg-[#faf8f5]/60 border border-slate-100/80 rounded-2xl p-4.5 flex gap-4 items-start shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Call Us (Direct)</span>
                <a href={`tel:${(content?.phone || '+91 98110 66081').replace(/[^0-9+]/g, '')}`} className="text-slate-800 text-[13px] font-bold block hover:text-[#EE3A57] transition-colors">
                  {content?.phone || '+91 98110 66081'}
                </a>
                <span className="text-[11px] text-slate-400 font-medium block">Mon - Sat: 10:00 AM - 7:00 PM</span>
              </div>
            </div>

            {/* Card 2: Email Us */}
            <div className="bg-[#faf8f5]/60 border border-slate-100/80 rounded-2xl p-4.5 flex gap-4 items-start shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Email Us</span>
                <a href={`mailto:${content?.email || 'info@divinecreations.com'}`} className="text-slate-800 text-[13px] font-bold block hover:text-[#EE3A57] transition-colors break-all">
                  {content?.email || 'info@divinecreations.com'}
                </a>
                <span className="text-[11px] text-slate-400 font-medium block">We reply within 24 hours</span>
              </div>
            </div>

            {/* Card 3: Address */}
            <div className="bg-[#faf8f5]/60 border border-slate-100/80 rounded-2xl p-4.5 flex gap-4 items-start shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Address</span>
                <p className="text-slate-800 text-[12.5px] font-medium leading-relaxed">
                  {content?.address || 'Office: E-285, Terrace Floor, Naraina Vihar, New Delhi | Factory: S-46, Badli Industrial Estate, Delhi'}
                </p>
                <a
                  href="https://maps.google.com/?q=Divine+Creations+Naraina+Vihar+New+Delhi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#EE3A57] text-[11px] font-bold hover:underline"
                >
                  Get Directions &rarr;
                </a>
              </div>
            </div>

            {/* Card 4: WhatsApp */}
            <div className="bg-[#faf8f5]/60 border border-slate-100/80 rounded-2xl p-4.5 flex gap-4 items-start shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center shrink-0">
                <svg className="w-5.5 h-5.5 text-[#EE3A57] fill-current" viewBox="0 0 24 24">
                  <path d="M12.004 0C5.378 0 0 5.373 0 12.001c.002 2.115.552 4.178 1.6 6.002L.057 24l6.155-1.616c1.782.972 3.791 1.488 5.82 1.49h.005c6.627 0 12.003-5.373 12.003-12.001C24.04 5.373 18.631 0 12.004 0zm0 22.02c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.79.99 1.01-3.69-.24-.38a9.98 9.98 0 0 1-1.52-5.33c.003-5.52 4.5-10.01 10.02-10.01 2.67 0 5.19 1.04 7.08 2.93a9.91 9.91 0 0 1 2.93 7.09c-.003 5.53-4.5 10.02-10.02 10.02z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">WhatsApp Chat</span>
                <a
                  href="https://wa.me/919818946081"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-800 text-[13px] font-bold block hover:text-emerald-600 transition-colors"
                >
                  +91 98189 46081
                </a>
                <a
                  href="https://wa.me/919818946081"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 text-[11px] font-bold hover:underline block"
                >
                  Click to Chat on WhatsApp &rarr;
                </a>
              </div>
            </div>

            {/* Card 5: Director & Firm Info */}
            <div className="bg-[#faf8f5]/60 border border-slate-100/80 rounded-2xl p-4.5 flex gap-4 items-start shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0E0E3B] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0H7m4 0h4" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Leadership & Firm</span>
                <p className="text-slate-800 text-[12px] font-bold">JagMohan Ahuja <span className="text-slate-500 font-normal">(President)</span></p>
                <p className="text-slate-800 text-[12px] font-bold">M Ahuja / Mrs. Vibha Ahuja <span className="text-slate-500 font-normal">(Directors)</span></p>
                <p className="text-slate-500 text-[11px] font-medium">Proprietorship | Est. 2007 | GST Reg. 2017</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: Send Us a Message (col-span-6) ================= */}
        <div className="lg:col-span-6 space-y-6">
          <div className="border-b border-slate-100 pb-2 text-left">
            <h2 className="font-serif text-lg font-bold text-slate-800 relative inline-block">
              Send Us a Message
              <div className="absolute -bottom-2.5 left-0 w-12 h-[2px] bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-3 rounded-xl transition-all">
                ✓ Message sent successfully! Our team will get back to you shortly.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 tracking-wide uppercase">Your Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-[#EE3A57] rounded-xl px-4.5 py-3 text-xs text-slate-800 focus:outline-none transition-colors shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 tracking-wide uppercase">Your Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-[#EE3A57] rounded-xl px-4.5 py-3 text-xs text-slate-800 focus:outline-none transition-colors shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 tracking-wide uppercase">Your Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-[#EE3A57] rounded-xl px-4.5 py-3 text-xs text-slate-800 focus:outline-none transition-colors shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 tracking-wide uppercase">Subject <span className="text-red-500">*</span></label>
                <select
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-[#EE3A57] rounded-xl px-4.5 py-3.5 text-xs text-slate-800 focus:outline-none transition-colors shadow-sm cursor-pointer"
                >
                  <option value="">Select subject</option>
                  <option value="Corporate Gift Quote">Corporate Gift Quote</option>
                  <option value="Drinkware & Flasks Inquiry">Drinkware & Flasks Inquiry</option>
                  <option value="Bulk Gift Set Inquiry">Bulk Gift Set Inquiry</option>
                  <option value="Trophies & Mementos Quote">Trophies & Mementos Quote</option>
                  <option value="Custom Branding Inquiry">Custom Branding Inquiry</option>
                  <option value="Other Query">Other Query</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 tracking-wide uppercase">Your Requirement Details</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                placeholder="Specify target quantity, budget range, deadline, logo branding requests..."
                className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-[#EE3A57] rounded-xl p-4.5 text-xs text-slate-800 focus:outline-none transition-colors shadow-sm resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 tracking-wide uppercase block">Upload Reference Image (Optional)</label>
              <div className="w-full bg-white border border-slate-200 rounded-xl p-2 shadow-sm flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:uppercase file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Send Message
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 mt-3">
              🔒 We respect your privacy. Your information is safe with us.
            </p>
          </form>
        </div>

        {/* ================= COLUMN 3: Our Location (col-span-3) ================= */}
        <div className="lg:col-span-3 space-y-6">
          <div className="border-b border-slate-100 pb-2 text-left">
            <h2 className="font-serif text-lg font-bold text-slate-800 relative inline-block">
              Our Location
              <div className="absolute -bottom-2.5 left-0 w-12 h-[2px] bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
            </h2>
          </div>

          <div className="space-y-6 text-left">
            {/* Google Map Box */}
            <div className="w-full h-[260px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm relative">
              <iframe
                title="Divine Creations Studio Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.228!2d77.0435!3d28.6772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05e5a3b4e6f1%3A0x1a2b3c4d5e6f7a8b!2sNagloi%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Connect With Us */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-sm font-bold text-slate-800">
                  Connect With Us
                </h3>
                <p className="text-[11.5px] text-slate-500 leading-relaxed font-medium">
                  Follow us for latest updates and new collections
                </p>
              </div>

              {/* Social Icons Row */}
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/people/Divine-Creations/61592632652099/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#cca040] hover:text-[#cca040] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/divinecreations.art"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#cca040] hover:text-[#cca040] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@divinecreations"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#cca040] hover:text-[#cca040] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.556a3.003 3.003 0 00-2.11 2.107C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 002.11 2.107C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.556a3.003 3.003 0 002.11-2.107C24 15.971 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919818946081"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#cca040] hover:text-[#cca040] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
