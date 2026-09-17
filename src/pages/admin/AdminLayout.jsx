import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Login from './Login';
import Dashboard from './Dashboard';
import ProductManage from './ProductManage';
import CategoryManage from './CategoryManage';
import EnquiryManage from './EnquiryManage';
import BannerManage from './BannerManage';
import ContentManage from './ContentManage';
import GalleryManage from './GalleryManage';
import ClientManage from './ClientManage';
import BlogManage from './BlogManage';
import { api } from '../../utils/api';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// Initial Mock data seed templates
// Initial Mock data seed templates
const initialCategories = [
  { id: 1, name: 'Corporate Gifts' },
  { id: 2, name: 'Drinkware & Flasks' },
  { id: 3, name: 'Gift Sets' },
  { id: 4, name: 'Mementos & Trophies' },
  { id: 5, name: 'Kitchenware' },
  { id: 6, name: 'Wall Clocks' },
  { id: 7, name: 'Bar Accessories' },
  { id: 8, name: 'Homeware & Lunch Boxes' },
  { id: 9, name: 'Executive Gift Sets' },
  { id: 10, name: 'Desktop Collection' }
];

const initialProducts = [
  {
    id: 1,
    title: 'Omega Curved Bottle (600 ML)',
    material: 'Stainless Steel',
    type: 'Corporate Drinkware',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop',
    category: 'Drinkware & Flasks',
    tags: ['bottle', 'drinkware', 'steel']
  },
  {
    id: 2,
    title: 'DC Corporate Gift Creation',
    material: 'Premium Gift Box',
    type: 'Corporate Gifting',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop',
    category: 'Corporate Gifts',
    tags: ['gift set', 'executive', 'corporate']
  },
  {
    id: 3,
    title: 'DC Corporate Notebook for Gifting',
    material: 'Leatherette / Paper',
    type: 'Executive Stationery',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop',
    category: 'Gift Sets',
    tags: ['notebook', 'journal', 'stationery']
  },
  {
    id: 4,
    title: 'Trophy DC EX 99',
    material: 'Crystal & Metal',
    type: 'Award Trophy',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&auto=format&fit=crop',
    category: 'Mementos & Trophies',
    tags: ['trophy', 'memento', 'award']
  },
  {
    id: 5,
    title: 'Stainless Steel Vacuum Flask',
    material: 'Grade 304 Stainless Steel',
    type: 'Insulated Flask',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop',
    category: 'Kitchenware',
    tags: ['flask', 'vacuum', 'hot-cold']
  },
  {
    id: 6,
    title: 'Accent Wall Clock 15"',
    material: 'Wood & Metal',
    type: 'Decor Wall Clock',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop',
    category: 'Wall Clocks',
    tags: ['clock', 'accent', 'wall']
  },
  {
    id: 7,
    title: 'DC Corporate Gifting Sets New Addition',
    material: 'Stainless Steel / Teak Wood',
    type: 'Barware Accessory',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop',
    category: 'Bar Accessories',
    tags: ['barware', 'decanter', 'gift set']
  },
  {
    id: 8,
    title: 'Double Layer Lunch Box',
    material: 'Stainless Steel & Food Grade Plastic',
    type: 'Lunch Container',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop',
    category: 'Homeware & Lunch Boxes',
    tags: ['lunch box', 'homeware', 'food container']
  }
];

const initialEnquiries = [
  {
    id: 1,
    name: 'Siddharth Sharma',
    phone: '9876543210',
    email: 'siddharth@gmail.com',
    subject: 'Corporate Gift Set Bulk Inquiry',
    date: '2026-07-12',
    status: 'Converted',
    message: 'Looking for custom laser engraved 500ml stainless steel vacuum flasks and executive gift sets for our annual corporate event.'
  },
  {
    id: 2,
    name: 'Anjali Verma',
    phone: '8765432109',
    email: 'anjali.v@yahoo.com',
    subject: 'Executive Notebooks & Diaries',
    date: '2026-07-14',
    status: 'Pending',
    message: 'Need 500 leatherette notebooks with company logo embossed for client distribution.'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    phone: '7654321098',
    email: 'vikram@corporategifts.in',
    subject: 'Trophy & Award Mementos',
    date: '2026-07-15',
    status: 'Hold',
    message: 'Request quote for 50 crystal trophies for annual employee recognition ceremony.'
  }
];

