import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FolderGit2, 
  Layers, 
  GraduationCap, 
  Trophy, 
  FlaskConical, 
  FileText, 
  Compass,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Project Development',
    description: 'End-to-end project creation with real-world standards',
    icon: FolderGit2,
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    title: 'Mini Projects',
    description: 'Quick, focused learning experiences',
    icon: Layers,
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Final Year Projects',
    description: 'Comprehensive capstone solutions',
    icon: GraduationCap,
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Hackathon Projects',
    description: 'Winning strategies for competitive events',
    icon: Trophy,
    color: 'from-yellow-500/20 to-amber-500/20',
  },
  {
    title: 'Research Projects',
    description: 'Cutting-edge exploratory work',
    icon: FlaskConical,
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'Resume Building',
    description: 'Outcome-driven profile enhancement',
    icon: FileText,
    color: 'from-indigo-500/20 to-violet-500/20',
  },
  {
    title: 'Career Guidance',
    description: 'Long-term technology career planning',
    icon: Compass,
    color: 'from-teal-500/20 to-cyan-500/20',
  },
];

const WhatWeOffer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation with 3D effect
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              y: 80, 
              opacity: 0,
              rotateX: 45,
              scale: 0.8
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-mono">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-4">
            What We{' '}
            <span className="text-red-500 text-glow">Offer</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Every project is chosen with purpose. We don't believe in one-size-fits-all solutions.
          </p>
        </div>

        {/* Services Grid - Bento Box Style */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLarge = index === 0 || index === 3;
            
            return (
              <div
                key={index}
                className={`service-card content-box group overflow-hidden opacity-0 ${
                  isLarge ? 'md:row-span-1' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Corner Accents */}
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Image Background */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    <img 
                        src={`https://placehold.co/600x400/000000/FFF?text=${encodeURIComponent(service.title)}`} 
                        alt={service.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                </div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Icon with Glow */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-300 group-hover:rotate-3">
                      <Icon className="w-8 h-8 text-red-500" />
                    </div>
                    {/* Icon Glow */}
                    <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-red-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-red-500/10 to-transparent transform translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                </div>

                {/* Bottom Border Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Particle Dots */}
                <div className="absolute bottom-4 right-4 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-red-500/30 group-hover:bg-red-500 transition-colors duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Tagline */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-red-500/30 bg-gradient-to-r from-red-500/5 via-red-500/10 to-red-500/5">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <span className="text-white font-rajdhani text-lg">
              Every project is chosen with purpose
            </span>
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-red-500/10 rounded-full animate-spin-slow" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-red-500/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
    </section>
  );
};

export default WhatWeOffer;
