import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Tag, Cpu, BookOpen, TrendingUp, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pricingFactors = [
  { label: 'Domain', icon: Cpu },
  { label: 'Project Complexity', icon: BookOpen },
  { label: 'Learning Depth', icon: TrendingUp },
  { label: 'Career Value', icon: Tag },
];

const PricingFounder = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pricing section animation
      gsap.fromTo(
        pricingRef.current,
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

      // Founder section animation
      gsap.fromTo(
        founderRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: founderRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Factor badges animation
      const factors = pricingRef.current?.querySelectorAll('.factor-badge');
      if (factors) {
        gsap.fromTo(
          factors,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pricingRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-red-600/5 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pricing Approach */}
        <div ref={pricingRef} className="text-center mb-24 opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-8">
            Pricing{' '}
            <span className="text-red-500 text-glow">Approach</span>
          </h2>

          {/* Philosophy Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/30">
              <X className="w-5 h-5 text-red-500" />
              <span className="text-white font-rajdhani">No fixed pricing</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/30">
              <X className="w-5 h-5 text-red-500" />
              <span className="text-white font-rajdhani">No blind cost</span>
            </div>
          </div>

          <p className="text-gray-400 mb-8">
            Pricing depends on:
          </p>

          {/* Factor Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {pricingFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div
                  key={index}
                  className="factor-badge flex items-center gap-2 px-5 py-3 rounded-lg bg-[#111] border border-[#333] hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300 opacity-0"
                >
                  <Icon className="w-4 h-4 text-red-500" />
                  <span className="text-gray-300 text-sm">{factor.label}</span>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30">
            <Phone className="w-8 h-8 text-red-500" />
            <div className="text-left">
              <p className="text-white font-orbitron text-lg">Call → Discuss → Decide</p>
              <p className="text-gray-400 text-sm">Personalized quotes based on your needs</p>
            </div>
          </div>
        </div>

        {/* About the Founder */}
        <div
          ref={founderRef}
          className="content-box p-8 md:p-12 opacity-0"
        >
          {/* Corner Accents */}
          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
          
          {/* Arc Reactor Glow */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-40 h-40 rounded-full bg-red-600/10 blur-3xl animate-pulse-glow" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-6">
              About the <span className="text-red-500">Founder</span>
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
              AXRIGA is built by someone who has stood on national hackathon stages, 
              faced tough jury questions, refined ideas through failure, and delivered 
              winning solutions.
            </p>

            <div className="mt-6 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <p className="text-red-400 italic">
                "That real experience shapes how every project is designed, explained, and defended."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-red-500/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-red-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default PricingFounder;
