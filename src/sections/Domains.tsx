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

      // Center arc reactor rings rotation - REMOVED for clean planetary look


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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!centerRef.current) return;
    
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;

    gsap.to(centerRef.current, {
      x: x * 30,
      y: y * 30,
      rotationY: x * 20,
      rotationX: -y * 20,
      duration: 1,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
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

      {/* Orbital Layout - Planetary System */}
        <div
          ref={orbitRef}
          className="relative mx-auto opacity-0"
          style={{ width: '600px', height: '600px', maxWidth: '100%' }}
        >
          {/* Central Star/Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-red-600 to-red-900 shadow-[0_0_100px_rgba(220,38,38,0.6)] flex items-center justify-center z-20 border-4 border-red-500/30">
             <div className="text-center">
                <span className="block text-4xl font-bold text-white font-orbitron">8+</span>
                <span className="block text-sm text-red-200 uppercase tracking-widest mt-1">Domains</span>
             </div>
             {/* Core Pulse */}
             <div ref={centerRef} className="absolute inset-0 rounded-full border border-red-400/50 animate-ping opacity-20" />
          </div>

          {/* Orbit Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-red-500/20 border-dashed animate-spin-slow" style={{ animationDuration: '60s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-red-500/10" />

          {/* Orbiting Planets (Icons) */}
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            const total = domains.length;
            const delay = -(20 / total) * index; // Negative delay for immediate positioning

            return (
              <div
                key={index}
                className="orbit-icon absolute top-1/2 left-1/2 w-32 h-32 -ml-16 -mt-16 flex flex-col items-center justify-center gap-2 group cursor-pointer z-30 hover:scale-125 hover:z-40"
                style={{
                  '--orbit-radius': '225px',
                  animation: 'orbit 20s linear infinite',
                  animationDelay: `${delay}s`,
                } as React.CSSProperties}
              >
                {/* Icon Container */}
                <div className="relative w-20 h-20 rounded-2xl bg-black/80 border border-red-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.2)] group-hover:bg-red-600 group-hover:border-red-400 group-hover:shadow-[0_0_40px_rgba(220,38,38,0.8)] transition-all duration-300">
                  <Icon className="w-10 h-10 text-red-500 group-hover:text-white transition-colors duration-300" />
                </div>
                
                {/* Label - Always Visible */}
                <span className="text-sm font-bold text-gray-300 bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-red-500/10 group-hover:text-white group-hover:border-red-500/50 transition-all duration-300 whitespace-nowrap">
                  {domain.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 flex justify-center gap-8 md:gap-16">
          {[
            { value: '8+', label: 'Tech Domains' },
            { value: '100+', label: 'Technologies' },
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
