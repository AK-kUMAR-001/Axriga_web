import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Smart Landslide Vehicle Detection System',
    domain: 'AI / Computer Vision',
    description: 'Detects vehicles stuck in landslide-affected areas and alerts rescue teams in real time.',
    image: 'https://placehold.co/800x600/111111/ef4444?text=Landslide+Detection',
  },
  {
    title: 'Drone-Based Precision Agriculture System',
    domain: 'Drones / IoT / AI',
    description: 'Identifies unhealthy crops and sprays fertilizer only where needed, reducing waste and cost.',
    image: 'https://placehold.co/800x600/111111/ef4444?text=Precision+Agriculture',
  },
  {
    title: 'Smart Biofiltration System for Greywater Reuse',
    domain: 'Environmental Technology / IoT',
    description: 'A low-cost system designed to safely reuse household greywater.',
    image: 'https://placehold.co/800x600/111111/ef4444?text=Biofiltration+System',
  },
  {
    title: 'Intelligent Navigation & Risk Alert System',
    domain: 'AI / Mapping',
    description: 'Provides shortest and safest routes with alerts for blocked or unsafe paths.',
    image: 'https://placehold.co/800x600/111111/ef4444?text=Smart+Navigation',
  },
];

const RecentProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
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

      // Cards 3D unfold animation with enhanced effects
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              rotateY: -45, 
              opacity: 0,
              x: index % 2 === 0 ? -50 : 50,
            },
            {
              rotateY: 0,
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.15,
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
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <Layers className="w-4 h-4 text-red-500" />
            <span className="text-red-400 text-sm font-mono">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-4">
            Recent{' '}
            <span className="text-red-500 text-glow">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real solutions for real problems. Each project represents innovation, dedication, and practical impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-8"
          style={{ perspective: '1500px' }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card content-box group overflow-hidden opacity-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Corner Accents */}
              <div className="corner-tl z-20" />
              <div className="corner-tr z-20" />
              <div className="corner-bl z-20" />
              <div className="corner-br z-20" />
              {/* Image Container */}
              <div className="relative h-56 md:h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                {/* Image Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent opacity-80" />
                
                {/* Domain Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 rounded-full bg-black/80 border border-red-500/30 text-xs text-red-400 font-mono backdrop-blur-sm">
                    {project.domain}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-red-500/0 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-red-500/20 group-hover:border-red-500/50 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>

                {/* Project Number */}
                <div className="absolute bottom-4 right-4 text-6xl font-orbitron font-bold text-white/5 group-hover:text-white/10 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* View Project Link */}
                <div className="flex items-center gap-2 text-red-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-sm font-medium">View Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
              </div>

              {/* Bottom Border Animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-red-500/10 to-transparent transform translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-white font-orbitron hover:bg-red-500/30 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              View All Projects
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-red-500/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-red-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default RecentProjects;
