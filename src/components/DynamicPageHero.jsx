import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const renderTwoColorTitle = (rawTitle) => {
  if (!rawTitle) return null;
  const words = rawTitle.trim().split(' ');
  if (words.length <= 1) {
    return <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent">{rawTitle}</span>;
  }

  const accentWordCount = words.length >= 4 ? 2 : 1;
  const accentPart = words.slice(0, accentWordCount).join(' ');
  const mainPart = words.slice(accentWordCount).join(' ');

  return (
    <>
      <span className="bg-gradient-to-r from-[#EE3A57] to-[#2563EB] bg-clip-text text-transparent mr-2 sm:mr-3 inline-block">
        {accentPart}
      </span>
      <span className="text-white inline">
        {mainPart}
      </span>
    </>
  );
};

export default function DynamicPageHero({
  pageKey,
  fallbackDesktop,
  fallbackMobile,
  defaultTitle = '',
  defaultSubtitle = '',
  className = ''
}) {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    Promise.all([
      api.banners.getActive().catch(() => []),
      api.content.get().catch(() => null)
    ]).then(([bannersList, contentData]) => {
      const activeBanners = Array.isArray(bannersList) ? bannersList.filter(b => b.active) : [];
      const bannerMatch = activeBanners.find(b =>
        (b.pageKey && (b.pageKey === pageKey || b.pageKey === pageKey.replace('-', ''))) ||
        (b.link && b.link.toLowerCase().includes(pageKey.toLowerCase()))
      );

      if (bannerMatch) {
        setHeroData({
          title: bannerMatch.title,
          subtitle: bannerMatch.subtitle,
          image: bannerMatch.image,
          mobileImage: bannerMatch.mobileImage
        });
      } else if (contentData?.pageHeroes) {
        const hero = contentData.pageHeroes[pageKey] ||
                     contentData.pageHeroes[pageKey === 'custom-order' ? 'customOrder' : pageKey] ||
                     contentData.pageHeroes[pageKey === 'customOrder' ? 'custom-order' : pageKey];
        if (hero) setHeroData(hero);
      }
    }).catch((err) => console.error(`Failed to load dynamic hero for ${pageKey}:`, err));
  }, [pageKey]);

  const title = heroData?.title || defaultTitle;
  const subtitle = heroData?.subtitle || defaultSubtitle;
  
  const rawDesktop = (heroData?.image && typeof heroData.image === 'string' && heroData.image.trim() !== '') ? heroData.image : fallbackDesktop;
  const rawMobile = (heroData?.mobileImage && typeof heroData.mobileImage === 'string' && heroData.mobileImage.trim() !== '') ? heroData.mobileImage : (fallbackMobile || rawDesktop);

  const [desktopSrc, setDesktopSrc] = useState(rawDesktop);
  const [mobileSrc, setMobileSrc] = useState(rawMobile);

  useEffect(() => {
    setDesktopSrc(rawDesktop);
  }, [rawDesktop]);

  useEffect(() => {
    setMobileSrc(rawMobile);
  }, [rawMobile]);

  const hasOverlayText = Boolean(title || subtitle);

  return (
    <section className={`w-full relative overflow-hidden bg-slate-950 ${className}`}>
      {/* Background Image Container */}
      <div className="w-full relative min-h-[180px] sm:min-h-[220px] bg-slate-950 flex items-center">
        {/* Desktop View Image */}
        {desktopSrc && (
          <img
            src={desktopSrc}
            alt={title || `${pageKey} Banner`}
            className="hidden sm:block w-full h-auto object-cover max-h-[520px] min-h-[220px]"
            loading="eager"
            onError={() => {
              if (desktopSrc !== fallbackDesktop && fallbackDesktop) {
                setDesktopSrc(fallbackDesktop);
              }
            }}
          />
        )}

        {/* Mobile View Image */}
        {mobileSrc && (
          <img
            src={mobileSrc}
            alt={title || `${pageKey} Banner Mobile`}
            className="block sm:hidden w-full h-auto object-cover max-h-[420px] min-h-[180px]"
            loading="eager"
            onError={() => {
              const fallback = fallbackMobile || fallbackDesktop;
              if (mobileSrc !== fallback && fallback) {
                setMobileSrc(fallback);
              }
            }}
          />
        )}

        {/* Dynamic Text Overlay */}
        {hasOverlayText && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30 flex flex-col justify-center px-6 sm:px-12 lg:px-20 text-left z-10 py-6">
            <div className="max-w-3xl space-y-3">
              {title && (
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                  {renderTwoColorTitle(title)}
                </h1>
              )}
              {subtitle && (
                <p className="text-xs sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
