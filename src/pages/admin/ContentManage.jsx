import React, { useState, useEffect } from 'react';

// Import default hero assets for active fallback previews
import slide1 from '../../assets/slide1.png';
import mobilehero from '../../assets/mobilehero.png';
import aboutusshero from '../../assets/aboutusshero.png';
import aboutusmobile from '../../assets/aboutusmobile.png';
import ourproducthero from '../../assets/ourproducthero.png';
import productmobilehero from '../../assets/productmobilehero.png';
import customDesignBannerBg from '../../assets/custom_design_banner_bg.png';
import galleryHero from '../../assets/gallery.png';
import galleryMobileHero from '../../assets/gallerymobile.png';
import clinthero from '../../assets/clinthero.png';
import clintmobilehero from '../../assets/clintmobilehero.png';
import contacthero from '../../assets/contacthero.png';
import contactmobile from '../../assets/contactmobile.png';

const PAGES_LIST = [
  { key: 'home', label: 'Home Page ( / )' },
  { key: 'about', label: 'About Us ( /about )' },
  { key: 'collections', label: 'Our Products ( /collections )' },
  { key: 'customOrder', label: 'Custom Orders ( /custom-order )' },
  { key: 'gallery', label: 'Gallery ( /gallery )' },
  { key: 'blogs', label: 'Blogs ( /blogs )' },
  { key: 'clients', label: 'Our Clients ( /our-clients )' },
  { key: 'contact', label: 'Contact Us ( /contact )' },
];

const DEFAULT_PAGE_HEROES = {
  home: {
    title: 'Corporate & Promotional Gift Items',
    subtitle: 'Executive Gift Sets, Drinkware, Trophies & Customized Branding Solutions',
    image: slide1,
    mobileImage: mobilehero
  },
  about: {
    title: 'About Divine Creations',
    subtitle: 'Pioneers in Executive Corporate Gifting, Custom Laser Engraving & Metal Craftsmanship Since 2007',
    image: aboutusshero,
    mobileImage: aboutusmobile
  },
  collections: {
    title: 'Our Corporate Collections & Gift Catalog',
    subtitle: 'Explore Premier Executive Gift Sets, Stainless Steel Vacuum Flasks, Trophies & Office Accessories',
    image: ourproducthero,
    mobileImage: productmobilehero
  },
  customOrder: {
    title: 'Custom Manufacturing & Bespoke Orders',
    subtitle: 'Turn Your Vision Into Reality with Tailor-made Designs, Custom Laser Logo Engraving & Bulk Production',
    image: customDesignBannerBg,
    mobileImage: mobilehero
  },
  gallery: {
    title: 'Divine Creations Craft Gallery',
    subtitle: 'Visual Showcase of Precision Engraved Drinkware, Notebooks & Corporate Packaging',
    image: galleryHero,
    mobileImage: galleryMobileHero
  },
  blogs: {
    title: 'Our Blogs & Corporate Gifting Insights',
    subtitle: 'Discover Expert Insights, Corporate Gifting Trends & Custom Branding Strategies from Divine Creations',
    image: galleryHero,
    mobileImage: galleryMobileHero
  },
  clients: {
    title: 'Our Esteemed Corporate Clients',
    subtitle: 'Trusted by Government Ministries, Multinationals & Leading Enterprises Across India',
    image: clinthero,
    mobileImage: clintmobilehero
  },
  contact: {
    title: 'Contact Divine Creations Studio',
    subtitle: 'Reach Out for Custom Quotes, Bulk Wholesale Inquiries & Sample Requests',
    image: contacthero,
    mobileImage: contactmobile
  }
};

