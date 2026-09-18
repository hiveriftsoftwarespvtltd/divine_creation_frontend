import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function ClientManage({ clients, onAddClient, onDeleteClient, content, onSaveContent }) {
  // Modal states
  const [isHeadingModalOpen, setIsHeadingModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Section Heading & highlight state
  const [sectionTitle, setSectionTitle] = useState(content?.trustedBrandsTitle || 'Trusted by Businesses Across India');
  const [sectionHighlight, setSectionHighlight] = useState(content?.trustedBrandsHighlight !== undefined ? content.trustedBrandsHighlight : 'Businesses');
  const [sectionSubtitle, setSectionSubtitle] = useState(content?.trustedBrandsSubtitle || '');
  const [isSavingContent, setIsSavingContent] = useState(false);

  // Add client form state
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    if (content) {
      if (content.trustedBrandsTitle !== undefined) {
        setSectionTitle(content.trustedBrandsTitle);
      }
      if (content.trustedBrandsHighlight !== undefined) {
        setSectionHighlight(content.trustedBrandsHighlight);
      }
      if (content.trustedBrandsSubtitle !== undefined) {
        setSectionSubtitle(content.trustedBrandsSubtitle);
      }
    }
  }, [content]);

  const openHeadingModal = () => {
    setSectionTitle(content?.trustedBrandsTitle || 'Trusted by Businesses Across India');
    setSectionHighlight(content?.trustedBrandsHighlight !== undefined ? content.trustedBrandsHighlight : 'Businesses');
    setSectionSubtitle(content?.trustedBrandsSubtitle || '');
    setIsHeadingModalOpen(true);
  };

  const handleSaveSectionSettings = async (e) => {
    e.preventDefault();
    if (!sectionTitle.trim()) {
      Swal.fire({
        title: 'Title Required',
        text: 'Please enter a section heading for the Trusted Brands section.',
        icon: 'warning',
        confirmButtonColor: '#EE3A57',
      });
      return;
    }

    if (onSaveContent) {
      setIsSavingContent(true);
      try {
        await onSaveContent({
          ...content,
          trustedBrandsTitle: sectionTitle.trim(),
          trustedBrandsHighlight: sectionHighlight.trim(),
          trustedBrandsSubtitle: sectionSubtitle.trim(),
        });
        setIsHeadingModalOpen(false);
      } finally {
        setIsSavingContent(false);
      }
    }
  };

  const openAddForm = () => {
    setName('');
    setLogoUrl('');
    setLogoFile(null);
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      Swal.fire({ title: 'Client Name Required', text: 'Please specify the client name', icon: 'info', confirmButtonColor: '#EE3A57' });
      return;
    }
    if (!logoFile && !logoUrl.trim()) {
      Swal.fire({ title: 'Logo Required', text: 'Please upload a file or specify a logo image URL', icon: 'info', confirmButtonColor: '#EE3A57' });
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    if (logoFile) {
      formData.append('logo', logoFile);
    } else {
      formData.append('logo', logoUrl.trim());
    }

    onAddClient(formData);
    setIsFormOpen(false);
  };

  // Helper to render title with gradient highlight
  const renderFormattedHeading = (titleStr, highlightStr) => {
    const rawTitle = titleStr || 'Trusted by Businesses Across India';
    const highlight = (highlightStr || '').trim();

    if (!highlight) {
      return rawTitle;
    }

    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i');
    const parts = rawTitle.split(regex);

    if (parts.length === 1) {
      return rawTitle;
    }

    return parts.map((part, idx) => {
      if (part.toLowerCase() === highlight.toLowerCase()) {
        return (
          <span key={idx} className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const currentActiveTitle = content?.trustedBrandsTitle || 'Trusted by Businesses Across India';
  const currentActiveHighlight = content?.trustedBrandsHighlight !== undefined ? content.trustedBrandsHighlight : 'Businesses';
  const currentActiveSubtitle = content?.trustedBrandsSubtitle || '';

  return (
    <div className="space-y-8 text-left text-slate-800">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
            Trusted by Businesses Across India
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage the section heading and brand logos displayed in the homepage trust marquee.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Popup Button 1: Edit Section Heading */}
          <button
            onClick={openHeadingModal}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 text-xs font-extrabold uppercase tracking-wider rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#EE3A57]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Section Heading
          </button>

          {/* Popup Button 2: Add New Brand Logo */}
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Brand Logo
          </button>
        </div>
      </div>

      {/* Section Heading Summary & Live Display Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EE3A57] flex items-center justify-center font-bold shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-black text-slate-900">Current Section Heading</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Active On Site
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Click "Edit Heading" to update the text in a popup dialog.</p>
            </div>
          </div>
          <button
            onClick={openHeadingModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-[#EE3A57] text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Heading
          </button>
        </div>

        {/* Live Preview Bar */}
        <div className="mt-5 bg-[#f5f2eb] rounded-2xl p-5 border border-slate-200/80 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Live Website Preview</p>
          </div>
          <h3 className="font-serif text-sm sm:text-base md:text-xl font-black uppercase tracking-[0.25em] text-slate-900 px-2">
            {renderFormattedHeading(currentActiveTitle, currentActiveHighlight)}
          </h3>
          {currentActiveSubtitle ? (
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto tracking-normal">
              {currentActiveSubtitle}
            </p>
          ) : (
            <p className="text-[11px] text-slate-400 italic">No subtitle set (Optional)</p>
          )}
        </div>
      </div>

      {/* Section 2: Brand Logos Manager */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-lg font-black text-slate-900">Brand / Client Logos</h2>
              <p className="text-xs text-slate-500 font-medium">Logos scrolling continuously in the homepage marquee and clients page.</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            {clients.length} Brands Active
          </span>
        </div>

        {/* Main Grid: Client Cards */}
        {clients.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-12 text-center text-slate-400 font-semibold text-xs">
            No brand logos found. Click 'Add New Brand Logo' to start!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {clients.map((client) => (
              <div
                key={client._id || client.id}
                className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between p-4 min-h-[160px]"
              >
                {/* Logo Area */}
                <div className="w-full flex-grow flex items-center justify-center p-2 relative bg-slate-50 rounded-xl overflow-hidden min-h-[100px]">
                  <img
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    className="max-h-16 max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Delete Button overlay */}
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: 'Remove Brand?',
                        text: `Are you sure you want to remove "${client.name}" from the marquee?`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#EE3A57',
                        cancelButtonColor: '#64748b',
                        confirmButtonText: 'Yes, remove!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          onDeleteClient(client._id || client.id);
                        }
                      });
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white/95 backdrop-blur-xs border border-red-50 hover:bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                    title="Remove Brand Logo"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Name Details */}
                <h4 className="text-slate-700 text-center text-[11px] font-bold mt-3 leading-tight tracking-wide border-t border-slate-50 pt-2 shrink-0">
                  {client.name}
                </h4>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POPUP MODAL 1: Section Heading Settings */}
      {isHeadingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl space-y-6 text-left border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EE3A57] flex items-center justify-center font-bold shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-black text-slate-900">Edit Section Heading</h3>
                  <p className="text-xs text-slate-500 font-medium">Update section title, gradient word & description</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsHeadingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveSectionSettings} className="space-y-4">
              {/* Input: Section Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <span>Section Heading / Title</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  placeholder="e.g. Trusted by Businesses Across India"
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#EE3A57] focus:bg-white transition-all font-medium text-slate-800"
                />
                <p className="text-[11px] text-slate-400">Full heading shown above the brand logos marquee.</p>
              </div>

              {/* Input: Highlight Word */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center justify-between">
                  <span>Gradient Highlight Word</span>
                  <span className="text-[10px] font-semibold text-[#EE3A57] normal-case bg-red-50 px-2 py-0.5 rounded-full">Glowing Gradient</span>
                </label>
                <input
                  type="text"
                  value={sectionHighlight}
                  onChange={(e) => setSectionHighlight(e.target.value)}
                  placeholder="e.g. Businesses"
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#2563EB] focus:bg-white transition-all font-medium text-slate-800"
                />
                <p className="text-[11px] text-slate-400">Word from the title to display in vibrant red-to-blue gradient.</p>
              </div>

              {/* Input: Subtitle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Section Subtitle / Tagline <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={sectionSubtitle}
                  onChange={(e) => setSectionSubtitle(e.target.value)}
                  placeholder="e.g. Delivering premium customized executive gifts & awards across India"
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#EE3A57] focus:bg-white transition-all font-medium text-slate-800"
                />
                <p className="text-[11px] text-slate-400">Optional subtitle displayed beneath the heading.</p>
              </div>

              {/* Real-time Live Preview Box inside Modal */}
              <div className="bg-[#f5f2eb] rounded-2xl p-4 border border-slate-200/80 text-center space-y-1.5 mt-3">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Live Website Preview</p>
                </div>
                <h4 className="font-serif text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.2em] text-slate-900 px-2">
                  {renderFormattedHeading(sectionTitle, sectionHighlight)}
                </h4>
                {sectionSubtitle && (
                  <p className="text-xs text-slate-600 font-medium max-w-md mx-auto tracking-normal">
                    {sectionSubtitle}
                  </p>
                )}
              </div>

              {/* Modal Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsHeadingModalOpen(false)}
                  className="px-5 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingContent}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xl bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingContent ? (
                    <>
                      <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Save Heading
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL 2: Add New Brand Logo */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-6 text-left border border-slate-100">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-black text-slate-900">Add Brand Logo</h3>
                <p className="text-xs text-slate-500 font-medium">Upload brand logo to include in the marquee</p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input: Client Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Brand / Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Border Security Force (BSF) or Tata"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#EE3A57] focus:bg-white transition-all font-medium text-slate-800"
                />
              </div>

              {/* Upload choice 1: File upload */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Upload Logo Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setLogoFile(e.target.files[0]);
                    setLogoUrl(''); // reset text input if file selected
                  }}
                  className="w-full text-xs font-medium text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                />
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">Or specify URL</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              {/* Upload choice 2: Logo URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Logo Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  disabled={!!logoFile}
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#EE3A57] focus:bg-white transition-all font-medium text-slate-800 disabled:opacity-50"
                />
              </div>

              {/* Actions row */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xl bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white shadow-md transition-all cursor-pointer"
                >
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
