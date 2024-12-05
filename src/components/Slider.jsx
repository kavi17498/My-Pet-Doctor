import React, { useState, useEffect } from 'react';

const Slider = () => {
  const slides = [
    {
      text: 'Welcome to Vet Finder',
      subText: 'Find the best veterinarians near you.',
      bgImage: 'https://plus.unsplash.com/premium_photo-1683133913662-4a28efc8b6a4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      text: 'Quality Care for Your Pets',
      subText: 'Book appointments with trusted vets.',
      bgImage: 'https://plus.unsplash.com/premium_photo-1663039950073-187c977da2e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHZldGVyaW5hcmlhbnxlbnwwfHwwfHx8MA%3D%3D',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${
            index === currentSlide ? 'block' : 'hidden'
          }`}
        >
          <div
            className="bg-cover bg-center w-full h-full text-white flex flex-col justify-center items-center"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="bg-opacity-50 bg-black p-6 rounded-lg text-center">
              <h1 className="text-4xl font-bold">{slide.text}</h1>
              <p className="text-lg mt-2">{slide.subText}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-500'
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
