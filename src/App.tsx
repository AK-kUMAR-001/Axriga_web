import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './sections/Hero';
import FromIdeaToImpact from './sections/FromIdeaToImpact';
import WhereStudentsStuck from './sections/WhereStudentsStuck';
import WhatChanges from './sections/WhatChanges';
import HowItWorks from './sections/HowItWorks';
import SuccessPath from './sections/SuccessPath';
import WhatWeOffer from './sections/WhatWeOffer';
import Domains from './sections/Domains';
import RecentProjects from './sections/RecentProjects';
import ResumeCareer from './sections/ResumeCareer';
import Colleges from './sections/Colleges';
import Reviews from './sections/Reviews';
import PricingFounder from './sections/PricingFounder';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative bg-black min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* From Idea to Impact */}
      <FromIdeaToImpact />

      {/* Where Students Get Stuck */}
      <WhereStudentsStuck />

      {/* What Changes After AXRIGA */}
      <WhatChanges />

      {/* How AXRIGA Works */}
      <HowItWorks />

      {/* Success & Victory Path */}
      <SuccessPath />

      {/* What We Offer */}
      <WhatWeOffer />

      {/* Domains We Cover */}
      <Domains />

      {/* Recent Projects */}
      <RecentProjects />

      {/* Resume Building & Career Guidance */}
      <ResumeCareer />

      {/* Colleges We Worked With */}
      <Colleges />

      {/* Customer Reviews */}
      <Reviews />

      {/* Pricing & Founder */}
      <PricingFounder />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default App;
