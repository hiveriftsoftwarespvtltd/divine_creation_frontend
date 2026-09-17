import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import blogImg1 from '../assets/expertise_buddha_statues.png';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        // Try getting single blog or all blogs
        let data = null;
        try {
          data = await api.blogs.getOne(id);
        } catch (e) {
          // Fallback: fetch all and find by ID
          const all = await api.blogs.getAll();
          data = all.find(item => (item._id || item.id) === id);
        }

        if (data) {
          setBlog({
            id: data._id || data.id,
            title: data.title,
            date: data.date || 'Recent',
            image: data.image || blogImg1,
            description: data.description || '',
          });
        }

        // Fetch related blogs for bottom section
        const allBlogs = await api.blogs.getAll();
        if (allBlogs && Array.isArray(allBlogs)) {
          const otherBlogs = allBlogs
            .filter(b => (b._id || b.id) !== id)
            .map(b => ({
              id: b._id || b.id,
              title: b.title,
              date: b.date || 'Recent',
              image: b.image || blogImg1,
            }))
            .slice(0, 3);
          setRelatedBlogs(otherBlogs);
        }
      } catch (err) {
        console.error('Failed to load blog detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F8] flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#EE3A57] border-t-transparent"></div>
          <p className="text-slate-600 text-sm font-bold uppercase tracking-wider">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FAF9F8] py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-10 space-y-4 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-slate-900">Article Not Found</h2>
          <p className="text-slate-500 text-xs sm:text-sm">The blog article you are looking for might have been moved or removed.</p>
          <Link
            to="/blogs"
            className="inline-block bg-gradient-to-r from-[#EE3A57] to-[#2563EB] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-all shadow-md"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F8] text-slate-900">
      {/* ===== Breadcrumbs Header ===== */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#EE3A57]">Home</Link>
          <span>/</span>
          <Link to="/blogs" className="hover:text-[#EE3A57]">Blogs</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-xs">{blog.title}</span>
        </div>
      </div>

      {/* ===== Article Main Container ===== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8 text-left">

        {/* Article Meta Header */}
        <div className="space-y-4 border-b border-slate-200 pb-6">
          <span className="inline-block bg-[#EE3A57]/15 text-[#EE3A57] text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-[#EE3A57]/30">
            {blog.date || 'Corporate Insights'}
          </span>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight text-slate-900">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
            <span>Published by Divine Creations</span>
            <span>•</span>
            <span>3 Min Read</span>
          </div>
        </div>

        {/* Article Featured Image */}
        {blog.image && (
          <div className="w-full h-[300px] sm:h-[450px] rounded-2xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200/80">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

          {/* Navigation Back */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/blogs"
              className="text-[#EE3A57] text-xs font-bold uppercase tracking-wider hover:underline"
            >
              ← Back to All Articles
            </Link>
            <Link
              to="/contact"
              className="text-slate-600 hover:text-slate-900 text-xs font-bold uppercase tracking-wider"
            >
              Contact Studio
            </Link>
        </div>
      </div>

      {/* ===== Related Articles Section ===== */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 px-4 sm:px-8 border-t border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto space-y-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Related Articles & Insights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id}
                  to={`/blogs/${item.id}`}
                  className="group bg-[#FAF9F8] border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="h-36 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#EE3A57] transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {item.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
