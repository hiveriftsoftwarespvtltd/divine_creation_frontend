import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { api } from '../../utils/api';

// Fallback images from assets for immediate preview
import defaultAboutCraftImg from '../../assets/about_corporate_gifting_craft.jpg';
import defaultLaserImg from '../../assets/laser_engraving_corporate_gifting.jpg';
import defaultTrophyImg from '../../assets/metal_etching_trophy_crafting.jpg';
import defaultEmbossingImg from '../../assets/leatherette_gifting_embossing.jpg';
import defaultDrinkwareImg from '../../assets/executive_drinkware_set.jpg';

const ICON_OPTIONS = [
  { value: 'clock', label: '🕒 Clock (Experience)' },
  { value: 'shield', label: '🛡️ Shield (GST / Registered)' },
  { value: 'users', label: '👥 Users (Manufacturer / Team)' },
  { value: 'gift', label: '🎁 Gift / Pen (Corporate Sets)' },
  { value: 'award', label: '🏆 Trophy (Award / Excellence)' },
  { value: 'star', label: '⭐ Star (Quality / Trust)' },
];

export default function AboutManage() {
  const [activeSubTab, setActiveSubTab] = useState('section1');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Section 1: Overview Form State
  const [overview, setOverview] = useState({
    badge: 'ABOUT DIVINE CREATIONS',
    title: 'Traditional Indian Craftsmanship',
    titleHighlight: 'Modern Design',
    description:
      'Established in 2007 in New Delhi under Director M Ahuja, Divine Creations is a premier manufacturer, trader, and exporter of Corporate & Promotional Gift Items, Executive Gift Sets, Stainless Steel Flasks, Executive Notebooks, Trophy Mementos, and Custom Homeware.',
    image: '',
    buttonText: 'KNOW OUR STORY',
    buttonLink: '/about',
    highlights: [
      { title: '16+ Years', subtitle: 'Experience', icon: 'clock' },
      { title: 'GST Registered', subtitle: 'Proprietorship', icon: 'shield' },
      { title: 'Trusted', subtitle: 'Manufacturer', icon: 'users' },
      { title: 'Corporate', subtitle: 'Gifting Sets', icon: 'gift' },
    ],
  });
  const [overviewImageFile, setOverviewImageFile] = useState(null);

  // Section 2: Manufacturing & Branding Collage Form State
  const [manufacturing, setManufacturing] = useState({
    badge: 'ADVANCED MANUFACTURING & BRANDING',
    title: 'Precision Branding',
    titleSub: 'For Corporate Gifts',
    description:
      'Equipped with Laser Engraving, Metal Marking, Chemical Etching, and Glass Sand Carving machinery at Badli Industrial Estate, Divine Creations transforms your concepts and company logos into executive corporate gifts with high demographic impact.',
    buttonText: 'SEE OUR PROCESS',
    buttonLink: '/custom-order',
    cards: [
      {
        tag: 'Fiber Laser Marking',
        title: 'Custom Laser Engraved Bottles',
        linkText: 'Click to View Catalog →',
        category: 'Drinkware',
        image: '',
      },
      {
        tag: '',
        title: 'Metal Trophies',
        linkText: 'View Items →',
        category: 'Mementos & Trophies',
        image: '',
      },
      {
        tag: '',
        title: 'Leatherette Diaries',
        linkText: 'View Items →',
        category: 'Gift Sets & Notebooks',
        image: '',
      },
      {
        tag: 'Executive Gift Combo',
        title: 'Corporate Gift Sets',
        linkText: 'Click to View Catalog →',
        category: 'Corporate Gifts',
        image: '',
      },
    ],
  });
  const [cardImageFiles, setCardImageFiles] = useState([null, null, null, null]);

  // Load existing data from API on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await api.about.get();
      if (data) {
        if (data.overview) {
          setOverview((prev) => ({
            ...prev,
            ...data.overview,
            highlights: data.overview.highlights?.length ? data.overview.highlights : prev.highlights,
          }));
        }
        if (data.manufacturing) {
          setManufacturing((prev) => ({
            ...prev,
            ...data.manufacturing,
            cards: data.manufacturing.cards?.length ? data.manufacturing.cards : prev.cards,
          }));
        }
      }
    } catch (err) {
      console.error('Failed to load about data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to update highlights
  const handleHighlightChange = (index, field, value) => {
    setOverview((prev) => {
      const nextHighlights = [...prev.highlights];
      nextHighlights[index] = { ...nextHighlights[index], [field]: value };
      return { ...prev, highlights: nextHighlights };
    });
  };

  // Helper to update manufacturing cards
  const handleCardChange = (index, field, value) => {
    setManufacturing((prev) => {
      const nextCards = [...prev.cards];
      nextCards[index] = { ...nextCards[index], [field]: value };
      return { ...prev, cards: nextCards };
    });
  };

  // Helper for card image file pick
  const handleCardFileChange = (index, file) => {
    setCardImageFiles((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  // Save changes handler
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsSaving(true);
      const formData = new FormData();

      // Pass overview and manufacturing as JSON strings
      formData.append('overview', JSON.stringify(overview));
      formData.append('manufacturing', JSON.stringify(manufacturing));

      // Append overview image if selected
      if (overviewImageFile) {
        formData.append('overviewImage', overviewImageFile);
      }

      // Append card images if selected
      cardImageFiles.forEach((file, idx) => {
        if (file) {
          formData.append(`card${idx}Image`, file);
        }
      });

      const updated = await api.about.update(formData);
      if (updated) {
        if (updated.overview) setOverview(updated.overview);
        if (updated.manufacturing) setManufacturing(updated.manufacturing);
      }

      // Clear pending file selections
      setOverviewImageFile(null);
      setCardImageFiles([null, null, null, null]);

      Swal.fire({
        icon: 'success',
        title: 'Saved Successfully!',
        text: 'About Us sections have been updated live on the website.',
        timer: 2500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: err.message || 'Could not update about sections.',
        confirmButtonColor: '#EE3A57',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default data
  const handleReset = async () => {
    const result = await Swal.fire({
      title: 'Reset to Defaults?',
      text: 'This will revert all titles, descriptions, and cards to default corporate gifting content.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EE3A57',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Yes, Reset',
    });

    if (result.isConfirmed) {
      try {
        setIsSaving(true);
        const resetData = await api.about.reset();
        if (resetData) {
          if (resetData.overview) setOverview(resetData.overview);
          if (resetData.manufacturing) setManufacturing(resetData.manufacturing);
        }
        setOverviewImageFile(null);
        setCardImageFiles([null, null, null, null]);
        Swal.fire({
          icon: 'success',
          title: 'Reset Completed',
          text: 'Default data restored.',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Reset Error', text: err.message });
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin h-10 w-10 border-4 border-[#EE3A57] border-t-transparent rounded-full mx-auto" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading About Us CMS...</p>
        </div>
      </div>
    );
  }

  // Active overview image preview
  const activeOverviewImgPreview = overviewImageFile
    ? URL.createObjectURL(overviewImageFile)
    : overview.image || defaultAboutCraftImg;

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EE3A57] block mb-1">
            HOME & ABOUT PAGES CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            About Us & Precision Branding Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Fully manage headings, badges, descriptions, custom images, badges, and showcase cards for both sections.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            ↺ Reset Defaults
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
                Saving Changes...
              </>
            ) : (
              'Save All Changes Live'
            )}
          </button>
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex border-b border-slate-200 gap-3">
        <button
          type="button"
          onClick={() => setActiveSubTab('section1')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
            activeSubTab === 'section1'
              ? 'border-[#EE3A57] text-[#EE3A57] bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          🏆 Section 1: Traditional Craftsmanship & Credentials
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('section2')}
          className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
            activeSubTab === 'section2'
              ? 'border-[#2563EB] text-[#2563EB] bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          ⚙️ Section 2: Advanced Manufacturing & Branding Collage
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: ABOUT US & TRADITIONAL CRAFTSMANSHIP                           */}
      {/* ========================================================================= */}
      {activeSubTab === 'section1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Inputs (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-5">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EE3A57]" />
              Edit Section 1: Overview & Highlights
            </h2>

            {/* Subtitle / Badge */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Top Subtitle / Badge Text
              </label>
              <input
                type="text"
                value={overview.badge}
                onChange={(e) => setOverview({ ...overview, badge: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#EE3A57]"
                placeholder="ABOUT DIVINE CREATIONS"
              />
            </div>

            {/* Main Title & Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Main Headline (Part 1)
                </label>
                <input
                  type="text"
                  value={overview.title}
                  onChange={(e) => setOverview({ ...overview, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#EE3A57]"
                  placeholder="Traditional Indian Craftsmanship"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-[#EE3A57] uppercase tracking-wider block">
                  Gradient Highlight Text (Part 2)
                </label>
                <input
                  type="text"
                  value={overview.titleHighlight}
                  onChange={(e) => setOverview({ ...overview, titleHighlight: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#EE3A57] font-extrabold focus:outline-none focus:border-[#EE3A57]"
                  placeholder="Modern Design"
                />
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Description Text
              </label>
              <textarea
                rows="4"
                value={overview.description}
                onChange={(e) => setOverview({ ...overview, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium leading-relaxed focus:outline-none focus:border-[#EE3A57]"
                placeholder="Established in 2007 in New Delhi under Director M Ahuja..."
              />
            </div>

            {/* Main Left Image Upload */}
            <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                Section Main Left Image (Executive Products / Desk Presentation)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setOverviewImageFile(e.target.files[0])}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Upload a high resolution JPG/PNG image</span>
                </div>
                <div>
                  <input
                    type="text"
                    value={overview.image}
                    onChange={(e) => setOverview({ ...overview, image: e.target.value })}
                    placeholder="Or enter Image URL (e.g. /uploads/...)"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#EE3A57]"
                  />
                </div>
              </div>
            </div>

            {/* Button Text & Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Button Text
                </label>
                <input
                  type="text"
                  value={overview.buttonText}
                  onChange={(e) => setOverview({ ...overview, buttonText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#EE3A57]"
                  placeholder="KNOW OUR STORY"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Button Link / Path
                </label>
                <input
                  type="text"
                  value={overview.buttonLink}
                  onChange={(e) => setOverview({ ...overview, buttonLink: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#EE3A57]"
                  placeholder="/about"
                />
              </div>
            </div>

            {/* 4 Highlights Badges Editor */}
            <div className="space-y-3 pt-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                4 Feature Highlights Badges
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {overview.highlights.map((hl, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EE3A57] block">
                      Highlight #{idx + 1}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={hl.title}
                        onChange={(e) => handleHighlightChange(idx, 'title', e.target.value)}
                        placeholder="Title (e.g. 16+ Years)"
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800"
                      />
                      <input
                        type="text"
                        value={hl.subtitle}
                        onChange={(e) => handleHighlightChange(idx, 'subtitle', e.target.value)}
                        placeholder="Subtitle (e.g. Experience)"
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600"
                      />
                    </div>
                    <div>
                      <select
                        value={hl.icon}
                        onChange={(e) => handleHighlightChange(idx, 'icon', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer"
                      >
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4 sticky top-24">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Live Preview: Section 1
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded">
                  Active Look
                </span>
              </div>

              {/* Preview Container */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-4 text-left">
                {/* Image */}
                <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs">
                  <img
                    src={activeOverviewImgPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#EE3A57] block mb-1">
                    {overview.badge || 'ABOUT DIVINE CREATIONS'}
                  </span>
                  <h3 className="font-serif text-lg font-black text-slate-900 leading-tight">
                    {overview.title} <br />
                    Meets{' '}
                    <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">
                      {overview.titleHighlight}
                    </span>
                  </h3>
                  <div className="w-full h-[2px] bg-gradient-to-r from-[#EE3A57] to-[#2563EB] mt-1.5 rounded-full" />
                </div>

                <p className="text-[11px] text-slate-600 font-medium leading-relaxed line-clamp-4">
                  {overview.description}
                </p>

                {/* Highlights Mini Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                  {overview.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#EE3A57]/10 flex items-center justify-center text-[#EE3A57] shrink-0 border border-[#EE3A57]/20 text-xs">
                        ✓
                      </div>
                      <div className="text-left text-[11px] font-bold text-slate-800 leading-tight">
                        <span>{hl.title}</span>
                        <span className="block text-slate-500 text-[10px] font-semibold">{hl.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <div className="pt-2">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xs">
                    {overview.buttonText || 'KNOW OUR STORY'}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic text-center">
                * Note: Changes reflect dynamically on both the Homepage and About page.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: ADVANCED MANUFACTURING & BRANDING COLLAGE                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'section2' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Inputs (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-5">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
              Edit Section 2: Precision Branding & Collage Showcase
            </h2>

            {/* Subtitle / Badge */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Top Subtitle / Badge Text
              </label>
              <input
                type="text"
                value={manufacturing.badge}
                onChange={(e) => setManufacturing({ ...manufacturing, badge: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#2563EB]"
                placeholder="ADVANCED MANUFACTURING & BRANDING"
              />
            </div>

            {/* Main Title & Line 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Title Line 1
                </label>
                <input
                  type="text"
                  value={manufacturing.title}
                  onChange={(e) => setManufacturing({ ...manufacturing, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#2563EB]"
                  placeholder="Precision Branding"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Title Line 2
                </label>
                <input
                  type="text"
                  value={manufacturing.titleSub}
                  onChange={(e) => setManufacturing({ ...manufacturing, titleSub: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#2563EB]"
                  placeholder="For Corporate Gifts"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Description Text
              </label>
              <textarea
                rows="4"
                value={manufacturing.description}
                onChange={(e) => setManufacturing({ ...manufacturing, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium leading-relaxed focus:outline-none focus:border-[#2563EB]"
                placeholder="Equipped with Laser Engraving, Metal Marking..."
              />
            </div>

            {/* Button Text & Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Button Text
                </label>
                <input
                  type="text"
                  value={manufacturing.buttonText}
                  onChange={(e) => setManufacturing({ ...manufacturing, buttonText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#2563EB]"
                  placeholder="SEE OUR PROCESS"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Button Link / Path
                </label>
                <input
                  type="text"
                  value={manufacturing.buttonLink}
                  onChange={(e) => setManufacturing({ ...manufacturing, buttonLink: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#2563EB]"
                  placeholder="/custom-order"
                />
              </div>
            </div>

            {/* 4 Collage Cards Editor */}
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-900 block">
                Configure 4 Showcase Collage Cards
              </label>

              {manufacturing.cards.map((card, idx) => {
                const cardLabels = [
                  'Card 1 (Left Tall Card - e.g. Laser Engraved Bottles)',
                  'Card 2 (Middle Top - e.g. Metal Trophies)',
                  'Card 3 (Middle Bottom - e.g. Leatherette Diaries)',
                  'Card 4 (Right Tall Card - e.g. Corporate Gift Sets)',
                ];

                return (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                        {cardLabels[idx]}
                      </span>
                      <span className="text-[10px] font-bold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded">
                        Slot #{idx + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          Card Title
                        </label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                          placeholder="e.g. Custom Laser Engraved Bottles"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          Tag / Badge (Optional)
                        </label>
                        <input
                          type="text"
                          value={card.tag || ''}
                          onChange={(e) => handleCardChange(idx, 'tag', e.target.value)}
                          placeholder="e.g. Fiber Laser Marking"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          Link / Action Text
                        </label>
                        <input
                          type="text"
                          value={card.linkText || ''}
                          onChange={(e) => handleCardChange(idx, 'linkText', e.target.value)}
                          placeholder="Click to View Catalog →"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                          Category Name (Clicks redirect here)
                        </label>
                        <input
                          type="text"
                          value={card.category || ''}
                          onChange={(e) => handleCardChange(idx, 'category', e.target.value)}
                          placeholder="e.g. Drinkware"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-semibold"
                        />
                      </div>
                    </div>

                    {/* Image Upload for Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCardFileChange(idx, e.target.files[0])}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={card.image || ''}
                          onChange={(e) => handleCardChange(idx, 'image', e.target.value)}
                          placeholder="Or enter Image URL"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Preview Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4 sticky top-24">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Live Preview: Section 2
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded">
                  Collage View
                </span>
              </div>

              {/* Header Preview */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#EE3A57] block">
                  {manufacturing.badge}
                </span>
                <h3 className="font-serif text-lg font-extrabold text-slate-900 leading-tight">
                  {manufacturing.title} <br />
                  {manufacturing.titleSub}
                </h3>
                <div className="h-[2px] w-12 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed line-clamp-3">
                  {manufacturing.description}
                </p>
              </div>

              {/* Collage Mini Grid Preview */}
              <div className="grid grid-cols-12 gap-2 pt-2 items-stretch">
                {/* Card 1 */}
                <div className="col-span-5 h-44 rounded-xl overflow-hidden relative bg-slate-900 shadow-xs">
                  <img
                    src={
                      cardImageFiles[0]
                        ? URL.createObjectURL(cardImageFiles[0])
                        : manufacturing.cards[0]?.image || defaultLaserImg
                    }
                    alt="Card 1"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-left">
                    <span className="text-[8px] font-bold text-[#EE3A57] bg-white px-1.5 py-0.5 rounded block w-max">
                      {manufacturing.cards[0]?.tag || 'Marking'}
                    </span>
                    <h4 className="text-[11px] font-bold leading-tight mt-1">
                      {manufacturing.cards[0]?.title}
                    </h4>
                  </div>
                </div>

                {/* Card 2 & 3 */}
                <div className="col-span-3 flex flex-col gap-2">
                  <div className="h-[84px] rounded-xl overflow-hidden relative bg-slate-900 shadow-xs">
                    <img
                      src={
                        cardImageFiles[1]
                          ? URL.createObjectURL(cardImageFiles[1])
                          : manufacturing.cards[1]?.image || defaultTrophyImg
                      }
                      alt="Card 2"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-1.5 left-1.5 text-white text-[9px] font-bold leading-tight text-left">
                      {manufacturing.cards[1]?.title}
                    </div>
                  </div>

                  <div className="h-[84px] rounded-xl overflow-hidden relative bg-slate-900 shadow-xs">
                    <img
                      src={
                        cardImageFiles[2]
                          ? URL.createObjectURL(cardImageFiles[2])
                          : manufacturing.cards[2]?.image || defaultEmbossingImg
                      }
                      alt="Card 3"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-1.5 left-1.5 text-white text-[9px] font-bold leading-tight text-left">
                      {manufacturing.cards[2]?.title}
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="col-span-4 h-44 rounded-xl overflow-hidden relative bg-slate-900 shadow-xs">
                  <img
                    src={
                      cardImageFiles[3]
                        ? URL.createObjectURL(cardImageFiles[3])
                        : manufacturing.cards[3]?.image || defaultDrinkwareImg
                    }
                    alt="Card 4"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-left">
                    <span className="text-[8px] font-bold text-[#2563EB] bg-white px-1.5 py-0.5 rounded block w-max">
                      {manufacturing.cards[3]?.tag || 'Gift Combo'}
                    </span>
                    <h4 className="text-[11px] font-bold leading-tight mt-1">
                      {manufacturing.cards[3]?.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 text-left">
                <span className="inline-block px-4 py-2 bg-[#0E0E3B] text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {manufacturing.buttonText || 'SEE OUR PROCESS'} →
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
