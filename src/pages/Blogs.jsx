import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import DynamicPageHero from '../components/DynamicPageHero';
import banner3 from '../assets/a (3).png';
import blogImg1 from '../assets/expertise_buddha_statues.png';
import blogImg2 from '../assets/expertise_meditation_decor.png';
import blogImg3 from '../assets/expertise_wall_art.png';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await api.blogs.getAll();
        if (data && Array.isArray(data)) {
          const formatted = data.map(item => ({
            id: item._id || item.id,
            title: item.title,
            date: item.date || 'Recent',
            image: item.image || blogImg1,
            description: item.description || '',
          }));
          setBlogs(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch blogs in Blogs page:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9F8]">
      {/* ===== Dynamic Hero Banner ===== */}
      <DynamicPageHero
        pageKey="blogs"
        fallbackDesktop={banner3}
        defaultTitle="Our Blogs & Corporate Gifting Insights"
        defaultSubtitle="Discover Expert Insights, Corporate Gifting Trends & Custom Branding Strategies from Divine Creations"
      />

      {/* Search Input Bar */}
      <div className="bg-[#0F172A] py-6 px-4 border-b border-slate-800">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md text-white placeholder-slate-400 border border-slate-700/80 rounded-full px-5 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#EE3A57] focus:ring-1 focus:ring-[#EE3A57] transition-all"
            />
            <svg className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ===== Main Articles Grid ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-[1500px] mx-auto">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#EE3A57] border-t-transparent"></div>
            <p className="text-slate-500 text-xs mt-3 font-semibold">Loading Articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl max-w-lg mx-auto">
            <p className="text-slate-500 text-sm font-semibold">No articles found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-xs font-bold text-[#EE3A57] hover:underline uppercase tracking-wider"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group text-left"
              >
                {/* Cover Image & Date Tag */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#FAF9F8] flex items-center justify-center p-2">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-md px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                    {blog.date}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="space-y-2.5">
                    <Link to={`/blogs/${blog.id}`}>
                      <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug group-hover:text-[#EE3A57] transition-colors">
                        {blog.title}
                      </h3>
                    </Link>
                    {blog.description && (
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
                        {blog.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="text-[#EE3A57] text-xs font-bold uppercase tracking-widest hover:text-[#d92643] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      Read Full Article &rarr;
                    </Link>
                    <Link
                      to="/contact"
                      className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
                    >
                      Enquire &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ===== Article Reading Modal ===== */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden my-8 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-700 p-2 rounded-full shadow-md z-20 transition-all"
            >
              ✕
            </button>

            {/* Modal Cover Image */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-md px-3 py-1 text-xs font-bold text-slate-800 shadow">
                {selectedBlog.date}
              </span>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4 text-left">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {selectedBlog.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
                {selectedBlog.description || 'No detailed content available for this article.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <Link
                  to="/contact"
                  onClick={() => setSelectedBlog(null)}
                  className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  Enquire About Corporate Gifts
                </Link>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
