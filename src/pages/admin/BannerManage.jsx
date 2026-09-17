import React, { useState } from 'react';
import Swal from 'sweetalert2';

// Import default hero assets for active fallback cards and previews
import banner1 from '../../assets/a (1).png';
import banner2 from '../../assets/a (2).png';
import banner3 from '../../assets/a (3).png';
import banner4 from '../../assets/a (4).png';
import banner5 from '../../assets/a (5).png';
import banner6 from '../../assets/a (6).png';
import banner7 from '../../assets/a (7).png';
import mobilehero from '../../assets/mobilehero.png';
import aboutusmobile from '../../assets/aboutusmobile.png';
import productmobilehero from '../../assets/productmobilehero.png';
import customDesignBannerBg from '../../assets/custom_design_banner_bg.png';
import galleryMobileHero from '../../assets/gallerymobile.png';
import clintmobilehero from '../../assets/clintmobilehero.png';
import contactmobile from '../../assets/contactmobile.png';

const PAGE_OPTIONS = [
  { key: 'slider', label: ' Homepage Sliders (Carousel)' },
  { key: 'home', label: ' Home Page Hero' },
  { key: 'about', label: 'ℹ About Us Hero ( /about )' },
  { key: 'collections', label: ' Our Products Hero ( /collections )' },
  { key: 'customOrder', label: ' Custom Orders Hero ( /custom-order )' },
  { key: 'gallery', label: ' Gallery Hero ( /gallery )' },
  { key: 'blogs', label: ' Blogs Hero ( /blogs )' },
  { key: 'clients', label: ' Our Clients Hero ( /our-clients )' },
  { key: 'contact', label: ' Contact Us Hero ( /contact )' },
];

const DEFAULT_SLIDER_SLIDES = [
  {
    id: 'default-slider-1',
    isDefault: true,
    pageKey: 'slider',
    title: 'Corporate & Promotional Gift Items (Slide 1)',
    subtitle: 'Executive Gift Sets, Drinkware, Trophies & Customized Branding Solutions',
    image: banner1,
    mobileImage: mobilehero,
    link: '/collections',
    active: true
  },
  {
    id: 'default-slider-2',
    isDefault: true,
    pageKey: 'slider',
    title: 'Stainless Steel Drinkware & Vacuum Flasks (Slide 2)',
    subtitle: 'Thermal Insulated Flasks, Custom Laser Engraved Bottles & Water Jugs',
    image: banner2,
    mobileImage: mobilehero,
    link: '/collections?category=Drinkware',
    active: true
  },
  {
    id: 'default-slider-3',
    isDefault: true,
    pageKey: 'slider',
    title: 'Executive Leatherette Gift Sets & Diaries (Slide 3)',
    subtitle: 'Custom Blind Debossing, Premium Notebooks, Pens & Wallet Combos',
    image: banner3,
    mobileImage: mobilehero,
    link: '/collections?category=Gift%20Sets',
    active: true
  },
  {
    id: 'default-slider-4',
    isDefault: true,
    pageKey: 'slider',
    title: 'Precision Trophies, Mementos & Desktop Art (Slide 4)',
    subtitle: 'Leadership Award Trophies, Wall Clocks & Customized Corporate Keepsakes',
    image: banner4,
    mobileImage: mobilehero,
    link: '/collections?category=Mementos',
    active: true
  }
];

