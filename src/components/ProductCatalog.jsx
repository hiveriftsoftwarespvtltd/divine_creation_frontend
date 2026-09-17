import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const subFilters = [
  { id: 'all', name: 'All' },
  { id: 'drinkware', name: 'Drinkware' },
  { id: 'giftsets', name: 'Gift Sets' },
  { id: 'trophies', name: 'Trophies' },
  { id: 'executive', name: 'Executive' },
  { id: 'clocks', name: 'Wall Clocks' },
  { id: 'homeware', name: 'Homeware' },
];

const checkProductMatchesCategory = (prod, selectedCatNameOrId, categoriesList) => {
  if (!selectedCatNameOrId || selectedCatNameOrId === 'All') return true;

  const matchedCatObj = categoriesList.find(c =>
    (c.name && c.name.toLowerCase().trim() === selectedCatNameOrId.toLowerCase().trim()) ||
    c._id === selectedCatNameOrId ||
    c.id === selectedCatNameOrId
  );

  const targetNames = [
    selectedCatNameOrId.toLowerCase().trim(),
    matchedCatObj?.name?.toLowerCase()?.trim(),
  ].filter(Boolean);

  const targetIds = [
    selectedCatNameOrId,
    matchedCatObj?._id,
    matchedCatObj?.id,
  ].filter(Boolean);

  let prodCatName = '';
  let prodCatId = '';

  if (typeof prod.category === 'string') {
    const foundCat = categoriesList.find(c => c._id === prod.category || c.id === prod.category);
    if (foundCat) {
      prodCatId = prod.category;
      prodCatName = foundCat.name;
    } else {
      prodCatName = prod.category;
    }
  } else if (prod.category && typeof prod.category === 'object') {
    prodCatId = prod.category._id || prod.category.id || '';
    prodCatName = prod.category.name || '';
  }

  // 1. ID Match
  if (prodCatId && targetIds.includes(prodCatId)) return true;

  // 2. Name Match
  const prodCatLower = prodCatName.toLowerCase().trim();
  if (prodCatLower && targetNames.some(tn => prodCatLower === tn || prodCatLower.includes(tn) || tn.includes(prodCatLower))) {
    return true;
  }

  // 3. Title / Tags match fallback
  const titleLower = (prod.title || '').toLowerCase().trim();
  const tagsLower = Array.isArray(prod.tags) ? prod.tags.join(' ').toLowerCase() : (prod.tags || '').toLowerCase();

  return targetNames.some(tn => titleLower.includes(tn) || tagsLower.includes(tn));
};

