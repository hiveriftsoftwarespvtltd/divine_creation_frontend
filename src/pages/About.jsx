import React from 'react';
import AboutHero from '../components/AboutHero';
import AboutSection from '../components/About';
import CraftDevotion from '../components/CraftDevotion';
import OurValues from '../components/OurValues';
import CTA from '../components/CTA';
import TeamSection from '../components/TeamSection';

export default function About() {
  return (
    <div className="w-full">
      <AboutHero />
      <AboutSection />
      <OurValues />
      <CraftDevotion />
      
      {/* <TeamSection /> */}
      <CTA />
    </div>
  );
}
