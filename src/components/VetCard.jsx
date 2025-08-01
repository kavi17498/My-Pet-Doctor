import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FaUser, FaStar, FaMapMarkerAlt, FaPhone, FaClock, FaHeart } from 'react-icons/fa';
import { MdPets, MdVerified } from 'react-icons/md';

function VetCard({ name, des, id, propic }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mock data for demonstration - in real app, this would come from props or API
  const vetData = {
    rating: 4.8,
    reviewCount: 127,
    location: 'Downtown Area',
    phone: '+1 (555) 123-4567',
    availability: 'Available Today',
    isVerified: true,
    specialties: ['General Care', 'Surgery'],
    yearsExperience: 8
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleProfileClick = () => {
    if (loading) return;

    if (currentUser) {
      navigate(`/profile/${id}`);
    } else {
      alert('You need to be logged in to view the profile.');
      navigate('/login');
    }
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 max-w-sm mx-auto transform hover:-translate-y-2 ${
        isHovered ? 'scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110"
      >
        <FaHeart className={`text-lg transition-colors duration-300 ${
          isFavorite ? 'text-red-500' : 'text-gray-400'
        }`} />
      </button>

      <div className="relative p-6">
        {/* Profile Image Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300">
              <img
                src={propic || '/api/placeholder/96/96'}
                alt={`Dr. ${name}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = '/api/placeholder/96/96';
                }}
              />
            </div>
            {vetData.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                <MdVerified className="text-white text-lg" />
              </div>
            )}
            <div className="absolute -top-1 -left-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
              <MdPets className="text-white text-sm" />
            </div>
          </div>
        </div>

        {/* Vet Information */}
        <div className="text-center space-y-3">
          {/* Name and Title */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Dr. {name}
            </h3>
            <p className="text-blue-600 font-medium text-sm">{des}</p>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`text-sm ${
                    i < Math.floor(vetData.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">
              {vetData.rating} ({vetData.reviewCount} reviews)
            </span>
          </div>

          {/* Quick Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>{vetData.location}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <FaClock className="text-green-500" />
              <span className="text-green-600 font-medium">{vetData.availability}</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap justify-center gap-2">
            {vetData.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <button
              onClick={handleProfileClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              View Full Profile
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-all duration-300 text-sm font-medium">
                <FaPhone className="text-xs" />
                <span>Call</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-lg transition-all duration-300 text-sm font-medium">
                <FaClock className="text-xs" />
                <span>Book</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}

export default VetCard;
