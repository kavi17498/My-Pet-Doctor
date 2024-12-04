import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing
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
      <hr className="border-t-2 border-gray-300 my-4" />
      <Slider />
      <hr className="border-t-2 border-gray-300 my-4" />
      <SelectandSerach />
      <div className="flex flex-row justify-center align-middle gap-5 mt-10">
        {veterinarians.map((vet) => (
          <Link key={vet.id} to={`/profile/${vet.id}`}> {/* Add Link here */}
            <VetCard name={vet.name} des={vet.qualifications} id={vet.id} propic={vet.profilePhotoUrl} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <a className="text-pink-500 text-2xl">See more..</a>
      </div>

      <hr className="border-t-2 border-gray-300 my-4" />
      <Slider2 />
      <NearbyYou />
      <div className="flex flex-row justify-center align-middle gap-5 mt-10">
        {veterinarians.map((vet) => (
          <Link key={vet.id} to={`/profile/${vet.id}`}> {/* Add Link here */}
            <VetCard name={vet.name} des={vet.qualifications} id={vet.id} propic={vet.profilePhotoUrl} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <a className="text-pink-500 text-2xl">See more..</a>
      </div>
      <Footer />
    </>
  );
}

export default Home;
