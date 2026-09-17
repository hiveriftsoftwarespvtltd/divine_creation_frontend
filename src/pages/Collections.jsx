import React from 'react';
import ProductHero from '../components/ProductHero';
import ProductCatalog from '../components/ProductCatalog';
import FeaturesBar from '../components/FeaturesBar';
import CustomDesignBanner from '../components/CustomDesignBanner';

export default function Collections() {
  return (
    <div className="w-full">
      <ProductHero />
      <ProductCatalog />
      <FeaturesBar />
      <CustomDesignBanner />
    </div>
  );
}



