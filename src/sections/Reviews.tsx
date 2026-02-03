import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    text: "AXRIGA helped me understand my project clearly. I attended my viva without fear.",
    author: "Final Year Student",
    rating: 5,
  },
  {
    text: "This wasn't just a project. It actually helped me explain my skills in interviews.",
    author: "Engineering Graduate",
    rating: 5,
  },
  {
    text: "The guidance mattered more than the project itself.",
    author: "Hackathon Participant",
    rating: 5,
  },
];

const Reviews = () => {
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating Quote Marks */}
      <div className="absolute top-20 left-20 opacity-10">
        <Quote className="w-24 h-24 text-red-500" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-10 rotate-180">
        <Quote className="w-20 h-20 text-red-500" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <MessageSquare className="w-4 h-4 text-red-500" />
            <span className="text-red-400 text-sm font-mono">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white mb-4">
            Customer{' '}
            <span className="text-red-500 text-glow">Reviews</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real feedback from real students who transformed their academic journey.
          </p>
        </div>

        {/* 3D Carousel */}
        <div ref={carouselRef} className="relative opacity-0" style={{ perspective: '1500px' }}>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/80 border border-red-500/30 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 hover:scale-110 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/80 border border-red-500/30 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500 hover:scale-110 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
          </button>

          {/* Cards Container */}
          <div className="relative h-[350px] md:h-[400px] flex items-center justify-center px-16">
            {reviews.map((review, index) => {
              const offset = index - currentIndex;
              const isActive = index === currentIndex;
              
              return (
                <div
                  key={index}
                  className={`absolute w-full max-w-2xl transition-all duration-700 ease-out ${
                    isActive ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    transform: `
                      translateX(${offset * 70}%) 
                      translateZ(${isActive ? 0 : -300}px) 
                      rotateY(${offset * 35}deg)
                      scale(${isActive ? 1 : 0.75})
                    `,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4,
                  }}
                >
                  <div className={`content-box relative p-8 md:p-12 ${isActive ? 'border-red-500/50 arc-glow' : ''}`}>
                    {/* Corner Accents */}
                    <div className="corner-tl" />
                    <div className="corner-tr" />
                    <div className="corner-bl" />
                    <div className="corner-br" />
                    {/* Glow Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
                    
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-8">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                          <Quote className="w-8 h-8 text-red-500" />
                        </div>
                        {/* Icon Glow */}
                        <div className="absolute inset-0 w-16 h-16 rounded-full bg-red-500/20 blur-xl" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-8">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-xl md:text-2xl text-white text-center font-rajdhani leading-relaxed mb-8 relative z-10">
                      "{review.text}"
                    </p>

                    {/* Author */}
                    <div className="text-center relative z-10">
                      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/30">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-red-400 font-mono text-sm">
                          — {review.author}
                        </span>
                      </div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-red-500/20" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-red-500/20" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-red-500 arc-glow w-10'
                    : 'bg-gray-700 w-3 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-red-500/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-red-500/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Reviews;
