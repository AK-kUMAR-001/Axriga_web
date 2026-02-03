import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Lightbulb, MessageCircle, FileCheck, Shield, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  { before: 'Confused direction', after: 'Clear project direction', icon: Compass },
  { before: 'Generic ideas', after: 'Custom ideas based on your interests', icon: Lightbulb },
  { before: 'Weak explanations', after: 'Strong technical explanations', icon: MessageCircle },
  { before: 'Empty resume', after: 'Resume points backed by real work', icon: FileCheck },
  { before: 'Interview anxiety', after: 'Confidence during reviews and interviews', icon: Shield },
  { before: 'Short-term thinking', after: 'Skills that actually matter in the long run', icon: Rocket },
];

const WhatChanges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation with 3D flip
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.transform-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              rotateX: 90,
              y: 50,
            },
            {
              opacity: 1,
              rotateX: 0,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.1,
            }
          );
        });
      }

      // Closing statement animation
      gsap.fromTo(
        closingRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: closingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating Check Marks */}
      <div className="absolute top-20 right-20 opacity-20">
        <CheckCircle2 className="w-16 h-16 text-green-500 animate-pulse" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-20">
        <CheckCircle2 className="w-12 h-12 text-green-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-green-400 text-sm font-mono">The Solution</span>
          </div>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-4 opacity-0"
          >
            What Changes After{' '}
            <span className="text-red-500 text-glow">AXRIGA</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See the transformation that happens when you get the right guidance
          </p>
        </div>

        {/* Transformation Cards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {transformations.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="transform-card content-box group p-6 opacity-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Corner Accents */}
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-green-500" />
                  </div>
                  {/* Icon Glow */}
                  <div className="absolute inset-0 w-14 h-14 rounded-xl bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Before/After Content */}
                <div className="relative z-10 space-y-3">
                  {/* Before */}
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-sm line-through">{item.before}</span>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-red-500" />
                    <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
                  </div>
                  
                  {/* After */}
                  <p className="text-white font-rajdhani text-lg group-hover:text-green-400 transition-colors">
                    {item.after}
                  </p>
                </div>

                {/* Card Number */}
                <div className="absolute top-4 right-4 text-4xl font-orbitron font-bold text-green-500/10 group-hover:text-green-500/20 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Bottom Border Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            );
          })}
        </div>

        {/* Closing Statement */}
        <div
          ref={closingRef}
          className="mt-16 text-center opacity-0"
        >
          <div className="inline-block relative p-8 md:p-12 rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/10 via-[#111] to-[#0a0a0a] overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-orbitron text-white mb-2">
                You don't just submit a project.
              </p>
              <p className="text-2xl md:text-3xl font-orbitron text-red-500 text-glow">
                You build proof of capability.
              </p>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-red-500/30" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-red-500/30" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-40 h-40 border border-red-500/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 left-20 w-32 h-32 border border-red-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
    </section>
  );
};

export default WhatChanges;
