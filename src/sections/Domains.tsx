import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, 
  BarChart3, 
  Globe, 
  Smartphone, 
  Cpu, 
  Plane, 
  Shield, 
  Cloud 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const domains = [
  { name: 'AI & ML', icon: Brain },
  { name: 'Data Science', icon: BarChart3 },
  { name: 'Web Dev', icon: Globe },
  { name: 'Mobile Apps', icon: Smartphone },
  { name: 'IoT', icon: Cpu },
  { name: 'Drones', icon: Plane },
  { name: 'Security', icon: Shield },
  { name: 'Cloud', icon: Cloud },
];

const Domains = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const ring4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Center arc reactor rings rotation
      if (ring1Ref.current) {
        gsap.to(ring1Ref.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        });
      }
      if (ring2Ref.current) {
        gsap.to(ring2Ref.current, {
          rotation: -360,
          duration: 15,
          repeat: -1,
          ease: 'none',
        });
      }
      if (ring3Ref.current) {
        gsap.to(ring3Ref.current, {
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: 'none',
        });
      }
      if (ring4Ref.current) {
        gsap.to(ring4Ref.current, {
          rotation: -360,
          duration: 30,
          repeat: -1,
          ease: 'none',
        });
      }

      // Orbit container entrance
      gsap.fromTo(
        orbitRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Domain icons entrance with stagger
      const icons = orbitRef.current?.querySelectorAll('.orbit-icon');
      if (icons) {
        icons.forEach((icon, index) => {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 50%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.5 + index * 0.1,
            }
          );
        });
      }

      // Center glow pulse
      if (centerRef.current) {
        gsap.to(centerRef.current, {
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
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
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-red-600/10 blur-3xl animate-pulse-glow" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-mono">Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-4">
            Domains We{' '}
            <span className="text-red-500 text-glow">Cover</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            All domains are available. Choose what aligns with your passion and career goals.
          </p>
        </div>

        {/* Orbital Layout */}
        <div
          ref={orbitRef}
          className="relative mx-auto opacity-0"
          style={{ width: '500px', height: '500px', maxWidth: '100%' }}
        >
          {/* SVG Connection Lines - Spider Web */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 0, 0, 0.6)" />
                <stop offset="50%" stopColor="rgba(255, 50, 50, 0.3)" />
                <stop offset="100%" stopColor="rgba(255, 0, 0, 0.1)" />
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer web ring */}
            <circle cx="250" cy="250" r="180" fill="none" stroke="url(#webGradient)" strokeWidth="0.5" opacity="0.3" />
            
            {/* Middle web ring */}
            <circle cx="250" cy="250" r="120" fill="none" stroke="url(#webGradient)" strokeWidth="0.5" opacity="0.4" />
            
            {/* Inner web ring */}
            <circle cx="250" cy="250" r="60" fill="none" stroke="url(#webGradient)" strokeWidth="0.5" opacity="0.5" />

            {/* Connection lines from center to each domain */}
            {domains.map((_, index) => {
              const angle = (index * 45 - 90) * (Math.PI / 180);
              const x2 = 250 + 180 * Math.cos(angle);
              const y2 = 250 + 180 * Math.sin(angle);
              return (
                <line
                  key={index}
                  x1="250"
                  y1="250"
                  x2={x2}
                  y2={y2}
                  stroke="url(#webGradient)"
                  strokeWidth="1"
                  filter="url(#lineGlow)"
                  opacity="0.6"
                />
              );
            })}

            {/* Cross connections for web effect */}
            {domains.map((_, index) => {
              const angle1 = (index * 45 - 90) * (Math.PI / 180);
              const angle2 = ((index + 1) * 45 - 90) * (Math.PI / 180);
              const x1 = 250 + 120 * Math.cos(angle1);
              const y1 = 250 + 120 * Math.sin(angle1);
              const x2 = 250 + 120 * Math.cos(angle2);
              const y2 = 250 + 120 * Math.sin(angle2);
              return (
                <line
                  key={`cross-${index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#webGradient)"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              );
            })}
          </svg>

          {/* Tony Stark Style Center Arc Reactor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              {/* Outer rotating ring with markers */}
              <div 
                ref={ring1Ref}
                className="absolute -inset-4 rounded-full border-2 border-red-500/30"
                style={{ transformOrigin: 'center center' }}
              >
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-3 bg-red-500/50 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 30}deg) translateY(-92px) translateX(-50%)`,
                      transformOrigin: '50% 92px',
                    }}
                  />
                ))}
              </div>

              {/* Second rotating ring */}
              <div 
                ref={ring2Ref}
                className="absolute -inset-2 rounded-full border border-red-500/40"
                style={{ transformOrigin: 'center center' }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-4 bg-red-500/40 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-78px) translateX(-50%)`,
                      transformOrigin: '50% 78px',
                    }}
                  />
                ))}
              </div>

              {/* Third ring - tech pattern */}
              <div 
                ref={ring3Ref}
                className="absolute inset-0 rounded-full border border-red-500/50"
                style={{ transformOrigin: 'center center' }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,0,0,0.3)" strokeWidth="0.5" strokeDasharray="8 4" />
                </svg>
              </div>

              {/* Fourth inner ring */}
              <div 
                ref={ring4Ref}
                className="absolute inset-4 rounded-full border border-red-500/60"
                style={{ transformOrigin: 'center center' }}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-3 bg-red-500/60 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 60}deg) translateY(-42px) translateX(-50%)`,
                      transformOrigin: '50% 42px',
                    }}
                  />
                ))}
              </div>

              {/* Glow layers */}
              <div className="absolute inset-6 rounded-full bg-gradient-radial from-red-500/50 via-red-600/30 to-transparent animate-pulse-glow" />
              <div className="absolute inset-8 rounded-full bg-gradient-radial from-red-400/60 via-red-500/40 to-transparent animate-pulse-glow" style={{ animationDelay: '0.3s' }} />
              <div className="absolute inset-10 rounded-full bg-gradient-radial from-white/80 via-red-300 to-red-500 arc-glow-intense" />

              {/* Center core */}
              <div 
                ref={centerRef}
                className="absolute inset-14 rounded-full bg-white arc-glow-intense flex items-center justify-center"
              >
                <span className="text-red-600 font-orbitron font-bold text-xl md:text-2xl">8+</span>
              </div>

              {/* Expanding pulse rings */}
              <div className="absolute -inset-4 rounded-full border-2 border-red-500/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute -inset-2 rounded-full border border-red-500/15 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              <div className="absolute inset-0 rounded-full border border-red-500/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            </div>
          </div>

          {/* Orbiting Domain Icons */}
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            const angle = (index * 45 - 90) * (Math.PI / 180);
            const radius = 180;
            const x = 50 + (radius / 250) * 50 * Math.cos(angle);
            const y = 50 + (radius / 250) * 50 * Math.sin(angle);
            
            return (
              <div
                key={index}
                className="orbit-icon absolute z-10"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="group relative">
                  {/* Glow container */}
                  <div className="absolute inset-0 rounded-2xl bg-red-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />
                  
                  {/* Icon Container */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-red-500/40 flex items-center justify-center group-hover:border-red-500 group-hover:bg-red-500/20 transition-all duration-300 group-hover:scale-110 arc-glow">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-red-400 group-hover:text-red-300 transition-colors" />
                  </div>
                  
                  {/* Label */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs md:text-sm text-white font-rajdhani bg-black/90 px-3 py-1.5 rounded-full border border-red-500/50 arc-glow">
                      {domain.name}
                    </span>
                  </div>

                  {/* Connection dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 flex justify-center gap-8 md:gap-16">
          {[
            { value: '8+', label: 'Tech Domains' },
            { value: '50+', label: 'Technologies' },
            { value: '∞', label: 'Possibilities' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-orbitron font-bold text-red-500 mb-1 text-glow">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-red-500/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border border-red-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Domains;
