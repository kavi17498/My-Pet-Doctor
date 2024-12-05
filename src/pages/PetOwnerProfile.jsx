import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PetCard from '../components/PetComponent';
import { db } from '../firebaseconfig';

function PetOwnerProfile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [petDetails, setPetDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleAddPet() {
    navigate('/addpet');
  }

  function handleViewAppointmentStatus() {
    navigate('/AppoinmentStaus');
  }

  function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);

        try {
          const ownerDocRef = doc(db, 'users', user.uid);
          const ownerDoc = await getDoc(ownerDocRef);

          if (ownerDoc.exists()) {
            setOwnerDetails(ownerDoc.data());
          }

          const petsCollectionRef = collection(db, 'petOwners', user.uid, 'pets');
          const petSnapshot = await getDocs(petsCollectionRef);
          const petList = petSnapshot.docs.map((doc) => doc.data());
          setPetDetails(petList);
        } catch (error) {
          console.error('Error fetching owner or pet details:', error);
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  if (!ownerDetails) {
    return <div className="h-screen flex items-center justify-center text-xl">Owner details not available.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Pet Owner Profile</h1>
        <div className="flex flex-col md:flex-row items-center justify-center w-4/5 bg-white shadow-lg rounded-lg p-6">
          {/* Profile Details */}
          <div className="flex-1 flex flex-col items-center md:items-center border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 pr-0 md:pr-6">
            <img
              src={ownerDetails.profilePhotoUrl || 'https://via.placeholder.com/150'}
              alt={`${ownerDetails.fullName || 'User'}'s Profile`}
              className="w-40 h-40 rounded-full border-4 border-gray-300"
            />
            <div className="mt-6 w-full text-center">
              <p className="text-lg font-semibold text-gray-800 mb-2">Name: {ownerDetails.fullName}</p>
              <p className="text-lg font-semibold text-gray-800 mb-2">Email: {currentUser.email}</p>
              <p className="text-lg font-semibold text-gray-800 mb-4">
                City: {ownerDetails.address || 'Address not available'}
              </p>
              <button
                className="w-full bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 transition"
                onClick={handleViewAppointmentStatus}
              >
                View Appointment Status
              </button>
            </div>
          </div>

          {/* Pet Details */}
          <div className="flex-1 flex flex-col items-center justify-center mt-6 md:mt-0 md:pl-6">
            <button
              className="w-full bg-rose-500 text-white py-2 px-4 rounded shadow hover:bg-rose-600 transition mb-4"
              onClick={handleAddPet}
            >
              Add Pet
            </button>
            {petDetails.length === 0 ? (
              <div className="text-center">
                <p className="text-xl text-gray-600">You don't have any pets yet.</p>
                <p className="text-sm text-gray-400">You can add a pet later!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {petDetails.map((pet, index) => {
                  const age = calculateAge(pet.birthYear);
                  return (
                    <PetCard
                      key={index}
                      pet={{
                        name: pet.petName,
                        species: pet.species,
                        age: `${age} years`,
                        imageUrl: pet.petPhotoUrl || 'https://via.placeholder.com/150',
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PetOwnerProfile;