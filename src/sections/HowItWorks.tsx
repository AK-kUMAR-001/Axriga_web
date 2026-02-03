import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserCircle, Lightbulb, Code, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Understand You',
    description: 'We learn about your goals, interests, strengths, and timeline. Every great project starts with understanding the builder.',
    icon: UserCircle,
  },
  {
    number: '02',
    title: 'Design the Idea',
    description: 'We create a custom project aligned with your skills, resume value, and future scope. No cookie-cutter solutions.',
    icon: Lightbulb,
  },
  {
    number: '03',
    title: 'Build & Learn',
    description: 'You build the project with proper guidance, logic, and explanation. You own every line of code.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Prepare for Proof',
    description: 'We help you prepare for viva, reviews, interviews, and resume presentation. Confidence through preparation.',
    icon: Shield,
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      // Steps animation
      if (stepsRef.current) {
        const stepCards = stepsRef.current.querySelectorAll('.step-card');
        stepCards.forEach((card, index) => {
          const number = card.querySelector('.step-number');
          const content = card.querySelector('.step-content');
          const icon = card.querySelector('.step-icon');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });

          // Number counter animation
          tl.fromTo(
            number,
            { scale: 1.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
          );

          // Icon animation
          tl.fromTo(
            icon,
            { scale: 0, rotate: -180 },
            { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(1.7)' },
            '-=0.3'
          );

          // Content slide in
          tl.fromTo(
            content,
            { x: index % 2 === 0 ? 60 : -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
            '-=0.2'
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-600/5 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-center text-white mb-16 opacity-0"
        >
          How AXRIGA{' '}
          <span className="text-red-500 text-glow">Works</span>
        </h2>

        {/* Steps Grid */}
        <div ref={stepsRef} className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="step-card content-box p-8 group"
              >
                {/* Corner Accents */}
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                
                {/* Background Number */}
                <span className="step-number absolute -top-4 -left-2 text-[120px] font-orbitron font-bold text-red-500/5 leading-none select-none opacity-0">
                  {step.number}
                </span>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="step-icon w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center arc-glow opacity-0">
                      <Icon className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                      <span className="text-red-500 font-mono text-sm">
                        STEP {step.number}
                      </span>
                      <h3 className="text-xl font-orbitron font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="step-content text-gray-400 leading-relaxed opacity-0">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                        style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {Math.round(((index + 1) / steps.length) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Ready to start your journey?
          </p>
          <button className="btn-primary">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border border-red-500/10 rounded-full animate-spin-slow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-red-500/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
    </section>
  );
};

export default HowItWorks;
