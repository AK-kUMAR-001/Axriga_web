import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const colleges = [
  'Rathinam College of Arts & Science',
  'Rathinam Technical Campus',
  'SASTRA Deemed University',
  'Karpagam College of Engineering',
  'Karpagam Institutions',
  'Hindusthan College of Engineering & Technology',
  'Hindusthan Group of Institutions',
];

const Colleges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Scrolling rows animation
      if (scrollRef.current) {
        const rows = scrollRef.current.querySelectorAll('.scroll-row');
        rows.forEach((row, index) => {
          gsap.fromTo(
            row,
            { x: index % 2 === 0 ? '100%' : '-100%', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
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

  // Duplicate colleges for seamless scroll
  const duplicatedColleges = [...colleges, ...colleges];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/5 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-4">
            Colleges We Have{' '}
            <span className="text-red-500 text-glow">Worked With</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AXRIGA has supported students from multiple institutions through projects, hackathons, and career guidance.
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div ref={scrollRef} className="space-y-4">
          {/* Row 1 - Scroll Left */}
          <div className="scroll-row relative overflow-hidden opacity-0">
            <div className="flex animate-scroll-left">
              {duplicatedColleges.map((college, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 mx-3 px-6 py-4 rounded-full bg-[#111] border border-[#333] flex items-center gap-3 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300 group"
                >
                  <GraduationCap className="w-5 h-5 text-red-500/50 group-hover:text-red-500 transition-colors" />
                  <span className="text-gray-400 whitespace-nowrap group-hover:text-white transition-colors font-rajdhani">
                    {college}
                  </span>
                </div>
              ))}
            </div>
            {/* Edge Fade */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>

          {/* Row 2 - Scroll Right */}
          <div className="scroll-row relative overflow-hidden opacity-0">
            <div className="flex animate-scroll-right">
              {duplicatedColleges.reverse().map((college, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 mx-3 px-6 py-4 rounded-full bg-[#111] border border-[#333] flex items-center gap-3 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300 group"
                >
                  <GraduationCap className="w-5 h-5 text-red-500/50 group-hover:text-red-500 transition-colors" />
                  <span className="text-gray-400 whitespace-nowrap group-hover:text-white transition-colors font-rajdhani">
                    {college}
                  </span>
                </div>
              ))}
            </div>
            {/* Edge Fade */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-red-500/30 bg-red-500/5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-gray-300 font-rajdhani">
              We focus on results, not name-dropping.
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-24 h-24 border border-red-500/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-32 h-32 border border-red-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* CSS for infinite scroll */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 35s linear infinite;
        }
        .scroll-row:hover .animate-scroll-left,
        .scroll-row:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Colleges;
