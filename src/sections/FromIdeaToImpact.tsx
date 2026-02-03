import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Target, Users, FileCheck, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 10, label: 'Projects Delivered', icon: Target, suffix: '+' },
  { number: 5, label: 'College Partnerships', icon: Users, suffix: '+' },
  { number: 10, label: 'Viva + Resume Success', icon: FileCheck, suffix: '+' },
  { number: 4, label: 'Hackathon Wins', icon: Award, suffix: '' },
];

const FromIdeaToImpact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: -80, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0,
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description animation
      gsap.fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards 3D flip animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.stat-card');
        gsap.fromTo(
          cards,
          { rotateY: -90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Counter animation
      countersRef.current.forEach((counter, index) => {
        if (!counter) return;
        const target = stats[index].number;
        
        gsap.fromTo(
          { value: 0 },
          { value: target },
          {
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: counter,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
              if (counter) {
                counter.textContent = Math.floor(this.targets()[0].value).toString();
              }
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white opacity-0"
            >
              From Idea to{' '}
              <span className="text-red-500 text-glow">Impact</span>
            </h2>

            <p
              ref={descRef}
              className="text-lg text-gray-300 leading-relaxed max-w-xl opacity-0"
            >
              Most students don't struggle because they lack intelligence or effort. 
              They struggle because they lack direction, clarity, and real guidance. 
              AXRIGA exists to bridge the gap between academic projects and real-world expectations.
            </p>

            <a
              ref={ctaRef}
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-red-400 font-semibold hover:text-red-300 transition-colors group opacity-0"
            >
              Discover How
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </a>
          </div>

          {/* Right Content - Stats Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-2 gap-4 md:gap-6"
            style={{ perspective: '1200px' }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="stat-card holo-card p-6 md:p-8 text-center opacity-0"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-red-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <span
                      ref={(el) => { countersRef.current[index] = el; }}
                      className="text-4xl md:text-5xl font-bold text-white font-mono"
                    >
                      0
                    </span>
                    <span className="text-2xl md:text-3xl text-red-500 font-bold">{stat.suffix}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 font-rajdhani">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-red-500/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-24 h-24 border border-red-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default FromIdeaToImpact;
