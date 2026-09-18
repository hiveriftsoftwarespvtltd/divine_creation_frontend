import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', file: null });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        if (id) {
          const data = await api.products.getOne(id).catch(() => null);
          if (data && (data._id || data.id)) {
            setProduct({ ...data, id: data._id || data.id });
            setIsLoading(false);
            return;
          }
        }

        // Smart Fallback: Fetch all products and find matching ID/Title or default to first product
        const allProds = await api.products.getAll().catch(() => []);
        if (Array.isArray(allProds) && allProds.length > 0) {
          const match = allProds.find(p => p._id === id || p.id === id || (p.title && p.title.toLowerCase().includes((id || '').toLowerCase())));
          const targetProduct = match || allProds[0];
          setProduct({ ...targetProduct, id: targetProduct._id || targetProduct.id });
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Failed to load product detail:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  // Load Dynamic Related Products from Database
  useEffect(() => {
    if (!product) return;
    api.products.getAll()
      .then((prods) => {
        if (!Array.isArray(prods)) return;
        const currentId = product._id || product.id;
        const otherProds = prods.filter(p => (p._id || p.id) !== currentId);
        
        // Match same category first
        const sameCatProds = otherProds.filter(p => {
          if (!p.category || !product.category) return false;
          const cat1 = typeof p.category === 'object' ? p.category.name : p.category;
          const cat2 = typeof product.category === 'object' ? product.category.name : product.category;
          return cat1?.toLowerCase() === cat2?.toLowerCase();
        });

        if (sameCatProds.length >= 3) {
          setRelatedProducts(sameCatProds.slice(0, 5));
        } else {
          setRelatedProducts(otherProds.slice(0, 5));
        }
      })
      .catch(err => console.error("Failed to load related products:", err));
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email || '');
      formData.append('subject', `Product Lead: ${product?.title}`);
      formData.append('message', form.message || '');
      if (form.file) {
        formData.append('image', form.file);
      }

      await api.enquiries.create(formData);

      // Construct and open WhatsApp url
      const waMessage = `Hi! I am interested in getting a quote for "${product?.title}".\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || 'N/A'}\n*Requirement:* ${form.message}`;
      const waUrl = `https://wa.me/919818946081?text=${encodeURIComponent(waMessage)}`;

      setEnquirySubmitted(true);

      // Redirect in new tab
      window.open(waUrl, '_blank');

      setTimeout(() => {
        setEnquirySubmitted(false);
        setForm({ name: '', phone: '', email: '', message: '', file: null });
      }, 4000);
    } catch (err) {
      alert("Failed to submit enquiry: " + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FAF9F8]">
        <div className="text-center space-y-4">
          <div className="animate-spin h-10 w-10 border-4 border-[#EE3A57] border-t-transparent rounded-full mx-auto"></div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FAF9F8] text-slate-800">
        <div className="text-center space-y-4">
          <p className="text-lg font-bold">Product not found.</p>
          <Link to="/collections" className="text-[#EE3A57] font-semibold hover:underline">Back to Collections</Link>
        </div>
      </div>
    );
  }

  // Pure dynamic gallery images without dummy fallback assets
  const rawImages = [
    product.image,
    ...(Array.isArray(product.images) ? product.images : [])
  ].filter(Boolean);

  const galleryImages = rawImages.length > 0 ? [...new Set(rawImages)] : [product.image].filter(Boolean);

  const nextImage = () => {
    if (galleryImages.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    if (galleryImages.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const productCategoryName = typeof product.category === 'object' ? product.category?.name : (product.category || 'Corporate Gifts');

  return (
    <div className="w-full bg-[#FAF9F8] min-h-screen text-slate-900 pb-16">

      {/* Top Header / Breadcrumb Section (Hidden on mobile) */}
      <div className="hidden md:block max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-4 text-left">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#EE3A57] transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link to="/collections" className="hover:text-[#EE3A57] transition-colors">Our Products</Link>
          <span>&rsaquo;</span>
          <Link to={`/collections?category=${encodeURIComponent(productCategoryName)}`} className="hover:text-[#EE3A57] transition-colors">
            {productCategoryName}
          </Link>
          <span>&rsaquo;</span>
          <span className="text-[#EE3A57] font-semibold">{product.title}</span>
        </nav>
      </div>

      {/* Main 12-Column Grid Layout */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-8 items-start">

          {/* ================= COLUMN 1: Image Gallery (col-span-5) ================= */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            {/* Active Display Image */}
            <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm flex items-center justify-center group p-4">
              <img
                src={galleryImages[activeIndex] || product.image}
                alt={`${product.title} Main view`}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Left Slider Arrow */}
              {galleryImages.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200 shadow flex items-center justify-center text-slate-700 hover:text-[#EE3A57] transition-colors focus:outline-none cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}

              {/* Right Slider Arrow */}
              {galleryImages.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200 shadow flex items-center justify-center text-slate-700 hover:text-[#EE3A57] transition-colors focus:outline-none cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}
            </div>

            {/* Thumbnails list row */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border shrink-0 bg-white transition-all p-1.5 flex items-center justify-center cursor-pointer ${
                        isActive
                          ? 'border-2 border-[#EE3A57] shadow-sm scale-95'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================= COLUMN 2: Details & Specs (col-span-4) ================= */}
          <div className="md:col-span-6 lg:col-span-4 text-left space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">
                {productCategoryName}
              </span>

              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.title}
              </h1>

              {/* Brand Gradient Bar */}
              <div className="flex items-center gap-2 pt-1 pb-1">
                <div className="h-[3px] w-20 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
                <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {product.description || `Elevate your corporate brand presence with ${product.title} from Divine Creations. Manufactured with top-grade materials, custom laser engraving, and executive gift packaging for corporate events, employee recognition, and client promotions.`}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700">
                <svg className="w-3.5 h-3.5 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                Custom Logo Engraving
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700">
                <svg className="w-3.5 h-3.5 text-[#2563EB]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Corporate Quality Assured
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700">
                <svg className="w-3.5 h-3.5 text-[#EE3A57]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177V3.917c0-.621-.504-1.125-1.125-1.125H1.875C1.254 2.792.75 3.296.75 3.917V14.25M14.25 7.5v11.25" />
                </svg>
                Bulk Delivery
              </span>
            </div>

            {/* Specifications Dividers Layout */}
            <div className="border-t border-b border-slate-200 py-4 grid grid-cols-2 gap-4 text-sm divide-x divide-slate-200">
              {/* Material */}
              <div className="space-y-1">
                <span className="text-[10.5px] text-slate-500 font-bold uppercase tracking-wider block">Material:</span>
                <p className="text-slate-800 font-bold leading-tight">
                  {product.material || 'Stainless Steel 304 / Leatherette'}
                </p>
              </div>

              {/* Sizes */}
              <div className="space-y-1 pl-6">
                <span className="text-[10.5px] text-slate-500 font-bold uppercase tracking-wider block">Available Sizes:</span>
                <p className="text-slate-800 font-bold leading-tight">
                  {product.sizes || product.size || 'Standard Size'}
                </p>
                <span className="text-[11px] text-slate-500 font-medium block mt-0.5">( Custom options available )</span>
              </div>
            </div>

            {/* Customize / Special Design Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-3.5 items-center shadow-sm">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#EE3A57]/10 flex items-center justify-center text-[#EE3A57]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l-.707.707M12 5a7 7 0 00-7 7c0 2.9 1.76 5.39 4.3 6.46a1 1 0 01.7.94v1.6a1 1 0 001 1h2a1 1 0 001-1v-1.6a1 1 0 01.7-.94c2.54-1.07 4.3-3.56 4.3-6.46a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="space-y-0.5 text-left">
                <h4 className="text-slate-900 text-xs sm:text-sm font-bold">Have a Custom Requirement?</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  We customize this product with your corporate logo, custom colors, and laser engraving.
                </p>
              </div>
            </div>

            {/* Action Buttons Stack */}
            <div className="space-y-2.5 pt-1">
              {/* WhatsApp Us */}
              <a
                href={`https://wa.me/919818946081?text=Hi! I am interested in getting a quote for "${product.title}".`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 text-center cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12.004 0C5.378 0 0 5.373 0 12.001c.002 2.115.552 4.178 1.6 6.002L.057 24l6.155-1.616c1.782.972 3.791 1.488 5.82 1.49h.005c6.627 0 12.003-5.373 12.003-12.001C24.04 5.373 18.631 0 12.004 0zm0 22.02c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.79.99 1.01-3.69-.24-.38a9.98 9.98 0 0 1-1.52-5.33c.003-5.52 4.5-10.01 10.02-10.01 2.67 0 5.19 1.04 7.08 2.93a9.91 9.91 0 0 1 2.93 7.09c-.003 5.53-4.5 10.02-10.02 10.02z" />
                </svg>
                WhatsApp Quote (+91 98189 46081)
              </a>

              {/* Call Us Directly */}
              <a
                href="tel:+919811066081"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 text-center cursor-pointer border border-slate-200"
              >
                <svg className="w-3.5 h-3.5 text-[#EE3A57]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Directly: +91 98110 66081
              </a>
            </div>

          </div>

          {/* ================= COLUMN 3: Enquiry Form (col-span-3) ================= */}
          <div id="enquiry-form" className="md:col-span-12 lg:col-span-3 space-y-5">

            {/* Enquiry Card Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 text-left shadow-sm">
              <div className="space-y-1 border-b border-slate-100 pb-2.5">
                <h2 className="font-serif text-sm font-bold uppercase tracking-wider text-slate-900">
                  SEND US AN ENQUIRY
                </h2>
                <p className="text-[12px] text-slate-500 font-medium">
                  Our team will get back to you within a few hours
                </p>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                {enquirySubmitted && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-2 rounded-xl transition-all">
                    ✓ Enquiry submitted! Opening WhatsApp...
                  </div>
                )}

                {/* Name */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    className="w-full bg-white border border-slate-300 focus:border-[#EE3A57] rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number *"
                    className="w-full bg-white border border-slate-300 focus:border-[#EE3A57] rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full bg-white border border-slate-300 focus:border-[#EE3A57] rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* Dropdown Product Selector */}
                <div>
                  <select
                    disabled
                    value={product.title}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none transition-colors shadow-sm cursor-not-allowed font-medium line-clamp-1"
                  >
                    <option>{product.title}</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    rows="3"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message / Requirements"
                    className="w-full bg-white border border-slate-300 focus:border-[#EE3A57] rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none transition-colors shadow-sm resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                  >
                    <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    Submit Enquiry
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

        {/* Horizontal Features Row */}
        <div className="border border-slate-200/80 bg-white py-6 px-4 sm:px-6 lg:px-8 mt-12 mb-10 rounded-2xl shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0 items-center justify-center lg:divide-x lg:divide-slate-200">

            {/* Badge 1: Thumbs Up */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#EE3A57]/10 flex items-center justify-center text-[#EE3A57] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.5m-9 0a2.25 2.25 0 00-2.25-2.25H3a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25h.75A2.25 2.25 0 006 18.75V15" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">
                Premium <br />Quality Material
              </span>
            </div>

            {/* Badge 2: Expert Artisans */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">
                Expert <br />Craftsmanship
              </span>
            </div>

            {/* Badge 3: Fully Customizable */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#EE3A57]/10 flex items-center justify-center text-[#EE3A57] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">
                Fully <br />Customizable
              </span>
            </div>

            {/* Badge 4: Pan India Delivery */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177V3.917c0-.621-.504-1.125-1.125-1.125H1.875C1.254 2.792.75 3.296.75 3.917V14.25M14.25 7.5v11.25" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">
                Pan India <br />Delivery
              </span>
            </div>

            {/* Badge 5: Safe & Secure Packaging */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#EE3A57]/10 flex items-center justify-center text-[#EE3A57] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">
                Safe & Secure <br />Packaging
              </span>
            </div>

            {/* Badge 6: Dedicated Customer Support */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12v6c0 1.1.9 2 2 2h2v-8H4v-2c0-4.41 3.59-8 8-8s8 4.41 8 8v2h-2v8h2c1.1 0 2-.9 2-2v-6c0-5.52-4.48-10-10-10z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700 leading-tight">
                Dedicated <br />Support
              </span>
            </div>

          </div>
        </div>

        {/* Description Tabs and Why Choose Us Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">

          {/* LEFT COLUMN: Tabbed Panel (col-span-8) */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {/* Tabs row headers */}
            <div className="flex border-b border-slate-200 gap-6 overflow-x-auto scrollbar-none pb-1">
              {[
                { id: 'description', label: 'Product Description' },
                { id: 'specs', label: 'Specifications' },
                { id: 'apps', label: 'Applications' },
                { id: 'care', label: 'Care Instructions' },
                { id: 'faq', label: 'FAQ' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 text-xs sm:text-sm font-bold tracking-wide transition-all border-b-2 focus:outline-none shrink-0 cursor-pointer ${
                      isActive
                        ? 'border-[#EE3A57] text-[#EE3A57]'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active tab content view */}
            <div className="min-h-[200px] transition-all duration-300 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    <p>
                      {product.description || `This Divine Creations product is manufactured using premium grade raw materials sourced from certified suppliers. Specially designed for corporate gifting, brand promotions, annual client meetings, and employee recognition.`}
                    </p>
                    <p>
                      Equipped with Fiber Laser Marking, Blind Leather Embossing, Chemical Etching, and Custom Box Packaging, each product can be customized with your company logo and personalized message to maximize brand awareness.
                    </p>
                  </div>

                  {/* Perfect For Corporate Applications */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Perfect For:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-700">
                      {[
                        'Corporate Offices',
                        'Executive Boardrooms',
                        'Annual Conferences',
                        'Client Appreciation Gifts',
                        'Employee Recognition',
                        'Exhibitions & Trade Expos'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#EE3A57]/15 text-[#EE3A57] flex items-center justify-center text-[10px] shrink-0 font-bold">
                            ✓
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4 text-xs sm:text-sm font-medium text-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Brand:</span>
                      <span className="font-bold text-slate-900">Divine Creations</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Category:</span>
                      <span className="font-bold text-slate-900">{productCategoryName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Base Material:</span>
                      <span className="font-bold text-slate-900">{product.material || 'Stainless Steel 304 / Leatherette'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Sizes Available:</span>
                      <span className="font-bold text-slate-900">{product.sizes || product.size || 'Standard Size'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Logo Branding:</span>
                      <span className="font-bold text-slate-900">Laser Engraving / Screen Printing</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Packaging:</span>
                      <span className="font-bold text-slate-900">Custom Branded Gift Box</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'apps' && (
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  <p className="font-bold text-slate-900 text-sm">Recommended Uses & Applications:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Corporate Gifting & Welcome Kits</strong>: Ideal for new employee onboarding hampers, festival gifts, and client giveaways.</li>
                    <li><strong>Executive Boardrooms & Conferences</strong>: Professional accessories for leadership summits, annual general meetings, and corporate events.</li>
                    <li><strong>Promotional Marketing</strong>: High-recall customized branded merchandise to elevate company brand visibility.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  <p className="font-bold text-slate-900 text-sm">Maintenance & Care Advice:</p>
                  <ul className="list-decimal pl-5 space-y-2">
                    <li>Wipe with a clean, soft micro-fiber cloth to retain metallic luster and surface finish.</li>
                    <li>For drinkware items, hand wash gently with mild detergent; avoid harsh abrasive scrubbers on laser engraved logo areas.</li>
                    <li>Store in original velvet / gift packaging box when not in use.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900">Q: Can we print our company logo on bulk orders?</h4>
                    <p className="text-slate-600 font-medium">A: Yes! We provide high-precision laser marking, screen printing, and blind debossing on all bulk corporate gift orders.</p>
                  </div>
                  <div className="space-y-1 border-t border-slate-100 pt-3">
                    <h4 className="font-bold text-slate-900">Q: What is the estimated lead time for bulk orders?</h4>
                    <p className="text-slate-600 font-medium">A: As a direct manufacturer in New Delhi, standard bulk orders are processed and dispatched within 3 to 7 business days across India.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Why Choose Us Card with Made In India Badge (col-span-4) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-sm">
            <h3 className="font-serif text-sm sm:text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-4">
              Why Choose Divine Creations?
            </h3>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-5 justify-between">
              {/* List */}
              <div className="space-y-3.5 text-xs sm:text-sm font-semibold text-slate-800 flex-grow">
                {[
                  '500+ Executive Designs',
                  '18+ Years Manufacturing Experience',
                  '150+ Happy Corporate Clients',
                  'Custom Logo Laser Engraving Specialist',
                  'Fast Pan-India Wholesale Shipping'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center text-[11px] shrink-0 font-bold">
                      ✓
                    </span>
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>

              {/* Hexagon Made In India Badge */}
              <div className="relative w-28 h-28 flex flex-col items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-slate-50 border border-slate-200 shadow-sm" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />

                <div className="relative z-10 flex flex-col items-center text-center space-y-1">
                  <div className="flex flex-col gap-0.5 items-center">
                    <div className="w-12 h-1.5 bg-[#FF9933] rounded-sm" />
                    <div className="w-12 h-1.5 bg-white border border-slate-100 flex items-center justify-center relative">
                      <div className="w-2.5 h-2.5 rounded-full border border-blue-900 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-blue-900" />
                      </div>
                    </div>
                    <div className="w-12 h-1.5 bg-[#128807] rounded-sm" />
                  </div>

                  <div className="space-y-0.5 pt-1.5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block leading-none">MADE IN</span>
                    <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest block leading-none">INDIA</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Related Products Section from Database */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-slate-200/80 pt-10 text-left">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-gradient-to-b from-[#EE3A57] to-[#2563EB] rounded-full" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Related Corporate Products
                </h2>
              </div>

              <Link
                to="/collections"
                className="text-xs sm:text-sm font-bold text-[#EE3A57] hover:text-[#2563EB] flex items-center gap-1 transition-colors"
              >
                View All Products &rarr;
              </Link>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {relatedProducts.map((prod) => {
                const prodId = prod._id || prod.id;
                const prodCat = typeof prod.category === 'object' ? prod.category?.name : (prod.category || 'Corporate Gifts');
                return (
                  <div
                    key={prodId}
                    onClick={() => navigate(`/product/${prodId}`)}
                    className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  >
                    {/* Image Block */}
                    <div className="relative aspect-square bg-slate-50 overflow-hidden flex items-center justify-center p-3">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Content Block */}
                    <div className="p-3.5 space-y-2.5 text-center flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-[#EE3A57] transition-colors">
                          {prod.title}
                        </h4>
                        <span className="text-[10.5px] text-slate-500 font-semibold block mt-0.5">
                          {prodCat}
                        </span>
                      </div>

                      {/* GET QUOTE Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${prodId}`);
                        }}
                        className="w-full bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-[10.5px] font-bold uppercase tracking-wider py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        GET QUOTE
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Custom Design Banner CTA */}
        <div className="mt-16 bg-slate-950 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl border border-slate-800 text-left">
          {/* Text Section */}
          <div className="space-y-2 z-10 max-w-xl">
            <h3 className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#EE3A57] to-[#60A5FA] bg-clip-text text-transparent">
              Have a Custom Design in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Share your custom corporate gifting requirements with Divine Creations. We design & craft bespoke gift sets with your brand logo.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 z-10 shrink-0">
            <a
              href="tel:+919811066081"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02]"
            >
              📞 Call +91 98110 66081
            </a>

            <a
              href="https://wa.me/919818946081?text=Hi! I want to discuss a custom design project with your experts."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02]"
            >
              💬 WhatsApp +91 98189 46081
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
