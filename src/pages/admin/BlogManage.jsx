import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function BlogManage({ blogs, onAddBlog, onEditBlog, onDeleteBlog }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [active, setActive] = useState(true);

  const handleOpenAdd = () => {
    setEditBlog(null);
    setTitle('');
    setDate(new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    setDescription('');
    setImageUrl('');
    setImageFile(null);
    setActive(true);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditBlog(blog);
    setTitle(blog.title || '');
    setDate(blog.date || '');
    setDescription(blog.description || '');
    setImageUrl(blog.image || '');
    setImageFile(null);
    setActive(blog.active !== false);
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      Swal.fire({ title: 'Title Required', text: 'Please enter a title for the article.', icon: 'info', confirmButtonColor: '#cca040' });
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('date', date.trim() || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    formData.append('description', description.trim());
    formData.append('active', active ? 'true' : 'false');

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (imageUrl.trim()) {
      formData.append('image', imageUrl.trim());
    } else if (!editBlog) {
      Swal.fire({ title: 'Image Required', text: 'Please select an image file or enter an image URL.', icon: 'info', confirmButtonColor: '#cca040' });
      return;
    }

    if (editBlog) {
      onEditBlog(editBlog._id || editBlog.id, formData);
    } else {
      onAddBlog(formData);
    }

    setIsFormOpen(false);
  };

  const handleDelete = (blog) => {
    Swal.fire({
      title: 'Delete Article?',
      text: `Are you sure you want to delete "${blog.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteBlog(blog._id || blog.id);
      }
    });
  };

  return (
    <div className="space-y-6 text-left text-slate-800">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Articles & Insights</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage your latest blog articles, images, dates, and insights displayed on the website.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Add New Article
        </button>
      </div>

      {/* Articles Grid */}
      {(!blogs || blogs.length === 0) ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <p className="text-slate-400 font-medium text-sm">No articles added yet. Click "Add New Article" to create your first insight post.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id || blog.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Image & Date Badge */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-md px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm">
                  {blog.date}
                </span>
                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    blog.active !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {blog.active !== false ? 'Active' : 'Draft'}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  {blog.description && (
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {blog.description}
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenEdit(blog)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#cca040] hover:bg-amber-50 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog)}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base">
                {editBlog ? 'Edit Article' : 'Add New Article'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
              {/* Article Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to Choose the Perfect Corporate Gifts for Clients"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#cca040] focus:ring-1 focus:ring-[#cca040]"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Article Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. May 10, 2026"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#cca040] focus:ring-1 focus:ring-[#cca040]"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Article Cover Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-[#cca040] hover:file:bg-amber-100 transition-colors"
                />
                <div className="mt-2">
                  <span className="text-[11px] text-slate-400 block mb-1">Or paste Image URL:</span>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#cca040]"
                  />
                </div>
                {(imageFile || imageUrl || (editBlog && editBlog.image)) && (
                  <div className="mt-3 relative h-28 w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : (imageUrl || editBlog?.image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Description / Excerpt
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description or full insight summary..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#cca040] focus:ring-1 focus:ring-[#cca040]"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="blog-active"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-4 h-4 accent-[#cca040] rounded cursor-pointer"
                />
                <label htmlFor="blog-active" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  Publish & Make Visible on Website
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#cca040] hover:bg-[#b58c32] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  {editBlog ? 'Save Changes' : 'Create Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
