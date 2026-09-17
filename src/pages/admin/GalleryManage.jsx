import React, { useState, useMemo } from 'react';
import Swal from 'sweetalert2';

const DEFAULT_GALLERY_CATEGORIES = [
  'Corporate Gifts',
  'Drinkware & Flasks',
  'Gift Sets & Notebooks',
  'Mementos & Trophies',
  'Kitchenware & Dinner Sets',
  'Wall Clocks',
  'Bar Accessories',
  'Desktop Collection',
  'Others'
];

export default function GalleryManage({ gallery = [], categories = [], onAddGalleryItem, onDeleteGalleryItem }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Dynamic Categories merger (Combines DB categories, default list, and items in gallery)
  const allCategories = useMemo(() => {
    const dbCatNames = categories.map(c => typeof c === 'object' ? c.name : c).filter(Boolean);
    const galleryCatNames = gallery.map(g => g.category).filter(Boolean);
    const merged = [...new Set([...dbCatNames, ...DEFAULT_GALLERY_CATEGORIES, ...galleryCatNames])];
    return merged;
  }, [categories, gallery]);

  const [selectedCategory, setSelectedCategory] = useState(allCategories[0] || 'Corporate Gifts');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [filterTab, setFilterTab] = useState('All');

  const openAddForm = () => {
    setSelectedCategory(allCategories[0] || 'Corporate Gifts');
    setImageUrl('');
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile && !imageUrl.trim()) {
      Swal.fire({ title: 'Upload Photo', text: 'Please upload a file or specify an image URL', icon: 'info', confirmButtonColor: '#2563EB' });
      return;
    }

    const formData = new FormData();
    formData.append('category', selectedCategory);
    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      formData.append('image', imageUrl.trim());
    }

    onAddGalleryItem(formData);
    setIsFormOpen(false);
  };

  const filteredGallery = gallery.filter(item => {
    return filterTab === 'All' || item.category === filterTab;
  });

  return (
    <div className="space-y-6 text-left text-slate-800">
      
      {/* Top Banner Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Gallery Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Upload and organize showcase photos across catalog collections.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Upload Showcase Photo
        </button>
      </div>

      {/* Categories Filter Bar - Mobile & Desktop Responsive */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        {/* Mobile Dropdown Selector (visible on mobile < md) */}
        <div className="md:hidden space-y-1">
          <label className="text-[10.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
            Filter Gallery by Category:
          </label>
          <select
            value={filterTab}
            onChange={(e) => setFilterTab(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#2563EB] cursor-pointer"
          >
            {['All', ...allCategories].map((cat) => {
              const count = cat === 'All' ? gallery.length : gallery.filter(i => i.category === cat).length;
              return (
                <option key={cat} value={cat}>
                  {cat} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {/* Single-Row Horizontal Scrollable Pills (No infinite vertical stacking) */}
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-1">
          {['All', ...allCategories].map((cat) => {
            const count = cat === 'All' ? gallery.length : gallery.filter(i => i.category === cat).length;
            const isActive = filterTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterTab(cat)}
                className={`px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0a0e26] text-white shadow-sm scale-102'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                }`}
              >
                {cat} <span className={`text-[10px] ml-0.5 ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Form Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          {/* Backdrop click trigger */}
          <div className="absolute inset-0" onClick={() => setIsFormOpen(false)} />

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 text-left">
            {/* Close Cross icon */}
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
              <h3 className="font-serif text-lg font-bold text-slate-900">Upload Gallery Showcase Photo</h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                Add photo to catalog showcase gallery
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left mt-5">
              {/* Category Dropdown */}
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                  Select Showcase Category ({allCategories.length} Categories Available)
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#2563EB] transition-colors cursor-pointer"
                >
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Photo upload with Live Preview */}
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                  Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 cursor-pointer"
                />
              </div>

              {/* URL input */}
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                  Or Paste Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB] transition-colors"
                />
              </div>

              {/* Live Image Preview */}
              {(imageFile || imageUrl) && (
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Photo Preview:</span>
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-[#2563EB] bg-white p-1 shadow-sm">
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                      alt="Gallery Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Buttons stack */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Publish Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Showcase Photos Grid */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
          Published Showcase Items ({filteredGallery.length})
        </h2>

        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item._id || item.id}
                className="group bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden relative shadow-xs flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-white p-2">
                  <img
                    src={item.image}
                    alt={item.category}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={() => onDeleteGalleryItem(item._id || item.id)}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl shadow-md transition-all cursor-pointer"
                    title="Delete Photo"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
                <div className="p-3 bg-white border-t border-slate-100">
                  <span className="text-[10.5px] font-bold text-[#EE3A57] uppercase tracking-wider block truncate">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <p className="text-sm font-bold">No gallery photos found for this category.</p>
            <p className="text-xs">Click "Upload Showcase Photo" above to add images.</p>
          </div>
        )}
      </div>

    </div>
  );
}
