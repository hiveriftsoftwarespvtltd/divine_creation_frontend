import React, { useState, useMemo } from 'react';
import Swal from 'sweetalert2';

export default function ProductManage({ products = [], categories = [], onAddProduct, onEditProduct, onDeleteProduct }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Search, Filter & Data Table Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('Grade 304 Stainless Steel');
  const [type, setType] = useState('Executive Corporate Gift');
  const [finish, setFinish] = useState('Custom Laser Engraved');
  const [sizes, setSizes] = useState('');
  const [brand, setBrand] = useState('Divine Creations');
  const [weatherproof, setWeatherproof] = useState('Thermal Insulated (12h Hot/Cold)');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  
  // Gallery Images States
  const [galleryFiles, setGalleryFiles] = useState([null]);
  const [galleryUrls, setGalleryUrls] = useState('');

  // Filtering & Sorting Data Table pipeline
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((prod) => {
        const matchesSearch =
          (prod.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (prod.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (prod.material || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (prod.brand || '').toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = categoryFilter === 'All' || prod.category === categoryFilter;
        const matchesMaterial = materialFilter === 'All' || (prod.material && prod.material.includes(materialFilter));

        return matchesSearch && matchesCategory && matchesMaterial;
      })
      .sort((a, b) => {
        let aVal = a[sortField] || '';
        let bVal = b[sortField] || '';
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [products, searchQuery, categoryFilter, materialFilter, sortField, sortOrder]);

  // Calculated Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / itemsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleToggleFeatured = (prod) => {
    const formData = new FormData();
    formData.append('title', prod.title || '');
    formData.append('description', prod.description || '');
    formData.append('material', prod.material || '');
    formData.append('type', prod.type || '');
    formData.append('finish', prod.finish || '');
    formData.append('sizes', prod.sizes || '');
    formData.append('brand', prod.brand || 'Divine Creations');
    formData.append('weatherproof', prod.weatherproof || '');
    formData.append('category', prod.category || '');
    formData.append('image', prod.image || '');
    formData.append('featured', !prod.featured);
    onEditProduct(prod._id || prod.id, formData);
  };

  const openAddForm = () => {
    setTitle('');
    setDescription('');
    setMaterial('Grade 304 Stainless Steel');
    setType('Executive Corporate Gift');
    setFinish('Custom Laser Engraved');
    setSizes('');
    setBrand('Divine Creations');
    setWeatherproof('Thermal Insulated (12h Hot/Cold)');
    setImageUrl('');
    setImageFile(null);
    setCategory(categories[0]?.name || 'Corporate Gifts');
    setTags('');
    setFeatured(false);
    setGalleryFiles([]);
    setGalleryUrls('');
    setEditProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (prod) => {
    setTitle(prod.title || '');
    setDescription(prod.description || '');
    setMaterial(prod.material || 'Grade 304 Stainless Steel');
    setType(prod.type || 'Executive Corporate Gift');
    setFinish(prod.finish || 'Custom Laser Engraved');
    setSizes(prod.sizes || '');
    setBrand(prod.brand || 'Divine Creations');
    setWeatherproof(prod.weatherproof || 'Thermal Insulated');
    setImageUrl(prod.image || '');
    setImageFile(null);
    setCategory(prod.category || categories[0]?.name || 'Corporate Gifts');
    setTags(prod.tags ? prod.tags.join(', ') : '');
    setFeatured(Boolean(prod.featured));
    setGalleryFiles([]);
    setGalleryUrls(prod.images ? prod.images.join(', ') : '');
    setEditProduct(prod);
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t !== '');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('material', material);
    formData.append('type', type);
    formData.append('finish', finish);
    formData.append('sizes', sizes);
    formData.append('brand', brand || 'Divine Creations');
    formData.append('weatherproof', weatherproof);
    formData.append('category', category);
    formData.append('tags', JSON.stringify(tagsArray));
    formData.append('featured', featured);

    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      formData.append('image', imageUrl);
    }

    const activeFiles = Array.isArray(galleryFiles) ? galleryFiles.filter(Boolean) : [];
    if (activeFiles.length > 0) {
      activeFiles.forEach(file => {
        formData.append('images', file);
      });
    } else if (galleryUrls) {
      const urlsArray = galleryUrls.split(',').map(u => u.trim()).filter(Boolean);
      formData.append('images', JSON.stringify(urlsArray));
    }

    if (editProduct) {
      onEditProduct(editProduct._id || editProduct.id, formData);
    } else {
      onAddProduct(formData);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 text-left text-slate-800">

      {/* Top Banner Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Product Management Data Table</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage Divine Creations corporate gifts, drinkware, trophies & executive gift sets catalog.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Corporate Product
        </button>
      </div>

      {/* Data Table Search & Filters Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-grow max-w-md w-full">
          <input
            type="text"
            placeholder="Search by title, category, material or brand..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
          />
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
        </div>

        {/* Filter Dropdowns & Per Page Selector */}
        <div className="flex items-center flex-wrap gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-[#cca040] cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c._id || c.id || c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Rows Per Page */}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-[#cca040] cursor-pointer"
          >
            <option value={5}>5 Rows</option>
            <option value={10}>10 Rows</option>
            <option value={25}>25 Rows</option>
            <option value={50}>50 Rows</option>
          </select>
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setIsFormOpen(false)} />

          <div className="bg-[#faf8f5] border border-[#cca040]/15 rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 text-left">
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
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {editProduct ? `Edit Product: ${editProduct.title}` : 'Add New Corporate Product Listing'}
              </h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Divine Creations Corporate Catalog Form
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left mt-5">

              {/* Featured Checkbox Option */}
              <div className="space-y-1.5 md:col-span-2 bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <label htmlFor="featured-product-checkbox" className="text-xs font-black text-slate-900 cursor-pointer flex items-center gap-2">
                    <input
                      id="featured-product-checkbox"
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4.5 h-4.5 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                    />
                    ⭐ Show on Homepage ("Our Products" Featured Carousel)
                  </label>
                  <p className="text-[10.5px] text-slate-600 font-medium ml-6.5 mt-0.5">
                    Check this box to highlight this product with a gold star on the Homepage slider row.
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${featured ? 'bg-amber-400 text-amber-950 shadow-xs' : 'bg-slate-200 text-slate-600'}`}>
                  {featured ? '⭐ FEATURED' : 'STANDARD'}
                </span>
              </div>

              {/* Title */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Product Title / Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Omega Curved Stainless Steel Vacuum Bottle (600 ML)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Product Description
                </label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed corporate product description..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors resize-none"
                />
              </div>

              {/* Material */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Material & Quality Standard
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                >
                  <option value="Grade 304 Stainless Steel">Grade 304 Stainless Steel</option>
                  <option value="Premium Leatherette">Premium Leatherette</option>
                  <option value="Crystal & Glass">Crystal & Optical Glass</option>
                  <option value="Teak Wood">Teak Wood & Acrylic</option>
                  <option value="Brass Alloy">Brass Alloy & Gold Plated</option>
                  <option value="PU Leather & Metal">PU Leather & Metal</option>
                </select>
              </div>

              {/* Type */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Product Classification
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                >
                  <option value="Executive Corporate Gift">Executive Corporate Gift</option>
                  <option value="Drinkware & Vacuum Flask">Drinkware & Vacuum Flask</option>
                  <option value="Award Trophy Memento">Award Trophy Memento</option>
                  <option value="Diaries & Notebooks">Diaries & Notebooks</option>
                  <option value="Desktop Organizer">Desktop Organizer</option>
                  <option value="Promotional Item">Promotional Item</option>
                </select>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat._id || cat.id || cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Divine Creations"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Finish */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Custom Branding & Finish
                </label>
                <input
                  type="text"
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  placeholder="e.g. Laser Engraved Logo / Electroplated Gold"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Capacity / Sizes */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Capacity / Sizes
                </label>
                <input
                  type="text"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  placeholder="e.g. 500 ML / 600 ML / A5 Size"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Main Image Upload & Live Preview */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                  Main Cover Image *
                </label>
                <div className="flex items-start gap-4">
                  <div className="flex-grow space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or Main Image URL (https://...)"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB] transition-colors"
                    />
                  </div>

                  {/* Main Cover Live Image Preview */}
                  {(imageFile || imageUrl) && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#2563EB] bg-white shrink-0 p-1 shadow-sm group">
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                        alt="Main Cover Preview"
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImageUrl('');
                        }}
                        className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-4.5 h-4.5 text-[10px] font-bold flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Remove Cover Image"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Multiple Gallery Images Upload & Live Thumbnail Grid Preview */}
              <div className="space-y-2 md:col-span-2 bg-blue-50/60 p-4 rounded-xl border border-blue-200/80">
                <label className="text-[11px] font-extrabold text-[#2563EB] uppercase tracking-wider flex items-center justify-between">
                  <span>🖼️ Additional Product Gallery Images (Select Multiple Files)</span>
                  <span className="text-[10px] text-slate-500 font-medium">(Up to 8 Gallery Images)</span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files);
                    setGalleryFiles(prev => Array.isArray(prev) ? [...prev.filter(Boolean), ...newFiles] : newFiles);
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 cursor-pointer"
                />
                <p className="text-[10.5px] text-slate-500 font-medium pt-0.5">
                  Tip: Hold <kbd className="bg-slate-200 text-slate-800 px-1 rounded text-[9px]">Ctrl</kbd> or <kbd className="bg-slate-200 text-slate-800 px-1 rounded text-[9px]">Shift</kbd> while clicking to select multiple files at once.
                </p>

                <input
                  type="text"
                  value={galleryUrls}
                  onChange={(e) => setGalleryUrls(e.target.value)}
                  placeholder="Or Comma-separated Image URLs (https://img1.jpg, https://img2.jpg)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB] transition-colors"
                />

                {/* LIVE THUMBNAILS GRID PREVIEW */}
                {((Array.isArray(galleryFiles) && galleryFiles.filter(Boolean).length > 0) || galleryUrls) && (
                  <div className="space-y-1.5 pt-2.5 border-t border-blue-200/60">
                    <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider block">
                      Uploaded Gallery Images Preview ({Array.isArray(galleryFiles) && galleryFiles.filter(Boolean).length > 0 ? galleryFiles.filter(Boolean).length : galleryUrls.split(',').filter(Boolean).length}):
                    </span>

                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {/* Uploaded File Previews */}
                      {Array.isArray(galleryFiles) && galleryFiles.filter(Boolean).map((file, idx) => (
                        <div key={`file-${idx}`} className="relative w-16 h-16 rounded-xl border-2 border-blue-300 bg-white p-1 shadow-sm group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setGalleryFiles(prev => prev.filter((_, i) => i !== idx));
                            }}
                            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 text-[11px] font-bold flex items-center justify-center shadow hover:bg-red-600 transition-colors cursor-pointer"
                            title="Remove image"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      {/* URL Previews (if URL string provided and no files uploaded) */}
                      {(!Array.isArray(galleryFiles) || galleryFiles.filter(Boolean).length === 0) &&
                        galleryUrls.split(',').map(u => u.trim()).filter(Boolean).map((url, idx) => (
                          <div key={`url-${idx}`} className="relative w-16 h-16 rounded-xl border-2 border-blue-300 bg-white p-1 shadow-sm group">
                            <img
                              src={url}
                              alt={`Gallery URL ${idx + 1}`}
                              className="w-full h-full object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const urls = galleryUrls.split(',').map(u => u.trim()).filter(Boolean);
                                urls.splice(idx, 1);
                                setGalleryUrls(urls.join(', '));
                              }}
                              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 text-[11px] font-bold flex items-center justify-center shadow hover:bg-red-600 transition-colors cursor-pointer"
                              title="Remove URL"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Search Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. bottle, flask, corporate gift, executive, laser engraved"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Form Buttons */}
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
                  {editProduct ? 'Save Product Changes' : 'Publish Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Product List Table */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Product Info</th>
                <th className="py-3.5 px-4 cursor-pointer hover:text-slate-900" onClick={() => handleSort('category')}>
                  Category {sortField === 'category' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="py-3.5 px-4">Material / Standard</th>
                <th className="py-3.5 px-4 text-center">Featured ⭐</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProducts.map((prod) => (
                <tr key={prod._id || prod.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {prod.image ? (
                          <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-[9px]">
                            NO IMG
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs line-clamp-1">{prod.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{prod.brand || 'Divine Creations'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{prod.category}</td>
                  <td className="py-3 px-4 text-slate-600">{prod.material || 'Grade 304 Stainless Steel'}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(prod)}
                      className={`p-2 rounded-xl text-base transition-all cursor-pointer shadow-xs ${
                        prod.featured
                          ? 'bg-amber-100 text-amber-500 border border-amber-300 scale-110 hover:bg-amber-200'
                          : 'bg-slate-50 text-slate-300 border border-slate-200 hover:text-amber-400 hover:border-amber-200'
                      }`}
                      title={prod.featured ? 'Featured on Homepage (Click to unstar)' : 'Click to feature on Homepage'}
                    >
                      {prod.featured ? '⭐' : '☆'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditForm(prod)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: 'Delete Product?',
                            text: 'Are you sure you want to remove this product from the catalog?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#EE3A57',
                            cancelButtonColor: '#64748b',
                            confirmButtonText: 'Yes, delete'
                          }).then((res) => {
                            if (res.isConfirmed) {
                              onDeleteProduct(prod._id || prod.id);
                            }
                          });
                        }}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{paginatedProducts.length}</span> of{' '}
            <span className="font-bold text-slate-800">{filteredAndSortedProducts.length}</span> products
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={activePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Prev
            </button>
            <span className="px-3 py-1.5 text-xs font-bold text-slate-600">
              Page {activePage} of {totalPages}
            </span>
            <button
              disabled={activePage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
