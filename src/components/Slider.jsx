import React, { useState, useEffect, useCallback } from 'react';

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: 'Welcome to Vet Finder',
      subtitle: 'Find the best veterinarians near you',
      description: 'Connect with qualified veterinarians in your area and ensure your pets receive the best possible care.',
      bgImage:
        'https://plus.unsplash.com/premium_photo-1683133913662-4a28efc8b6a4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      buttonText: 'Find Vets',
      buttonAction: '/veterinarians'
    },
    {
      id: 2,
      title: 'Quality Care for Your Pets',
      subtitle: 'Book appointments with trusted vets',
      description: 'Schedule appointments with experienced veterinarians who care about your pet\'s health and wellbeing.',
      bgImage:
        'https://plus.unsplash.com/premium_photo-1663039950073-187c977da2e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHZldGVyaW5hcmlhbnxlbnwwfHwwfHx8MA%3D%3D',
      buttonText: 'Book Now',
      buttonAction: '/book-appointment'
    },
    {
      id: 3,
      title: '24/7 Emergency Support',
      subtitle: 'Round-the-clock care when you need it most',
      description: 'Access emergency veterinary services anytime, anywhere. Your pet\'s health is our priority.',
      bgImage:
        'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      buttonText: 'Emergency Care',
      buttonAction: '/emergency'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [slides.length, isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [currentSlide, isTransitioning]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  }, [prevSlide, nextSlide]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div 
      className="relative h-screen w-full overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            index === currentSlide 
              ? 'opacity-100 z-20 translate-x-0' 
              : index < currentSlide 
                ? 'opacity-0 z-10 -translate-x-full' 
                : 'opacity-0 z-10 translate-x-full'
          }`}
        >
          {/* Background Image with Overlay */}
          <div
            className="bg-cover bg-center w-full h-full relative"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            
            {/* Content */}
            <div className="relative z-30 text-white flex flex-col justify-center items-start h-full px-8 md:px-16 lg:px-24">
              <div className="max-w-2xl space-y-6 animate-fadeInUp">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="inline-block animate-slideInLeft">{slide.title}</span>
                </h1>
                
                {/* Subtitle */}
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 font-light">
                  <span className="inline-block animate-slideInLeft animation-delay-200">{slide.subtitle}</span>
                </h2>
                
                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-lg">
                  <span className="inline-block animate-slideInLeft animation-delay-400">{slide.description}</span>
                </p>
                
                {/* CTA Button */}
                <div className="pt-4 animate-slideInLeft animation-delay-600">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={() => {
                      // Handle navigation to slide.buttonAction
                      console.log(`Navigate to: ${slide.buttonAction}`);
                    }}
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group-hover:opacity-100 opacity-0"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group-hover:opacity-100 opacity-0"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`relative w-12 h-1.5 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress bar for current slide */}
              {index === currentSlide && isAutoPlaying && (
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-400 rounded-full animate-progress"
                  style={{ animationDuration: '6s' }}
                ></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-8 right-8 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group-hover:opacity-100 opacity-0"
        aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isAutoPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Slider;
