import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Compass, CheckCircle, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const resumePoints = [
  'Convert projects into strong resume points',
  'Align resumes with job and internship roles',
  'Prepare clear project explanations',
  'Build resumes that have been shortlisted in good companies',
];

const careerPoints = [
  'Guidance on current technology trends',
  'Suggestions for future-proof skills',
  'Career direction beyond academics',
];

const ResumeCareer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Resume card animation
      gsap.fromTo(
        resumeRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
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

      // Career card animation
      gsap.fromTo(
        careerRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bullet points stagger animation
      const resumeBullets = resumeRef.current?.querySelectorAll('.bullet-point');
      const careerBullets = careerRef.current?.querySelectorAll('.bullet-point');

      if (resumeBullets) {
        gsap.fromTo(
          resumeBullets,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: resumeRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (careerBullets) {
        gsap.fromTo(
          careerBullets,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: careerRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Resume Building Card */}
          <div
            ref={resumeRef}
            className="content-box p-8 group opacity-0"
          >
            {/* Corner Accents */}
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 group-hover:rotate-6 transition-all duration-300">
              <FileText className="w-7 h-7 text-red-500" />
            </div>

            {/* Heading */}
            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
              Resume Building
            </h3>
            <p className="text-red-400 text-sm mb-6">
              (Outcome-Driven)
            </p>

            {/* Tagline */}
            <p className="text-gray-400 mb-6 italic">
              We don't write fake or template resumes.
            </p>

            {/* Points */}
            <ul className="space-y-3">
              {resumePoints.map((point, index) => (
                <li
                  key={index}
                  className="bullet-point flex items-start gap-3 opacity-0"
                >
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <div className="mt-8 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex items-start gap-2">
                <Quote className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-gray-400 italic">
                  If you can't explain it, it won't be written.
                </p>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent transition-all duration-500" />
          </div>

          {/* Career Guidance Card */}
          <div
            ref={careerRef}
            className="content-box p-8 group opacity-0"
          >
            {/* Corner Accents */}
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:bg-red-500/20 group-hover:rotate-6 transition-all duration-300">
              <Compass className="w-7 h-7 text-red-500" />
            </div>

            {/* Heading */}
            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
              Career & Future Guidance
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Long-term growth, not just marks.
            </p>

            {/* Points */}
            <ul className="space-y-3">
              {careerPoints.map((point, index) => (
                <li
                  key={index}
                  className="bullet-point flex items-start gap-3 opacity-0"
                >
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>

            {/* Quote */}
            <div className="mt-8 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex items-start gap-2">
                <Quote className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-gray-400 italic">
                  We focus on long-term growth, not just marks.
                </p>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent transition-all duration-500" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-red-500/20" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-red-500/20" />
    </section>
  );
};

export default ResumeCareer;
