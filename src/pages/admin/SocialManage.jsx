import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { api } from '../../utils/api';

const DEFAULT_SOCIALS = {
  facebook: '',
  instagram: '',
  youtube: '',
  whatsapp: '',
  whatsappNumber: '',
};

export default function SocialManage() {
  const [socials, setSocials] = useState(DEFAULT_SOCIALS);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSocials();
  }, []);

  const loadSocials = async () => {
    try {
      setLoading(true);
      const data = await api.socials.get();
      if (data) {
        setSocials((prev) => ({
          ...prev,
          ...data,
        }));
      }
    } catch (err) {
      console.error('Failed to load social links:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSocials((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'whatsappNumber' && value.trim()) {
        const cleaned = value.replace(/[^0-9]/g, '');
        if (cleaned.length >= 10 && (!prev.whatsapp || prev.whatsapp.startsWith('https://wa.me/'))) {
          updated.whatsapp = `https://wa.me/${cleaned}`;
        }
      }
      return updated;
    });
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsSaving(true);
      const updated = await api.socials.update(socials);
      if (updated) {
        setSocials((prev) => ({ ...prev, ...updated }));
      }
      Swal.fire({
        icon: 'success',
        title: 'Social Links Updated!',
        text: 'All social media links have been updated across the website.',
        timer: 2500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: err.message || 'Could not update social links.',
        confirmButtonColor: '#EE3A57',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    const res = await Swal.fire({
      title: 'Clear All Social Links?',
      text: 'This will clear all social media links.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EE3A57',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Yes, Clear All',
    });

    if (res.isConfirmed) {
      setSocials(DEFAULT_SOCIALS);
      try {
        await api.socials.update(DEFAULT_SOCIALS);
        Swal.fire({
          icon: 'success',
          title: 'Links Cleared',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[350px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-10 w-10 border-4 border-[#EE3A57] border-t-transparent rounded-full mx-auto" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading Social Links...</p>
        </div>
      </div>
    );
  }

  const socialPlatforms = [
    {
      key: 'facebook',
      label: 'Facebook Page URL',
      placeholder: 'https://www.facebook.com/your-page',
      color: '#1877F2',
      bg: 'bg-[#1877F2]/10',
      text: 'text-[#1877F2]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      help: 'Rendered in Header, Footer, and Contact page connect row.',
    },
    {
      key: 'instagram',
      label: 'Instagram Profile URL',
      placeholder: 'https://www.instagram.com/your-profile',
      color: '#E1306C',
      bg: 'bg-[#E1306C]/10',
      text: 'text-[#E1306C]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      help: 'Rendered in Header, Footer, and Contact page connect row.',
    },
    {
      key: 'youtube',
      label: 'YouTube Channel URL',
      placeholder: 'https://www.youtube.com/@your-channel',
      color: '#FF0000',
      bg: 'bg-[#FF0000]/10',
      text: 'text-[#FF0000]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      help: 'Video catalog and production showcase links in Header, Footer & Contact.',
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp Direct Chat URL',
      placeholder: 'https://wa.me/91XXXXXXXXXX',
      color: '#25D366',
      bg: 'bg-[#25D366]/10',
      text: 'text-[#25D366]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
        </svg>
      ),
      help: 'Format: https://wa.me/91XXXXXXXXXX (Instant chat redirection for all WhatsApp buttons).',
    },
    {
      key: 'whatsappNumber',
      label: 'WhatsApp Display Phone Number',
      placeholder: '+91 XXXXX XXXXX',
      color: '#059669',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      help: 'Shown on the Header, Footer, and Contact Us page under the WhatsApp Card.',
    },
  ];

  return (
    <div className="space-y-6 text-left text-slate-800">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EE3A57] block mb-1">
            GLOBAL SOCIAL MEDIA & CHAT CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Social Media & WhatsApp Links
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage your official Facebook, Instagram, YouTube, and WhatsApp links. Changes update immediately across the entire website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                Saving Links...
              </>
            ) : (
              'Save All Links Live'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs (7 Cols) */}
        <form onSubmit={handleSave} className="lg:col-span-8 space-y-4">
          {socialPlatforms.map((platform) => {
            const val = socials[platform.key] || '';
            return (
              <div
                key={platform.key}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${platform.bg} ${platform.text} flex items-center justify-center shrink-0`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">
                        {platform.label}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">{platform.help}</p>
                    </div>
                  </div>

                  {val && (
                    <a
                      href={val}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1 shrink-0 bg-blue-50 px-2.5 py-1 rounded-lg"
                    >
                      Test Link &rarr;
                    </a>
                  )}
                </div>

                <div className="pt-1">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleChange(platform.key, e.target.value)}
                    placeholder={platform.placeholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#EE3A57] transition-colors"
                  />
                </div>
              </div>
            );
          })}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? 'Saving Changes...' : 'Save & Publish Links Live'}
            </button>
          </div>
        </form>

        {/* Live Preview Side Box (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-5 sticky top-24">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                Active Website Preview
              </span>
              <h3 className="font-serif text-base font-bold text-slate-900">
                How Links Appear on Website
              </h3>
            </div>

            {/* Preview: Footer Social Icons */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                1. Footer Social Row Preview
              </span>
              <div className="bg-[#0E0E3B] p-4 rounded-xl flex items-center gap-2.5 flex-wrap">
                {socials.facebook && (
                  <a
                    href={socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors"
                    title="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}

                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}

                {socials.youtube && (
                  <a
                    href={socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF0000] text-white flex items-center justify-center transition-colors"
                    title="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                )}

                {socials.whatsapp && (
                  <a
                    href={socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                    title="WhatsApp"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
                    </svg>
                  </a>
                )}

         
              </div>
            </div>

            {/* Preview: Contact Page WhatsApp Card */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                2. Contact Page WhatsApp Card Preview
              </span>
              <div className="bg-[#FAF9F8] border border-slate-200 rounded-xl p-3.5 flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">WhatsApp Chat</span>
                  <span className="text-xs font-bold text-slate-800 block">
                    {socials.whatsappNumber || 'Not set'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
