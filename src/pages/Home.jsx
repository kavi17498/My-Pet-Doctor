import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import VetCard from '../components/VetCard';
import SelectandSerach from '../components/SelectandSerach';
import NearbyYou from '../components/NearbyYou';
import Slider2 from '../components/Slider2';
import Footer from '../components/Footer';
import { db } from '../firebaseconfig.js';
import { collection, getDocs } from 'firebase/firestore';
import { FaArrowRight, FaSpinner, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { MdPets, MdTrendingUp } from 'react-icons/md';

function Home() {
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredVets, setFeaturedVets] = useState([]);

  useEffect(() => {
    const fetchVeterinarians = async () => {
      try {
        const vetsCollection = collection(db, 'veterinarians');
        const vetDocs = await getDocs(vetsCollection);
        const vetsData = [];

        for (const vetDoc of vetDocs.docs) {
          const vet = { id: vetDoc.id, ...vetDoc.data() };
          const profileCollection = collection(db, `veterinarians/${vet.id}/profile`);
          const profileDocs = await getDocs(profileCollection);
          const profileData = profileDocs.docs.map((doc) => doc.data().profilePhotoUrl);
          vet.profilePhotoUrl = profileData.length > 0 ? profileData[0] : null;
          vetsData.push(vet);
        }

        setVeterinarians(vetsData);
        // Set first 3 as featured for demo
        setFeaturedVets(vetsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching veterinarians:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVeterinarians();
  }, []);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center space-x-3">
        <FaSpinner className="text-3xl text-blue-600 animate-spin" />
        <span className="text-lg text-gray-600">Loading veterinarians...</span>
      </div>
    </div>
  );

  const SectionHeader = ({ title, subtitle, icon: Icon }) => (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-3">
          <Icon className="text-4xl text-blue-600" />
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>
      </div>
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Slider />
      
      {/* Main Content */}
      <main className="relative">
        {/* Search Section */}
        <SelectandSerach />

        {/* Featured Veterinarians Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Featured Veterinarians"
              subtitle="Meet our top-rated veterinary professionals who provide exceptional care for your pets"
              icon={FaStar}
            />

            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {featuredVets.map((vet) => (
                    <div key={vet.id} className="flex justify-center">
                      <VetCard 
                        name={vet.name} 
                        des={vet.qualifications} 
                        id={vet.id} 
                        propic={vet.profilePhotoUrl} 
                      />
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                  <Link
                    to="/veterinarians"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <span>View All Veterinarians</span>
                    <FaArrowRight className="text-lg" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-6">
              <MdPets className="text-4xl text-blue-500" />
            </div>
          </div>
        </div>

        {/* About Section - Enhanced Slider2 */}
        <Slider2 />

        {/* Nearby Veterinarians Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Find Veterinarians Near You"
              subtitle="Discover trusted veterinary care in your local area with easy appointment booking"
              icon={FaMapMarkerAlt}
            />
            
            <NearbyYou />

            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-12">
                  {veterinarians.slice(0, 6).map((vet) => (
                    <div key={vet.id} className="flex justify-center">
                      <VetCard 
                        name={vet.name} 
                        des={vet.qualifications} 
                        id={vet.id} 
                        propic={vet.profilePhotoUrl} 
                      />
                    </div>
                  ))}
                </div>

                {/* See More Button */}
                <div className="text-center">
                  <Link
                    to="/veterinarians"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline transition-all duration-300 group"
                  >
                    <span>Explore More Veterinarians</span>
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
              <div className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold">500+</div>
                <div className="text-blue-100">Happy Pets Treated</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold">50+</div>
                <div className="text-blue-100">Expert Veterinarians</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold">24/7</div>
                <div className="text-blue-100">Emergency Support</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold">98%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
                  Ready to Give Your Pet the Best Care?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Join thousands of pet owners who trust us with their beloved companions. 
                  Book an appointment today and experience exceptional veterinary care.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <span>Book Appointment</span>
                  <FaArrowRight className="text-lg" />
                </Link>
                
                <Link
                  to="/emergency"
                  className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-red-600 font-semibold px-8 py-4 rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Emergency Care</span>
                  <MdTrendingUp className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
