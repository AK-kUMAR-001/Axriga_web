import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Zap } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const arcReactorRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const colors = ['rgba(255, 0, 0, ', 'rgba(255, 50, 50, ', 'rgba(255, 100, 100, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.alpha + ')';
        ctx.fill();

        // Draw connections
        if (i % 3 === 0) {
          particles.slice(i + 1).forEach((other) => {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(255, 0, 0, ${0.1 * (1 - distance / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Arc reactor entrance with scale and glow
      tl.fromTo(
        arcReactorRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
      );

      // Continuous rotation for rings with different speeds
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

      // Profile section animation
      tl.fromTo(
        profileRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.5'
      );

      // Headline word-by-word reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: 45 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // Tagline typewriter effect
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, width: 0 },
        { opacity: 1, width: 'auto', duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      );

      // Description fade up
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );

      // CTA buttons bounce in
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        tl.fromTo(
          buttons,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
          '-=0.2'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = 'Build Projects That Actually Matter'.split(' ');

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Radial Glow Background */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-radial from-red-600/20 via-red-900/5 to-transparent blur-3xl animate-pulse-glow" />
      </div>

      {/* Rotatable Arc Reactor */}
      <div
        ref={arcReactorRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] opacity-0"
      >
        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
          {/* Outer Rotating Ring */}
          <div 
            ref={ring1Ref}
            className="absolute inset-0 rounded-full border-2 border-red-500/20"
            style={{ transformOrigin: 'center center' }}
          >
            {/* Ring Markers */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-red-500/40 rounded-full"
                style={{
                  top: '0%',
                  left: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-50%) translateX(-50%)`,
                  transformOrigin: '0 150px',
                }}
              />
            ))}
          </div>
          
          {/* Middle Counter-Rotating Ring */}
          <div 
            ref={ring2Ref}
            className="absolute inset-4 rounded-full border border-red-500/40"
            style={{ transformOrigin: 'center center' }}
          >
            {/* Inner markers */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-4 bg-red-500/30 rounded-full"
                style={{
                  top: '50%',
                  left: '0%',
                  transform: `rotate(${i * 45}deg) translateX(-50%)`,
                  transformOrigin: '130px 0',
                }}
              />
            ))}
          </div>
          
          {/* Inner Rotating Ring */}
          <div 
            ref={ring3Ref}
            className="absolute inset-8 rounded-full border border-red-500/30"
            style={{ transformOrigin: 'center center' }}
          >
            {/* Tech pattern */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,0,0,0.2)" strokeWidth="0.5" strokeDasharray="5 5" />
              {/* Added Complexity for Attraction */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,0,0,0.4)" strokeWidth="0.2" strokeDasharray="2 2" />
              <path d="M50 5 L50 15 M50 85 L50 95 M5 50 L15 50 M85 50 L95 50" stroke="rgba(255,0,0,0.5)" strokeWidth="1" />
            </svg>
          </div>
          
          {/* Enhanced Core Glow Rings */}
          <div className="absolute inset-12 rounded-full bg-gradient-radial from-red-500/50 via-red-600/30 to-transparent animate-pulse-glow" />
          <div className="absolute inset-16 rounded-full bg-gradient-radial from-red-400/60 via-red-500/40 to-transparent animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-[4.5rem] rounded-full border border-red-500/40 animate-spin-slow" style={{ animationDuration: '4s' }} />
          
          {/* Center Core */}
          <div className="absolute inset-20 rounded-full bg-gradient-radial from-white via-red-300 to-red-600 arc-glow-intense flex items-center justify-center">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/90 arc-glow-intense animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-red-500/50 animate-ping" />
            </div>
          </div>
          
          {/* Expanding Pulse Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-4 rounded-full border border-red-500/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
          <div className="absolute inset-8 rounded-full border border-red-500/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        </div>
      </div>

      {/* Profile Section - Top Right */}
      <div
        ref={profileRef}
        className="absolute top-20 right-4 md:right-10 z-20 opacity-0"
      >
        <div className="group relative">
          {/* Profile Image Container */}
          <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-red-500/50 group-hover:border-red-500 transition-all duration-300">
            {/* Placeholder - User will add their image as profile.png/jpeg */}
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center px-2">Add profile.png</span>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full arc-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Status Indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black border-2 border-red-500 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          </div>
          
          {/* Name Tag */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs text-red-400 font-mono bg-black/80 px-2 py-1 rounded border border-red-500/30">
              Founder
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[250px] md:mt-[300px]">
        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-6 perspective-1000"
        >
          {headlineWords.map((word, index) => (
            <span
              key={index}
              className="word inline-block mr-3 md:mr-4 opacity-0"
              style={{ textShadow: '0 0 40px rgba(255, 0, 0, 0.3), 0 0 80px rgba(255, 0, 0, 0.1)' }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-lg md:text-xl font-rajdhani text-red-400 tracking-[0.3em] mb-8 opacity-0 overflow-hidden whitespace-nowrap"
        >
          Ideas • Innovation • Execution
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          AXRIGA helps students build real, explainable, interview-ready projects.
          <br />
          <span className="text-red-400">No copied work. No shortcuts. No fake promises.</span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn-primary flex items-center gap-2 group">
            <Zap className="w-5 h-5 text-red-500 group-hover:animate-pulse" />
            Start Your Journey
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="btn-secondary flex items-center gap-2">
            Explore Projects
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          If your project cannot survive a review, viva, or interview questioning — we don't deliver it.
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[5]" />

      {/* Scan Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[6] opacity-30">
        <div className="w-full h-full" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.02) 2px, rgba(255, 0, 0, 0.02) 4px)'
        }} />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-red-500/20" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-red-500/20" />
    </section>
  );
};

export default Hero;
