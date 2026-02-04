import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Send, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Contact AXRIGA';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading glitch reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          onStart: () => {
            // Glitch text effect
            let iteration = 0;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const interval = setInterval(() => {
              setDisplayText(
                fullText
                  .split('')
                  .map((_, index) => {
                    if (index < iteration) return fullText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                  })
                  .join('')
              );
              iteration += 1 / 2;
              if (iteration >= fullText.length) {
                clearInterval(interval);
                setDisplayText(fullText);
              }
            }, 30);
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-center text-white mb-12 opacity-0"
        >
          <span className="text-red-500 text-glow">{displayText || fullText}</span>
        </h2>

        {/* Contact Content */}
        <div ref={contentRef} className="opacity-0">
          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Phone */}
            <a
              href="tel:8925081899"
              className="holo-card p-8 flex items-center gap-6 group hover:border-red-500/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-300">
                <Phone className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Call Us</p>
                <p className="text-2xl font-orbitron font-bold text-white group-hover:text-red-400 transition-colors">
                  8925081899
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:akshayprabhu19012005@gmail.com"
              className="holo-card p-8 flex items-center gap-6 group hover:border-red-500/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Email Us</p>
                <p className="text-base sm:text-lg font-rajdhani font-semibold text-white group-hover:text-red-400 transition-colors break-words">
                  akshayprabhu19012005@gmail.com
                </p>
              </div>
            </a>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-5">
              <Zap className="w-6 h-6 text-red-500" />
              Initialize Contact
              <Send className="w-5 h-5" />
            </button>
            <p className="text-gray-500 mt-4 text-sm">
              Start your journey to building projects that matter
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-24 h-24 border border-red-500/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border border-red-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Contact;
