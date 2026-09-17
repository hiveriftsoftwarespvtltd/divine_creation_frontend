import React from 'react';
import ContactComponent from '../components/Contact';
import ContactFeatures from '../components/ContactFeatures';
import DynamicPageHero from '../components/DynamicPageHero';
import contacthero from '../assets/a (7).png';
import contactmobile from '../assets/contactmobile.png';

export default function Contact() {
  return (
    <div className="w-full bg-white">
      {/* Hero Banner Section */}
      <DynamicPageHero
        pageKey="contact"
        fallbackDesktop={contacthero}
        fallbackMobile={contactmobile}
        defaultTitle="Contact Divine Creations"
        defaultSubtitle="Visit Our Office in Naraina Vihar or Connect with Our Corporate Sales Team"
      />

      {/* Main Contact Studio and Enquiry Form Section */}
      <div className="py-10">
        <ContactComponent />
      </div>

      {/* Bottom Features/Benefits Bar */}
      <ContactFeatures />
    </div>
  );
}
