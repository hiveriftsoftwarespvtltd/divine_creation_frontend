import React from 'react';
import DynamicPageHero from './DynamicPageHero';
import banner4 from '../assets/a (4).png';
import mobilehero from '../assets/mobilehero.png';

export default function AboutHero() {
  return (
    <DynamicPageHero
      pageKey="about"
      fallbackDesktop={banner4}
      fallbackMobile={mobilehero}
      defaultTitle="About Divine Creations"
      defaultSubtitle="Premier Manufacturer, Trader & Exporter of Corporate & Promotional Gift Items Since 2007"
    />
  );
}
