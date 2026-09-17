import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Collections from './pages/Collections'
import CustomOrder from './pages/CustomOrder'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import ProductDetail from './pages/ProductDetail'
import AdminLayout from './pages/admin/AdminLayout'
import EnquiryPopup from './components/EnquiryPopup'
import { api } from './utils/api'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetAnchor = e.target.closest('a');
      if (!targetAnchor) return;
      
      const href = targetAnchor.getAttribute('href');
      if (!href) return;
      
      let targetPath = href;
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin === window.location.origin) {
          targetPath = url.pathname;
        } else {
          return;
        }
      } catch (err) {
        if (href.startsWith('#')) return;
      }

      if (targetPath === window.location.pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('hasShownEnquiryPopup');
    if (hasShown === 'true') return;

    const timer = setTimeout(() => {
      const isCurrentAdmin = window.location.pathname.startsWith('/admin');
      if (!isCurrentAdmin) {
        setShowPopup(true);
      }
    }, 10000); // 10 seconds proper load delay

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    sessionStorage.setItem('hasShownEnquiryPopup', 'true');
    setShowPopup(false);
  };

  const handleFormSubmit = async (popupData) => {
    try {
      const formData = new FormData();
      formData.append('name', popupData.name);
      formData.append('phone', popupData.phone);
      formData.append('email', popupData.email || '');
      formData.append('subject', popupData.subject || 'Pop-up Lead');
      formData.append('message', popupData.message || '');
      
      await api.enquiries.create(formData);

      // Construct and open WhatsApp URL
      const waMessage = `Hi! I want to enquire regarding "${popupData.subject || 'General'}".\n\n*Name:* ${popupData.name}\n*Phone:* ${popupData.phone}\n*Email:* ${popupData.email || 'N/A'}\n*Subject:* ${popupData.subject || 'N/A'}\n*Requirement Details:* ${popupData.message || 'N/A'}`;
      const waUrl = `https://wa.me/919818946081?text=${encodeURIComponent(waMessage)}`;

      sessionStorage.setItem('hasShownEnquiryPopup', 'true');
      setShowPopup(false);
      
      // Redirect in new tab
      window.open(waUrl, '_blank');

      alert('Thank you! Your enquiry has been submitted. Opening WhatsApp chat...');
    } catch (err) {
      console.error("Failed to submit popup enquiry:", err);
      alert('Thank you! Your enquiry has been recorded.');
    }
  };

  return (
    <div className="font-sans min-h-screen bg-[#FAF9F8] text-[#0E0E3B] flex flex-col scroll-smooth">
      {!isAdmin && <Navbar />}
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/custom-order" element={<CustomOrder />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/our-clients" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLayout />} />
          {/* Redirect any unknown routes (like /login) back to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}

      {/* Global Visitor Enquiry Popup */}
      {showPopup && (
        <EnquiryPopup 
          onClose={handleClosePopup}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App