const initialBanners = [
  {
    id: 1,
    title: 'Corporate & Promotional Gift Items',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&auto=format&fit=crop',
    link: '/collections',
    active: true
  },
  {
    id: 2,
    title: 'Executive Gift Sets & Customized Branding Solutions',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1600&auto=format&fit=crop',
    link: '/custom-order',
    active: true
  }
];

const initialContent = {
  address: 'Office: E-285, Terrace Floor, Naraina Vihar, New Delhi | Factory: S-46, Badli Industrial Estate, Delhi',
  email: 'info@divinecreations.com',
  phone: '+91 98110 66081',
  storyTitle: 'Quality is a Culture, Service a Tradition',
  storyText1: 'Established in 2007 under the guidance of Mrs. Vibha Ahuja and JagMohan Ahuja (President), Divine Creations is a premier manufacturer, trader, and exporter of Corporate & Promotional Gift Items, Executive Notebooks, Drinkware, Trophies, Wall Clocks, and Barware in New Delhi.',
  storyText2: 'Our state-of-the-art facility at Badli Industrial Estate features Laser Engraving, Metal Marking, Chemical Etching, and Glass Sand Carving. Managed by Mohit Ahuja (Sales), Avichal Aurora (Exports), and Vibha Ahuja (Customer Care), we ensure flawless custom branding and fulfillment.'
};

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('adminActiveTab') || 'dashboard';
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Database States
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [banners, setBanners] = useState([]);
  const [content, setContent] = useState({});
  const [gallery, setGallery] = useState([]);
  const [clients, setClients] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const mapId = (item) => ({ ...item, id: item._id || item.id });

  useEffect(() => {
    // Check login token
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (isAuthenticated) {
      const loadAllData = async () => {
        try {
          const cats = (await api.categories.getAll()).map(mapId);
          setCategories(cats);

          const prods = (await api.products.getAll()).map(mapId);
          setProducts(prods);

          const enqs = (await api.enquiries.getAll()).map(mapId);
          setEnquiries(enqs);

          const bans = (await api.banners.getAllAdmin()).map(mapId);
          setBanners(bans);

          const cont = await api.content.get();
          setContent(cont);

          const gal = (await api.gallery.getAll()).map(mapId);
          setGallery(gal);

          const cls = (await api.clients.getAll()).map(mapId);
          setClients(cls);

          const blgs = (await api.blogs.getAllAdmin()).map(mapId);
          setBlogs(blgs);
        } catch (err) {
          console.error('Failed to load admin layout data from APIs:', err);
        }
      };
      loadAllData();
    }
  }, [isAuthenticated]);

  // Product CRUD
  const handleAddProduct = async (formData) => {
    try {
      const added = await api.products.create(formData);
      setProducts(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Product published successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to publish product: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleEditProduct = async (id, formData) => {
    try {
      const updated = await api.products.update(id, formData);
      setProducts(prev => prev.map(p => p.id === id ? mapId(updated) : p));
      Toast.fire({ icon: 'success', title: 'Product changes saved!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to save product changes: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.products.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      Toast.fire({ icon: 'success', title: 'Product deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete product: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Category CRUD
  const handleAddCategory = async (newCat) => {
    try {
      const formData = new FormData();
      formData.append('name', newCat.name);
      formData.append('featured', newCat.featured ? 'true' : 'false');
      if (newCat.imageFile) {
        formData.append('image', newCat.imageFile);
      } else if (newCat.imageUrl) {
        formData.append('image', newCat.imageUrl);
      }
      const added = await api.categories.create(formData);
      setCategories(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Category created successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to create category: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleEditCategory = async (editedCat) => {
    try {
      const formData = new FormData();
      formData.append('name', editedCat.name);
      formData.append('featured', editedCat.featured ? 'true' : 'false');
      if (editedCat.imageFile) {
        formData.append('image', editedCat.imageFile);
      } else {
        formData.append('image', editedCat.imageUrl || '');
      }
      const updated = await api.categories.update(editedCat.id, formData);
      setCategories(prev => prev.map(c => c.id === editedCat.id ? mapId(updated) : c));
      Toast.fire({ icon: 'success', title: 'Category changes saved!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to update category: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await api.categories.delete(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      Toast.fire({ icon: 'success', title: 'Category deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete category: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Enquiry Update
  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      const updated = await api.enquiries.updateStatus(id, status);
      setEnquiries(prev => prev.map(e => e.id === id ? mapId(updated) : e));
      Toast.fire({ icon: 'success', title: `Status marked as ${status}!` });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to update enquiry status: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await api.enquiries.delete(id);
      setEnquiries(prev => prev.filter(e => e.id !== id));
      Toast.fire({ icon: 'success', title: 'Enquiry lead deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete enquiry: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Banner CRUD
  const handleAddBanner = async (formData) => {
    try {
      const added = await api.banners.create(formData);
      setBanners(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Banner published successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to publish banner: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleEditBanner = async (id, formData) => {
    try {
      const updated = await api.banners.update(id, formData);
      setBanners(prev => prev.map(b => b.id === id ? mapId(updated) : b));
      Toast.fire({ icon: 'success', title: 'Banner changes saved!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to update banner: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await api.banners.delete(id);
      setBanners(prev => prev.filter(b => b.id !== id));
      Toast.fire({ icon: 'success', title: 'Banner deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete banner: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleToggleBannerStatus = async (id) => {
    try {
      const updated = await api.banners.toggle(id);
      setBanners(prev => prev.map(b => b.id === id ? mapId(updated) : b));
      Toast.fire({ icon: 'success', title: 'Banner visibility toggled!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to toggle banner status: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Gallery CRUD
  const handleAddGalleryItem = async (formData) => {
    try {
      const added = await api.gallery.create(formData);
      setGallery(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Gallery photo uploaded!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to upload gallery photo: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    try {
      await api.gallery.delete(id);
      setGallery(prev => prev.filter(g => g.id !== id));
      Toast.fire({ icon: 'success', title: 'Gallery photo deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete gallery photo: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Clients CRUD
  const handleAddClient = async (formData) => {
    try {
      const added = await api.clients.create(formData);
      setClients(prev => [...prev, mapId(added)]);
      Toast.fire({ icon: 'success', title: 'Client added successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to add client: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await api.clients.delete(id);
      setClients(prev => prev.filter(c => c.id !== id));
      Toast.fire({ icon: 'success', title: 'Client removed!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete client: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Blog / Article CRUD
  const handleAddBlog = async (formData) => {
    try {
      const added = await api.blogs.create(formData);
      setBlogs(prev => [mapId(added), ...prev]);
      Toast.fire({ icon: 'success', title: 'Article published successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to publish article: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleEditBlog = async (id, formData) => {
    try {
      const updated = await api.blogs.update(id, formData);
      setBlogs(prev => prev.map(b => b.id === id ? mapId(updated) : b));
      Toast.fire({ icon: 'success', title: 'Article updated!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to update article: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await api.blogs.delete(id);
      setBlogs(prev => prev.filter(b => b.id !== id));
      Toast.fire({ icon: 'success', title: 'Article deleted!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to delete article: ' + err.message, icon: 'error', confirmButtonColor: '#cca040' });
    }
  };

  // Content Save
  const handleSaveContent = async (updatedContent) => {
    try {
      const updated = await api.content.update(updatedContent);
      setContent(updated);
      Toast.fire({ icon: 'success', title: 'Page content saved successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to save content changes: ' + err.message, icon: 'error', confirmButtonColor: '#EE3A57' });
    }
  };

  const handleSaveHero = async (formData) => {
    try {
      const updated = await api.content.updateHero(formData);
      setContent(updated);
      Toast.fire({ icon: 'success', title: 'Page Hero updated successfully!' });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Failed to update Page Hero: ' + err.message, icon: 'error', confirmButtonColor: '#EE3A57' });
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Sidebar link items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'products', label: 'Products', iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'categories', label: 'Categories', iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'enquiries', label: 'Enquiries / CRM', iconPath: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' },
    { id: 'banners', label: 'Sliders & Heroes', iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'blogs', label: 'Articles & Insights', iconPath: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { id: 'gallery', label: 'Gallery Manage', iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'clients', label: 'Clients Manage', iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
  ];

  return (
    <div className="min-h-screen bg-[#fbfaf7] flex . relative">

      {/* Mobile Drawer Navigation Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Drawer content body */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0b0e26] text-white pt-5 pb-4 transition-transform duration-300 z-50 shadow-2xl">
            {/* Close Button inside drawer */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 bg-slate-800/80 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                aria-label="Close Mobile Navigation"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Logo / Brand */}
            <div className="px-6 pb-4 border-b border-slate-800 text-left">
              <span className="text-[#cca040] font-serif text-lg font-black uppercase tracking-widest">
                Divine Panel
              </span>
            </div>

            {/* Navigation links inside drawer */}
            <nav className="mt-5 flex-1 px-4 space-y-1.5 text-left overflow-y-auto">
              {sidebarItems.map(item => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full py-3.5 px-4.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer ${active
                      ? 'bg-[#cca040] text-white shadow-sm'
                      : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'
                      }`}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                    </svg>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User details and Logout in drawer footer */}
            <div className="p-4 border-t border-slate-800">
              <div className="bg-slate-900/50 p-3 rounded-xl flex items-center justify-between">
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">Admin User</h4>
                  <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Online Session</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileSidebarOpen(false);
                  }}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Container */}
      <aside className="w-64 h-screen sticky top-0 bg-[#0b0e26] text-white flex flex-col justify-between shrink-0 hidden lg:flex border-r border-slate-800">

        {/* Sidebar Header / Brand */}
        <div>
          <div className="h-20 flex items-center px-6 border-b border-slate-800">
            <span className="text-[#cca040] font-serif text-lg font-black uppercase tracking-widest">
              Divine Panel
            </span>
          </div>

          {/* Navigation Links list */}
          <nav className="p-4 space-y-1.5 text-left">
            {sidebarItems.map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full py-3 px-4.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer ${active
                    ? 'bg-gradient-to-r from-[#EE3A57] to-[#2563EB] text-white shadow-md'
                    : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'
                    }`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                  </svg>
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Profile / Footer logout */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-900/50 p-3 rounded-xl flex items-center justify-between">
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Administrator</h4>
              <p className="text-text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Offline Sync</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
              title="Log Out Admin"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

      </aside>

      {/* Main Container Right */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">

        {/* Topbar navigation Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-xs">
          {/* Mobile hamburger icon + Active section title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 focus:outline-none cursor-pointer"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-[#EE3A57] text-sm hidden xs:inline">&#x2740;</span>
            <span className="text-xs font-black uppercase text-slate-400 tracking-widest font-sans">
              Admin Portal / {activeTab}
            </span>
          </div>

          {/* Clock & Logout */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-bold hidden sm:block">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex lg:hidden items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 sm:p-8 flex-grow">
          {activeTab === 'dashboard' && (
            <Dashboard
              enquiries={enquiries}
              products={products}
              onTabChange={setActiveTab}
            />
          )}

          {activeTab === 'products' && (
            <ProductManage
              products={products}
              categories={categories}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeTab === 'categories' && (
            <CategoryManage
              categories={categories}
              products={products}
              onAddCategory={handleAddCategory}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === 'enquiries' && (
            <EnquiryManage
              enquiries={enquiries}
              onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
              onDeleteEnquiry={handleDeleteEnquiry}
            />
          )}

          {activeTab === 'banners' && (
            <BannerManage
              banners={banners}
              content={content}
              onAddBanner={handleAddBanner}
              onEditBanner={handleEditBanner}
              onDeleteBanner={handleDeleteBanner}
              onToggleBannerStatus={handleToggleBannerStatus}
              onSwitchTab={setActiveTab}
            />
          )}

          {activeTab === 'blogs' && (
            <BlogManage
              blogs={blogs}
              onAddBlog={handleAddBlog}
              onEditBlog={handleEditBlog}
              onDeleteBlog={handleDeleteBlog}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryManage
              gallery={gallery}
              categories={categories}
              onAddGalleryItem={handleAddGalleryItem}
              onDeleteGalleryItem={handleDeleteGalleryItem}
            />
          )}

          {activeTab === 'clients' && (
            <ClientManage
              clients={clients}
              onAddClient={handleAddClient}
              onDeleteClient={handleDeleteClient}
            />
          )}

          {activeTab === 'content' && (
            <ContentManage
              content={content}
              onSaveContent={handleSaveContent}
              onSaveHero={handleSaveHero}
            />
          )}
        </main>

      </div>
    </div>
  );
}
