import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    event: 'Smart India Hackathon (SIH)',
    result: 'National Winner',
    year: '2025',
    location: 'National Level',
    description: 'Delivered a high-impact solution evaluated at the national level.',
    highlight: true,
  },
  {
    event: 'National Hackathon – GCEM 3.0',
    result: 'Winner',
    year: '2025',
    location: 'Bangalore',
    description: 'Built a practical and scalable solution under strict time and jury pressure.',
    highlight: true,
  },
  {
    event: 'NIDAR Drone Event',
    result: 'Participant',
    year: '2025',
    location: 'Delhi',
    description: 'Hands-on exposure to drone and defense-oriented technologies.',
    highlight: false,
  },
  {
    event: 'Rathinam Technical Campus Hackathon',
    result: 'Winner',
    year: '2024',
    location: 'Coimbatore',
    description: 'Recognized for technical innovation and real-world problem solving.',
    highlight: true,
  },
];

const SuccessPath = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
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

      // Carousel animation
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-4">
            Our Success &{' '}
            <span className="text-red-500 text-glow">Victory Path</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real achievements from real competitions. Every win represents countless hours of dedication and innovation.
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative opacity-0">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 border border-red-500/30 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 border border-red-500/30 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-16">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className={`holo-card p-8 md:p-12 ${achievement.highlight ? 'border-red-500/40' : ''}`}>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Trophy className={`w-6 h-6 ${achievement.highlight ? 'text-red-500' : 'text-gray-500'}`} />
                          <span className="text-sm font-mono text-gray-500">{achievement.year}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white">
                          {achievement.event}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{achievement.location}</span>
                      </div>
                    </div>

                    {/* Result Badge */}
                    <div className="mb-6">
                      <span className={`inline-block px-6 py-3 rounded-full text-xl font-orbitron font-bold ${
                        achievement.highlight
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40 arc-glow'
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}>
                        {achievement.result}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {achievements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-red-500 arc-glow w-8'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '4', label: 'Major Wins' },
            { value: '2', label: 'National Level' },
            { value: '2024-26', label: 'Active Years' },
            { value: '100%', label: 'Dedication in Action' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-3xl md:text-4xl font-orbitron font-bold text-red-500 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-40 h-40 border border-red-500/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-32 h-32 border border-red-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default SuccessPath;
