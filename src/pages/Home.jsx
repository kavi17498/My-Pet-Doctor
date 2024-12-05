import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import VetCard from '../components/VetCard';
import SelectandSerach from '../components/SelectandSerach';
import NearbyYou from '../components/NearbyYou';
import Slider2 from '../components/Slider2';
import Footer from '../components/Footer';
import { db } from '../firebaseconfig.js'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore';

function Home() {
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Error fetching veterinarians:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVeterinarians();
  }, []);

  return (
    <>
      <Navbar />
      <Slider />
      <div className="container mx-auto px-4">
        <hr className="border-t-2 border-gray-300 my-4" />
        
        <hr className="border-t-2 border-gray-300 my-4" />
        <SelectandSerach />

        {/* Responsive Grid Layout for Vet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {veterinarians.map((vet) => (
            <Link key={vet.id} to={`/profile/${vet.id}`} className="flex justify-center">
              <VetCard name={vet.name} des={vet.qualifications} id={vet.id} propic={vet.profilePhotoUrl} />
            </Link>
          ))}
        </div>

        {/* "See more" link */}
        <div className="flex justify-center items-center mt-6">
          <Link to="/more" className=" font-bold text-rose-500 text-xl    hover:underline">See more..</Link>
        </div>

        <hr className="border-t-2 border-gray-300 my-4" />
        <Slider2 />
        <NearbyYou />

        {/* Repeat Vet Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {veterinarians.map((vet) => (
            <Link key={vet.id} to={`/profile/${vet.id}`} className="flex justify-center">
              <VetCard name={vet.name} des={vet.qualifications} id={vet.id} propic={vet.profilePhotoUrl} />
            </Link>
          ))}
        </div>

        {/* "See more" link */}
        <div className="flex justify-center items-center mt-6">
          <Link to="/more" className=" font-bold text-pink-500 text-xl hover:underline">See more..</Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