export default function ProductCatalog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubFilter, setSelectedSubFilter] = useState('all');
  const [sortBy, setSortBy] = useState('Popular');
  const [favorites, setFavorites] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [categoriesList, setCategoriesList] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCatalogData = async () => {
      try {
        setIsLoading(true);
        const cats = await api.categories.getAll();
        setCategoriesList(cats);

        const prods = await api.products.getAll();
        setProductsData(prods.map(p => ({ ...p, id: p._id })));
      } catch (err) {
        console.error("Failed to load product catalog data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadCatalogData();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      const match = categoriesList.find(c =>
        c.name.toLowerCase().trim() === categoryParam.toLowerCase().trim() ||
        c._id === categoryParam ||
        c.id === categoryParam ||
        c.name.toLowerCase().includes(categoryParam.toLowerCase().trim()) ||
        categoryParam.toLowerCase().includes(c.name.toLowerCase().trim())
      );
      if (match) {
        setSelectedCategory(match.name);
      } else {
        setSelectedCategory(categoryParam);
      }
      setTimeout(() => {
        const elem = document.getElementById('catalog');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else if (categoriesList.length > 0 && !selectedCategory) {
      setSelectedCategory(categoriesList[0].name);
    }
  }, [categoryParam, categoriesList]);

  const displayCategories = [...categoriesList];
  if (
    selectedCategory &&
    selectedCategory !== 'All' &&
    !displayCategories.some(c => c.name.toLowerCase().trim() === selectedCategory.toLowerCase().trim())
  ) {
    displayCategories.unshift({ name: selectedCategory });
  }

  const getCategoryCount = (catName) => {
    if (!catName || catName === 'All') return productsData.length;
    return productsData.filter(p => checkProductMatchesCategory(p, catName, categoriesList)).length;
  };

  const getCategoryIcon = (name) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes('drinkware') || lowercase.includes('flask') || lowercase.includes('bottle')) return '🍾';
    if (lowercase.includes('gift') || lowercase.includes('corporate')) return '🎁';
    if (lowercase.includes('trophy') || lowercase.includes('memento') || lowercase.includes('award')) return '🏆';
    if (lowercase.includes('clock')) return '⏰';
    if (lowercase.includes('notebook') || lowercase.includes('diary') || lowercase.includes('stationery')) return '📓';
    if (lowercase.includes('kitchen') || lowercase.includes('dinner')) return '🍽️';
    if (lowercase.includes('bar')) return '🍸';
    if (lowercase.includes('homeware') || lowercase.includes('lunch')) return '🍱';
    if (lowercase.includes('sound') || lowercase.includes('tech') || lowercase.includes('pen drive')) return '🎧';
    return '✨';
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = productsData.filter((prod) => {
    const matchesCategory = checkProductMatchesCategory(prod, selectedCategory, categoriesList);

    let matchesSubFilter = false;
    if (selectedSubFilter === 'all') {
      matchesSubFilter = true;
    } else {
      const searchWord = selectedSubFilter.toLowerCase();
      if (prod.tags) {
        if (Array.isArray(prod.tags)) {
          matchesSubFilter = prod.tags.some(tag =>
            typeof tag === 'string' && tag.toLowerCase().includes(searchWord)
          );
        } else if (typeof prod.tags === 'string') {
          matchesSubFilter = prod.tags.toLowerCase().includes(searchWord);
        }
      }
      if (!matchesSubFilter) {
        const titleLower = prod.title ? prod.title.toLowerCase() : '';
        const descLower = prod.description ? prod.description.toLowerCase() : '';
        matchesSubFilter = titleLower.includes(searchWord) || descLower.includes(searchWord);
      }
    }

    return matchesCategory && matchesSubFilter;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="w-full py-24 flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="animate-spin h-10 w-10 border-4 border-[#C89B3C] border-t-transparent rounded-full mx-auto"></div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400">Loading catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <section id="catalog" className="bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-3 bg-[#faf8f5] p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6 lg:sticky lg:top-[90px] lg:self-start">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-800 border-b border-slate-200/60 pb-3">
              Product Categories
            </h3>

            <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
              {displayCategories.map((cat, idx) => {
                const isActive = selectedCategory && (
                  selectedCategory.toLowerCase().trim() === cat.name.toLowerCase().trim()
                );
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSearchParams({ category: cat.name });
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-[12.5px] font-semibold transition-all duration-200 border cursor-pointer ${isActive
                        ? 'bg-[#EE3A57]/10 text-slate-900 border-[#EE3A57]/40 shadow-sm font-bold'
                        : 'bg-transparent text-slate-600 hover:bg-slate-100/50 border-transparent hover:text-slate-800'
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-[#EE3A57] text-white' : 'bg-slate-200/60 text-slate-600'
                      }`}>
                      {getCategoryCount(cat.name)}
                    </span>
                  </button>
                );
              })}
            </div>

         
          </div>

          {/* RIGHT CONTENT: Product Grid (col-span-9) */}
          <div className="lg:col-span-9 space-y-6">

            {/* Header: Selected Category and Sort/Showing */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-slate-800 relative inline-block pb-1">
                  {selectedCategory}
                  <div className="absolute bottom-0 left-0 w-12 h-[2.5px] bg-gradient-to-r from-[#EE3A57] to-[#2563EB] rounded-full" />
                </h2>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 self-end sm:self-center">
                <span>Showing 1-{filteredProducts.length} of 19</span>

                {/* Sort dropdown mimic */}
                <div className="relative flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                  <span className="text-slate-700">Sort By: {sortBy}</span>
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sub-filters horizontal scrollbar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {subFilters.map((filter) => {
                const isActive = selectedSubFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setSelectedSubFilter(filter.id);
                      setCurrentPage(1);
                    }}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${isActive
                        ? 'bg-[#C89B3C] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                  >
                    {filter.name}
                  </button>
                );
              })}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedProducts.map((product) => {
                return (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="group bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative cursor-pointer text-left"
                  >
                    {/* Image Area */}
                    <div className="relative h-[210px] bg-white overflow-hidden flex items-center justify-center p-2.5">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Content Area */}
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-[13.5px] sm:text-xs md:text-[14px] leading-snug group-hover:text-[#EE3A57] transition-colors">
                          {product.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Material: {product.material} &bull; {product.type}
                        </p>
                      </div>

                      {/* Action buttons side-by-side */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Link
                          to={`/product/${product.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center py-2 text-center text-slate-700 hover:text-[#EE3A57] text-[11px] font-bold border border-slate-200 hover:border-[#EE3A57] rounded-xl transition-all"
                        >
                          View Details
                        </Link>
                        <a
                          href={`https://wa.me/919818946081?text=Hi! I am interested in purchasing the "${product.title}" listed under Collections.`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center py-2 text-center bg-gradient-to-r from-[#EE3A57] to-[#2563EB] hover:from-[#d92643] hover:to-[#1d4ed8] text-white text-[11px] font-bold rounded-xl transition-all shadow-sm"
                        >
                          Get Quote
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 border-t border-slate-100 mt-8">
                {/* Previous Button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={`p-2 rounded-lg border transition-colors ${currentPage === 1
                      ? 'text-slate-300 bg-slate-50/50 cursor-not-allowed border-slate-200/60'
                      : 'text-slate-600 bg-white hover:bg-slate-50 hover:text-accent border-slate-200'
                    }`}
                  aria-label="Previous page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all border ${isActive
                          ? 'bg-[#C89B3C] text-white border-[#C89B3C]'
                          : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-accent border-slate-200'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={`p-2 rounded-lg border transition-colors ${currentPage === totalPages
                      ? 'text-slate-300 bg-slate-50/50 cursor-not-allowed border-slate-200/60'
                      : 'text-slate-600 bg-white hover:bg-slate-50 hover:text-accent border-slate-200'
                    }`}
                  aria-label="Next page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