export default function ContentManage({ content = {}, onSaveContent, onSaveHero }) {
  // General Info
  const [address, setAddress] = useState(content.address || '');
  const [email, setEmail] = useState(content.email || '');
  const [phone, setPhone] = useState(content.phone || '');
  const [storyTitle, setStoryTitle] = useState(content.storyTitle || '');
  const [storyText1, setStoryText1] = useState(content.storyText1 || '');
  const [storyText2, setStoryText2] = useState(content.storyText2 || '');

  // Active Tab: 'heroes' or 'general'
  const [activeSection, setActiveSection] = useState('heroes');

  // Hero Section Editor State
  const [selectedPage, setSelectedPage] = useState('home');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [heroMobileImage, setHeroMobileImage] = useState('');
  const [heroMobileImageFile, setHeroMobileImageFile] = useState(null);
  const [isHeroSaving, setIsHeroSaving] = useState(false);
  const [heroSaveSuccess, setHeroSaveSuccess] = useState(false);
  const [generalSaveSuccess, setGeneralSaveSuccess] = useState(false);

  // Sync content prop when loaded
  useEffect(() => {
    if (content) {
      setAddress(content.address || 'Office: E-285, Terrace Floor, Naraina Vihar, New Delhi | Factory: S-46, Badli Industrial Estate, Delhi');
      setEmail(content.email || 'info@divinecreations.com');
      setPhone(content.phone || '+91 98110 66081');
      setStoryTitle(content.storyTitle || 'Quality is a Culture, Service a Tradition');
      setStoryText1(content.storyText1 || 'Established in 2007 under the guidance of Mrs. Vibha Ahuja and JagMohan Ahuja (President), Divine Creations is a premier manufacturer, trader, and exporter of Corporate & Promotional Gift Items...');
      setStoryText2(content.storyText2 || 'Our state-of-the-art facility at Badli Industrial Estate features Laser Engraving, Metal Marking...');
    }
  }, [content]);

  // Sync active page hero inputs when selectedPage or content changes
  useEffect(() => {
    const pageHeroData = content?.pageHeroes?.[selectedPage] ||
      content?.pageHeroes?.[selectedPage === 'customOrder' ? 'custom-order' : selectedPage] || {};
    const fallback = DEFAULT_PAGE_HEROES[selectedPage] || DEFAULT_PAGE_HEROES['home'];

    setHeroTitle(pageHeroData.title !== undefined ? pageHeroData.title : fallback.title);
    setHeroSubtitle(pageHeroData.subtitle !== undefined ? pageHeroData.subtitle : fallback.subtitle);
    setHeroImage(pageHeroData.image || fallback.image);
    setHeroImageFile(null);
    setHeroMobileImage(pageHeroData.mobileImage || fallback.mobileImage);
    setHeroMobileImageFile(null);
  }, [selectedPage, content]);

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    onSaveContent({
      address,
      email,
      phone,
      storyTitle,
      storyText1,
      storyText2
    });
    setGeneralSaveSuccess(true);
    setTimeout(() => setGeneralSaveSuccess(false), 3000);
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    if (!onSaveHero) return;

    setIsHeroSaving(true);
    const formData = new FormData();
    formData.append('pageKey', selectedPage);
    formData.append('title', heroTitle);
    formData.append('subtitle', heroSubtitle);

    if (heroImageFile) {
      formData.append('image', heroImageFile);
    } else {
      formData.append('image', heroImage);
    }

    if (heroMobileImageFile) {
      formData.append('mobileImage', heroMobileImageFile);
    } else {
      formData.append('mobileImage', heroMobileImage);
    }

    try {
      await onSaveHero(formData);
      setHeroSaveSuccess(true);
      setTimeout(() => setHeroSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHeroSaving(false);
    }
  };

  const currentFallback = DEFAULT_PAGE_HEROES[selectedPage] || DEFAULT_PAGE_HEROES['home'];

  return (
    <div className="space-y-6 text-left text-slate-800">

      {/* Top Banner Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Page Content & Hero Manager</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage dynamic Hero Banners (Titles, Subtitles & Images) for all pages, plus company contact info & story.
          </p>
        </div>
      </div>

      {/* Main Section Navigation Switcher */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveSection('heroes')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${activeSection === 'heroes'
              ? 'border-[#EE3A57] text-[#EE3A57] bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
        >
          🖼️ Page Hero Banners (8 Pages)
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('general')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${activeSection === 'general'
              ? 'border-[#EE3A57] text-[#EE3A57] bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
        >
          🏢 Contact Info & Story Text
        </button>
      </div>

      {/* ================= SECTION 1: HERO SECTIONS MANAGER ================= */}
      {activeSection === 'heroes' && (
        <div className="space-y-6">

          {/* Page Selector Tabs */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
              Select Page to View & Configure Hero Section
            </label>
            <div className="flex flex-wrap gap-2">
              {PAGES_LIST.map((page) => (
                <button
                  key={page.key}
                  type="button"
                  onClick={() => setSelectedPage(page.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedPage === page.key
                      ? 'bg-gradient-to-r from-[#EE3A57] to-[#2563EB] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form + Preview Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Hero Form Inputs */}
            <form onSubmit={handleHeroSubmit} className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Configuring Hero: <span className="text-[#EE3A57]">{PAGES_LIST.find(p => p.key === selectedPage)?.label}</span>
                </h3>
              </div>

              {heroSaveSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider">
                  ✓ Hero Section for {selectedPage} saved live!
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Hero Title / Headline *
                </label>
                <input
                  type="text"
                  required
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder={`Current active: ${currentFallback.title}`}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] transition-colors font-semibold"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows="3"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder={`Current active: ${currentFallback.subtitle}`}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] transition-colors leading-relaxed font-medium"
                />
              </div>

              {/* Desktop Image File / URL */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[11px] font-extrabold text-[#EE3A57] uppercase tracking-wider block">
                  1. Desktop Hero Banner Image (File Upload or URL)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setHeroImageFile(e.target.files[0])}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-700"
                />
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="Or enter Desktop Image URL (https://...)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#EE3A57]"
                />
              </div>

              {/* Mobile Image File / URL */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  2. Mobile Hero Banner Image (Optional File or URL)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setHeroMobileImageFile(e.target.files[0])}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-700"
                />
                <input
                  type="text"
                  value={heroMobileImage}
                  onChange={(e) => setHeroMobileImage(e.target.value)}
                  placeholder="Or enter Mobile Image URL (https://...)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#EE3A57]"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={isHeroSaving}
                  className="px-6 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isHeroSaving ? 'Saving Hero...' : `Save ${selectedPage} Hero Section`}
                </button>
              </div>
            </form>

            {/* Live Hero Banner Preview Card */}
            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex justify-between items-center">
                <span>Active Banner Preview</span>
                <span className="text-[10px] text-[#EE3A57] bg-[#EE3A57]/10 px-2 py-0.5 rounded uppercase font-bold">
                  {selectedPage}
                </span>
              </h3>

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 min-h-[240px] flex flex-col justify-center items-center text-center p-6 border border-slate-200 shadow-md">
                {/* Background Image Preview */}
                {(heroImageFile ? URL.createObjectURL(heroImageFile) : (heroImage || currentFallback.image)) ? (
                  <img
                    src={heroImageFile ? URL.createObjectURL(heroImageFile) : (heroImage || currentFallback.image)}
                    alt="Desktop Banner Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 opacity-90" />
                )}

                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />

                <div className="relative z-10 space-y-2 max-w-sm">
                  <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-[#EE3A57] bg-slate-900/80 px-2.5 py-1 rounded-md border border-[#EE3A57]/30 shadow-xs">
                    {selectedPage.toUpperCase()} HERO BANNER
                  </span>
                  <h4 className="font-serif text-lg font-black text-white leading-tight">
                    {heroTitle || currentFallback.title}
                  </h4>
                  <p className="text-[11px] text-slate-200 font-medium line-clamp-3">
                    {heroSubtitle || currentFallback.subtitle}
                  </p>
                </div>
              </div>

              {/* Mobile View Preview Box */}
              {(heroMobileImageFile ? URL.createObjectURL(heroMobileImageFile) : (heroMobileImage || currentFallback.mobileImage)) && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-left">
                    Mobile View Active Preview
                  </span>
                  <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs">
                    <img
                      src={heroMobileImageFile ? URL.createObjectURL(heroMobileImageFile) : (heroMobileImage || currentFallback.mobileImage)}
                      alt="Mobile Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[8px] font-bold uppercase px-1.5 py-0.5 rounded">
                      Mobile Preview
                    </span>
                  </div>
                </div>
              )}

              <div className="text-[10px] text-slate-400 font-semibold text-center italic pt-1">
                * Note: Changes saved here immediately update the {selectedPage} hero section across desktop and mobile devices.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= SECTION 2: GENERAL COMPANY CONTENT ================= */}
      {activeSection === 'general' && (
        <form onSubmit={handleGeneralSubmit} className="space-y-6">

          {generalSaveSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold uppercase tracking-wider">Company Info Saved Successfully!</span>
            </div>
          )}

          {/* Section 1: Contact Details */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
              Company Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Primary Phone / Contact No
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] transition-colors font-semibold"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Support Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] transition-colors font-semibold"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Office & Factory Address (Footer & Contact Page)
                </label>
                <textarea
                  rows="2"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] transition-colors leading-relaxed font-semibold"
                />
              </div>

            </div>
          </div>

          {/* Section 2: About Us Brand Story */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
              About Us Brand Story Text
            </h3>

            <div className="space-y-4">

              {/* Story Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Brand Headline / Tagline
                </label>
                <input
                  type="text"
                  required
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] transition-colors font-bold text-sm"
                />
              </div>

              {/* Paragraph 1 */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Main Brand Paragraph (Established 2007)
                </label>
                <textarea
                  rows="4"
                  required
                  value={storyText1}
                  onChange={(e) => setStoryText1(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] transition-colors leading-relaxed font-medium"
                />
              </div>

              {/* Paragraph 2 */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Facility & Manufacturing Paragraph
                </label>
                <textarea
                  rows="3"
                  value={storyText2}
                  onChange={(e) => setStoryText2(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] transition-colors leading-relaxed font-medium"
                />
              </div>

            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
            >
              Save Company Info & Story
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
