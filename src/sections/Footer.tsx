import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram, Twitter, Github, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-16 bg-black overflow-hidden"
    >
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-orbitron font-bold text-white mb-4">
              AXRIGA
            </h3>
            <p className="text-gray-400 mb-6">
              Building projects that actually matter. From idea to impact.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-orbitron font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Projects', 'How It Works', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors font-rajdhani"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-orbitron font-semibold text-white mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                'Project Development',
                'Final Year Projects',
                'Hackathon Projects',
                'Resume Building',
                'Career Guidance',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors font-rajdhani"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center py-8 mb-8 border-t border-[#222]">
          <p className="text-2xl md:text-3xl font-orbitron text-white mb-2">
            Don't just submit a project.
          </p>
          <p className="text-2xl md:text-3xl font-orbitron text-red-500 text-glow">
            Build skills, confidence, and a strong future.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#222]">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by AXRIGA
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 AXRIGA. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-red-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-red-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Brand Tagline */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 font-orbitron text-sm tracking-wider">
            AXRIGA — From idea to impact. Built for your future.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-red-500/5 rounded-full animate-pulse-glow" />
      <div className="absolute top-10 right-10 w-16 h-16 border border-red-500/5 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </footer>
  );
};

export default Footer;