const DEFAULT_PAGE_HEROES = [
  {
    key: 'home',
    label: 'Home Hero',
    title: 'Corporate & Promotional Gift Items',
    subtitle: 'Executive Gift Sets, Drinkware, Trophies & Customized Branding Solutions',
    image: banner1,
    mobileImage: mobilehero,
    link: '/'
  },
  {
    key: 'about',
    label: 'About Us Hero',
    title: 'About Divine Creations',
    subtitle: 'Pioneers in Executive Corporate Gifting, Custom Laser Engraving & Metal Craftsmanship Since 2007',
    image: banner4,
    mobileImage: aboutusmobile,
    link: '/about'
  },
  {
    key: 'collections',
    label: 'Our Products Hero',
    title: 'Our Corporate Collections & Gift Catalog',
    subtitle: 'Explore Premier Executive Gift Sets, Stainless Steel Vacuum Flasks, Trophies & Office Accessories',
    image: banner1,
    mobileImage: productmobilehero,
    link: '/collections'
  },
  {
    key: 'customOrder',
    label: 'Custom Orders Hero',
    title: 'Custom Manufacturing & Bespoke Orders',
    subtitle: 'Turn Your Vision Into Reality with Tailor-made Designs, Custom Laser Logo Engraving & Bulk Production',
    image: banner3,
    mobileImage: mobilehero,
    link: '/custom-order'
  },
  {
    key: 'gallery',
    label: 'Gallery Hero',
    title: 'Divine Creations Craft Gallery',
    subtitle: 'Visual Showcase of Precision Engraved Drinkware, Notebooks & Corporate Packaging',
    image: banner5,
    mobileImage: galleryMobileHero,
    link: '/gallery'
  },
  {
    key: 'blogs',
    label: 'Blogs Hero',
    title: 'Our Blogs & Corporate Gifting Insights',
    subtitle: 'Discover Expert Insights, Corporate Gifting Trends & Custom Branding Strategies from Divine Creations',
    image: banner3,
    mobileImage: galleryMobileHero,
    link: '/blogs'
  },
  {
    key: 'clients',
    label: 'Our Clients Hero',
    title: 'Our Esteemed Corporate Clients',
    subtitle: 'Trusted by Government Ministries, Multinationals & Leading Enterprises Across India',
    image: banner6,
    mobileImage: clintmobilehero,
    link: '/our-clients'
  },
  {
    key: 'contact',
    label: 'Contact Us Hero',
    title: 'Contact Divine Creations Studio',
    subtitle: 'Reach Out for Custom Quotes, Bulk Wholesale Inquiries & Sample Requests',
    image: banner7,
    mobileImage: contactmobile,
    link: '/contact'
  }
];

