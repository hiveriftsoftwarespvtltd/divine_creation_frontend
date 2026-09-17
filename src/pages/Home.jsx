import React from 'react';
import Hero from '../components/Hero';
import Brands from '../components/Brands';
import About from '../components/About';
import Collections from '../components/Collections';
import FeaturedProducts from '../components/FeaturedProducts';
import Expertise from '../components/Expertise';
import CraftDevotion from '../components/CraftDevotion';
import CustomOrder from '../components/CustomOrder';
import WhyChooseUs from '../components/WhyChooseUs';
import Blog from '../components/Blog';
import StudioEnquiry from '../components/StudioEnquiry';

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Main Hero Carousel */}
      <Hero />

      {/* 2. Client Trust Logos */}
      <Brands />

      {/* 3. Company Overview & Credentials */}
      <About />

      {/* 4. Featured Collections (6 Square Overlay Showcase Cards) */}
      <Collections />

      {/* 5. Dynamic Featured Products Carousel (OUR PRODUCTS) */}
      <FeaturedProducts />

      {/* 6. Category Expertise Grid */}
      <Expertise />

      {/* 7. Precision Manufacturing & Laser Branding Showcase */}
      <CraftDevotion />

      {/* 8. Custom Manufacturing Workflow */}
      <CustomOrder />

      {/* 9. Why Choose Us / Value Proposition */}
      <WhyChooseUs />

      {/* 10. Articles & Industry Insights */}
      <Blog />

      {/* 11. Contact & Inquiry Section */}
      <StudioEnquiry />
    </div>
  );
}
