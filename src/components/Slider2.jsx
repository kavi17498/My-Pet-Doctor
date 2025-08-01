import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import vet1 from '../assets/vet 1.png';
import { FaHeart, FaShieldAlt, FaClock, FaUserMd, FaAward, FaPhone } from 'react-icons/fa';
import { MdPets, MdEmergency } from 'react-icons/md';

function Slider2() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('slider2-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: FaHeart,
      title: 'Compassionate Care',
      description: 'Every pet receives loving, personalized attention'
    },
    {
      icon: FaUserMd,
      title: 'Expert Veterinarians',
      description: 'Board-certified professionals with years of experience'
    },
    {
      icon: FaClock,
      title: '24/7 Emergency',
      description: 'Round-the-clock emergency services when you need us'
    },
    {
      icon: FaShieldAlt,
      title: 'Advanced Technology',
      description: 'State-of-the-art equipment for accurate diagnosis'
    }
  ];

  return (
    <section id="slider2-section" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side: Enhanced Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
            {/* Main Heading */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <MdPets className="text-4xl text-blue-600" />
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </div>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Pet's Health,
                </span>
                <br />
                <span className="text-gray-800">Our Priority</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Bridging the gap between you and expert veterinary care. 
                We're committed to providing exceptional healthcare for your beloved companions.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`group p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    isVisible ? 'animate-fadeInUp' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                        <feature.icon className="text-blue-600 group-hover:text-white text-xl transition-colors duration-300" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                to="/veterinarians"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <FaUserMd className="text-lg" />
                <span>Find a Veterinarian</span>
              </Link>
              
              <Link
                to="/emergency"
                className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-red-600 font-semibold px-8 py-4 rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <MdEmergency className="text-lg text-red-500" />
                <span>Emergency Care</span>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex items-center space-x-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaPhone className="text-blue-500" />
                <span className="font-medium">24/7 Hotline: (555) 123-PETS</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaAward className="text-purple-500" />
                <span className="font-medium">Award-Winning Care</span>
              </div>
            </div>
          </div>

          {/* Right side: Enhanced Image */}
          <div className={`relative ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
            <div className="relative">
              {/* Background decorations */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full blur-3xl opacity-60"></div>
              
              {/* Main image container */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={vet1} 
                    alt="Professional Veterinarian" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating badges */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Available Now</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-4 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <FaAward className="text-sm" />
                      <span className="text-sm font-medium">Certified Expert</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats overlay */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl border border-gray-100 px-6 py-4">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">500+</div>
                      <div className="text-xs text-gray-500">Happy Pets</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">50+</div>
                      <div className="text-xs text-gray-500">Expert Vets</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">24/7</div>
                      <div className="text-xs text-gray-500">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slider2;
