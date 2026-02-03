import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, AlertTriangle, FileX, MessageSquareOff, Route, Code2, XCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  { text: 'Confused while choosing project ideas', icon: Lightbulb },
  { text: 'Fear of reviews, viva, and technical questions', icon: AlertTriangle },
  { text: 'Projects that add no resume value', icon: FileX },
  { text: 'Unable to explain what they built', icon: MessageSquareOff },
  { text: 'No connection between projects and career goals', icon: Route },
  { text: 'Following outdated technologies', icon: Code2 },
];

const WhereStudentsStuck = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation with glow
      gsap.fromTo(
        headingRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pulsing glow effect
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.6,
          scale: 1.2,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Problem cards entrance with stagger
      if (problemsRef.current) {
        const cards = problemsRef.current.querySelectorAll('.problem-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              x: index % 2 === 0 ? -80 : 80,
              rotateY: index % 2 === 0 ? -30 : 30,
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 50%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.1,
            }
          );
        });

        // Floating animation for cards
        cards.forEach((card, index) => {
          gsap.to(card, {
            y: Math.sin(index * 0.7) * 8,
            duration: 3 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
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
      {/* Animated Background Glow */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-red-600/10 blur-3xl opacity-30"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating X Marks */}
      <div className="absolute top-20 left-10 opacity-20">
        <XCircle className="w-16 h-16 text-red-500 animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <XCircle className="w-20 h-20 text-red-500 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute top-1/3 right-20 opacity-10">
        <XCircle className="w-12 h-12 text-red-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-400 text-sm font-mono">The Problem</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-6">
            Where Most Students{' '}
            <span className="text-red-500 text-glow">Get Stuck</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            This is not a talent problem.{' '}
            <span className="text-red-400 font-semibold">It's a guidance problem.</span>
          </p>
        </div>

        {/* Problems Grid */}
        <div
          ref={problemsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="problem-card content-box group p-6 opacity-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Corner Accents */}
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon with Animation */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-red-500" />
                  </div>
                  {/* Icon Glow */}
                  <div className="absolute inset-0 w-14 h-14 rounded-xl bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Text */}
                <p className="text-gray-300 font-rajdhani text-lg leading-relaxed group-hover:text-white transition-colors relative z-10">
                  {problem.text}
                </p>

                {/* Problem Number */}
                <div className="absolute top-4 right-4 text-4xl font-orbitron font-bold text-red-500/10 group-hover:text-red-500/20 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Bottom Border Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-red-500/20 to-transparent transform translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-red-500/30 bg-gradient-to-r from-red-500/5 via-red-500/10 to-red-500/5">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <span className="text-gray-300 font-rajdhani text-lg">
              Recognizing the problem is the first step toward solving it
            </span>
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-red-500/20" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-red-500/20" />
    </section>
  );
};

export default WhereStudentsStuck;