export default function BannerManage({
  banners = [],
  content = {},
  onAddBanner,
  onEditBanner,
  onDeleteBanner,
  onToggleBannerStatus
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editBanner, setEditBanner] = useState(null);

  const [pageKey, setPageKey] = useState('slider');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [mobileImageUrl, setMobileImageUrl] = useState('');
  const [mobileImageFile, setMobileImageFile] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');

  // Active Grid Filter Tab: defaults to 'slider'
  const [activeTabFilter, setActiveTabFilter] = useState('slider');

  const resetForm = () => {
    setPageKey('slider');
    setTitle('');
    setSubtitle('');
    setImageUrl('');
    setImageFile(null);
    setMobileImageUrl('');
    setMobileImageFile(null);
    setLinkUrl('');
    setEditBanner(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setPageKey(activeTabFilter);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (banner) => {
    if (banner.isDefault && banner.id.startsWith('default-')) {
      setEditBanner(null); // Create new database banner for this slide/hero
    } else {
      setEditBanner(banner);
    }
    setPageKey(banner.pageKey || 'slider');
    setTitle(banner.title || '');
    setSubtitle(banner.subtitle || '');
    setImageUrl(typeof banner.image === 'string' && banner.image.startsWith('http') ? banner.image : '');
    setMobileImageUrl(typeof banner.mobileImage === 'string' && banner.mobileImage.startsWith('http') ? banner.mobileImage : '');
    setLinkUrl(banner.link || '');
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pageKey', pageKey);
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('link', linkUrl);

    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      formData.append('image', imageUrl);
    }

    if (mobileImageFile) {
      formData.append('mobileImage', mobileImageFile);
    } else {
      formData.append('mobileImage', mobileImageUrl);
    }

    if (editBanner && !editBanner.isDefault) {
      onEditBanner(editBanner.id, formData);
    } else {
      onAddBanner(formData);
    }
    setIsFormOpen(false);
    resetForm();
  };

  const handleDelete = (banner) => {
    if (banner.isDefault) {
      Swal.fire({ title: 'Default Hero', text: 'This is the active built-in default slide/hero. Click "EDIT HERO" to publish custom banner images or title!', icon: 'info', confirmButtonColor: '#EE3A57' });
      return;
    }
    Swal.fire({
      title: 'Delete Banner / Hero?',
      text: 'Are you sure you want to remove this banner?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EE3A57',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete'
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteBanner(banner.id);
      }
    });
  };

  // Combine database banners with default slider slides and default page heroes
  const combinedDisplayBanners = [...banners];

  // 1. Ensure all 4 Homepage Carousel Slides exist in display list
  const existingSliders = combinedDisplayBanners.filter(b => !b.pageKey || b.pageKey === 'slider');
  DEFAULT_SLIDER_SLIDES.forEach((defSlide, index) => {
    if (existingSliders.length <= index) {
      combinedDisplayBanners.push(defSlide);
    }
  });

  // 2. Ensure all 8 Page Heroes exist in display list
  DEFAULT_PAGE_HEROES.forEach((defPage) => {
    const existsInDb = banners.some((b) => b.pageKey === defPage.key || (b.pageKey === 'custom-order' && defPage.key === 'customOrder'));
    if (!existsInDb) {
      const savedContentHero = content?.pageHeroes?.[defPage.key] ||
        content?.pageHeroes?.[defPage.key === 'customOrder' ? 'custom-order' : defPage.key] || {};
      combinedDisplayBanners.push({
        id: `default-${defPage.key}`,
        isDefault: true,
        pageKey: defPage.key,
        title: savedContentHero.title !== undefined ? savedContentHero.title : defPage.title,
        subtitle: savedContentHero.subtitle !== undefined ? savedContentHero.subtitle : defPage.subtitle,
        image: savedContentHero.image || defPage.image,
        mobileImage: savedContentHero.mobileImage || defPage.mobileImage,
        link: defPage.link,
        active: true
      });
    }
  });

  // Filter combined list to show ONLY items matching current tab
  const filteredBanners = combinedDisplayBanners.filter((b) => {
    if (activeTabFilter === 'slider') return !b.pageKey || b.pageKey === 'slider';
    return b.pageKey === activeTabFilter || (activeTabFilter === 'customOrder' && b.pageKey === 'custom-order');
  });

  const getPageBadgeLabel = (key) => {
    const found = PAGE_OPTIONS.find(p => p.key === key);
    return found ? found.label : key ? key.toUpperCase() : '🎠 Homepage Sliders';
  };

  return (
    <div className="space-y-6 text-left text-slate-800">

      {/* Top Header Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
            Banner & Hero Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Configure homepage hero sliders (4 carousel slides) & individual page hero banners.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Banner / Hero
        </button>
      </div>

      {/* Clean Individual Page Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-1 scrollbar-none">

        {/* Slider Carousel Tab */}
        <button
          type="button"
          onClick={() => setActiveTabFilter('slider')}
          className={`px-4 py-2.5 text-xs font-extrabold tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${activeTabFilter === 'slider'
              ? 'border-[#EE3A57] text-[#EE3A57] bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
        >
          Homepage Sliders ({combinedDisplayBanners.filter(b => !b.pageKey || b.pageKey === 'slider').length})
        </button>

        {/* 8 Specific Page Tabs */}
        {DEFAULT_PAGE_HEROES.map((ph) => {
          const count = combinedDisplayBanners.filter(b => b.pageKey === ph.key || (ph.key === 'customOrder' && b.pageKey === 'custom-order')).length;
          return (
            <button
              key={ph.key}
              type="button"
              onClick={() => setActiveTabFilter(ph.key)}
              className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${activeTabFilter === ph.key
                  ? 'border-[#EE3A57] text-[#EE3A57] bg-white font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
            >
              {ph.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Add / Edit Banner Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setIsFormOpen(false)} />

          <div className="bg-[#faf8f5] border border-slate-200 rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 text-left space-y-4">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                {editBanner ? 'Edit Banner / Hero Section' : 'Upload New Banner / Hero Section'}
              </h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                Select target page placement & configure desktop + mobile view images
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-2">

              {/* Target Page Placement Dropdown */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-[#EE3A57] uppercase tracking-wider block">
                  Select Target Page / Banner Placement *
                </label>
                <select
                  value={pageKey}
                  onChange={(e) => setPageKey(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] font-bold cursor-pointer shadow-xs"
                >
                  {PAGE_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Banner Title / Heading *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Handcrafted Buddha Statues & Premium Décor"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] font-semibold"
                />
              </div>

              {/* Subtitle / Description */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Banner Subtitle / Description Tagline (Optional)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Timeless Masterpieces Designed for Luxury Workspaces"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57] font-medium"
                />
              </div>

              {/* Desktop Image */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-[#EE3A57] uppercase tracking-wider block">
                  1. Desktop View Banner Image *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700"
                  />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or Image URL (https://...)"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#EE3A57]"
                  />
                </div>

                {/* Desktop Live Preview Box */}
                {(imageFile ? URL.createObjectURL(imageFile) : imageUrl) && (
                  <div className="relative h-36 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-950 mt-2 shadow-xs flex items-center justify-center">
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                      alt="Desktop Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border border-slate-700 shadow-xs">
                      ✓ Desktop Live Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Mobile Image */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  2. Mobile View Banner Image (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setMobileImageFile(e.target.files[0])}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700"
                  />
                  <input
                    type="text"
                    value={mobileImageUrl}
                    onChange={(e) => setMobileImageUrl(e.target.value)}
                    placeholder="Or Mobile Image URL (https://...)"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#EE3A57]"
                  />
                </div>

                {/* Mobile Live Preview Box */}
                {(mobileImageFile ? URL.createObjectURL(mobileImageFile) : mobileImageUrl) && (
                  <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-950 mt-2 shadow-xs flex items-center justify-center">
                    <img
                      src={mobileImageFile ? URL.createObjectURL(mobileImageFile) : mobileImageUrl}
                      alt="Mobile Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-[#EE3A57]/90 text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs">
                      ✓ Mobile Live Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Link */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Redirect Action URL / Path (Optional)
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="e.g. /collections or /custom-order"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#EE3A57]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="md:col-span-2 pt-3 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {editBanner ? 'Save Changes' : 'Publish Banner / Hero'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Grid of Banners & Heroes */}
      {(!filteredBanners || filteredBanners.length === 0) ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
          <p className="text-slate-400 font-medium text-sm">
            No hero banner configured for this page yet. Click "Add Banner / Hero" to publish one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBanners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image Previews Container (Side-by-side Desktop & Mobile) */}
              <div className="grid grid-cols-2 bg-slate-900 border-b border-slate-100 relative h-44 sm:h-52">

                {/* Status Pill Badge */}
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs ${banner.active ? 'bg-emerald-500' : 'bg-slate-500'
                    }`}>
                    {banner.isDefault ? 'BUILT-IN ACTIVE' : banner.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>

                {/* Page Placement Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-lg text-[9.5px] font-black uppercase tracking-wider text-white bg-slate-950/85 border border-slate-700/80 backdrop-blur-xs shadow-xs">
                    {getPageBadgeLabel(banner.pageKey)}
                  </span>
                </div>

                {/* Desktop View Image */}
                <div className="relative border-r border-slate-800 overflow-hidden flex items-center justify-center">
                  <img
                    src={banner.image}
                    alt={`${banner.title} Desktop`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border border-slate-700">
                    Desktop
                  </span>
                </div>

                {/* Mobile View Image */}
                <div className="relative overflow-hidden flex items-center justify-center bg-slate-950">
                  {banner.mobileImage ? (
                    <img
                      src={banner.mobileImage}
                      alt={`${banner.title} Mobile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <p className="text-slate-500 text-[10px] italic">No Mobile Image set</p>
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 bg-[#EE3A57]/90 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                    Mobile
                  </span>
                </div>

              </div>

              {/* Details & Actions */}
              <div className="p-4 sm:p-5 space-y-3 text-left">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {banner.title}
                  </h4>
                  {banner.subtitle && (
                    <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.link && (
                    <p className="text-[11px] text-slate-400 font-semibold mt-1">
                      Target Link: <span className="text-[#2563EB]">{banner.link}</span>
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(banner)}
                      className="px-4 py-1.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] text-white rounded-lg text-xs font-bold shadow-xs hover:opacity-95 transition-all cursor-pointer"
                    >
                      EDIT HERO
                    </button>
                    {!banner.isDefault && (
                      <button
                        onClick={() => onToggleBannerStatus(banner.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${banner.active
                            ? 'border border-amber-200 text-amber-600 hover:bg-amber-50'
                            : 'border border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                      >
                        {banner.active ? 'DEACTIVATE' : 'ACTIVATE'}
                      </button>
                    )}
                  </div>

                  {!banner.isDefault && (
                    <button
                      onClick={() => handleDelete(banner)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Delete Banner"
                    >
                      <svg className="w-4 h-4 fill-[#EE3A57]" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
