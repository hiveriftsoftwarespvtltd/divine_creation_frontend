import React from 'react';
import DynamicPageHero from './DynamicPageHero';
import banner1 from '../assets/a (1).png';
import mobilehero from '../assets/mobilehero.png';

export default function ProductHero() {
  return (
    <DynamicPageHero
      pageKey="collections"
      fallbackDesktop={banner1}
      fallbackMobile={mobilehero}
      defaultTitle="Corporate and Promotional Gift Items"
      defaultSubtitle="Explore Our Complete Catalog of Executive Gift Sets, Stainless Steel Vacuum Flasks, Trophies & Customized Items"
    />
  );
}
