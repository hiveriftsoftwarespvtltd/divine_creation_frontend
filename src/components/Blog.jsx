import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogImg1 from '../assets/expertise_buddha_statues.png';
import blogImg2 from '../assets/expertise_meditation_decor.png';
import blogImg3 from '../assets/expertise_wall_art.png';
import { api } from '../utils/api';

export default function Blog() {
  const scrollRef = useRef(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.blogs.getAll()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data.map(b => ({
            id: b._id || b.id,
            title: b.title,
            date: b.date || new Date(b.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            image: b.image || blogImg1
          })));
        }
      })
      .catch(err => console.error("Failed to fetch blogs for home section:", err));
  }, []);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.blog-card');
      const cardWidth = card ? card.clientWidth : 280;
      scrollRef.current.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.blog-card');
      const cardWidth = card ? card.clientWidth : 280;
      scrollRef.current.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
    }
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="bg-white py-10 sm:py-14 px-4 sm:px-8 lg:px-12 border-b border-slate-100 text-left">
      <div className="max-w-[1750px] mx-auto space-y-6">
        
        {/* Header Row + Navigation Controls */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-black uppercase tracking-[0.15em] text-[#EE3A57]">
            Latest Articles & Insights
          </h2>

          {/* Carousel Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleScrollLeft}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-[#EE3A57] bg-white hover:bg-[#EE3A57] text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
              title="Scroll Left"
              aria-label="Previous Article"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleScrollRight}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-[#EE3A57] bg-white hover:bg-[#EE3A57] text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
              title="Scroll Right"
              aria-label="Next Article"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Full-Width Horizontal Scroll Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
        >
          {posts.map((post, idx) => (
            <article
              key={post.id || idx}
              className="blog-card bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col flex-shrink-0 w-[270px] sm:w-[320px] md:w-[360px] snap-start group"
            >
              {/* Image Container + Date Tag */}
              <div className="relative">
                <div className="h-[170px] sm:h-[200px] md:h-[220px] w-full overflow-hidden bg-slate-950 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-md px-2.5 py-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-700 shadow-xs">
                  {post.date}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col gap-3 flex-grow text-left">
                <h3 className="font-serif text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#EE3A57] transition-colors">
                  {post.title}
                </h3>
                <div className="pt-2 mt-auto border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={post.id ? `/blogs/${post.id}` : '/blogs'}
                    className="text-[#EE3A57] text-[10px] sm:text-xs font-black uppercase tracking-widest hover:text-[#d92643] transition-colors flex items-center gap-1"
                  >
                    Read Full Article &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
