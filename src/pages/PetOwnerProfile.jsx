import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PetCard from '../components/PetComponent';
import { db } from '../firebaseconfig'; // Firestore instance

function PetOwnerProfile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [petDetails, setPetDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate here

  // Function to navigate to the Add Pet page
  function handleAddPet() {
    navigate('/addpet'); // Navigate using the 'navigate' function from useNavigate
  }

  // Function to navigate to the Appointment Status page with the current user
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
          // Fetch owner details
          const ownerDocRef = doc(db, 'users', user.uid);
          const ownerDoc = await getDoc(ownerDocRef);

          if (ownerDoc.exists()) {
            setOwnerDetails(ownerDoc.data());
          } else {
            console.error('No owner details found in Firestore.');
          }

          // Fetch pet details from pets sub-collection
          const petsCollectionRef = collection(db, 'petOwners', user.uid, 'pets');
          const petSnapshot = await getDocs(petsCollectionRef);
          const petList = petSnapshot.docs.map(doc => doc.data());
          setPetDetails(petList);

        } catch (error) {
          console.error('Error fetching owner or pet details:', error);
        }
      } else {
        navigate('/login'); // Redirect if user is not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ownerDetails) {
    return <div>Owner details not available.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mt-6">Pet Owner Profile</h1>
        <div className="flex flex-row items-start justify-center p-6 mt-6 w-4/5">
          <div className="flex-1 pr-4 border-r border-gray-200">
            <img
              src={ownerDetails.profilePhotoUrl || 'https://via.placeholder.com/150'}
              alt={`${ownerDetails.fullName || 'User'}'s Profile`}
              className="w-32 h-32 rounded-full border-2 border-gray-300 mx-auto"
            />
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Your Name</label>
                <p className="text-lg font-semibold text-gray-800 mr-4">{ownerDetails.fullName}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg font-semibold text-gray-800 mr-4">{currentUser.email}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-lg font-semibold text-gray-800 mr-4">
                  {ownerDetails.address || 'Phone number not available'}
                </p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <button className='font-bold py-2 px-4 rounded bg-green-500 text-white' onClick={handleViewAppointmentStatus}>View Appointment Status</button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center pl-4">
            <button className='font-bold py-2 px-4 rounded bg-green-500 text-white' onClick={handleAddPet}>Add Pet</button>
            {petDetails.length === 0 ? (
              <div className="text-center mt-6">
                <p className="text-xl text-gray-600">You don't have any pets yet.</p>
                <p className="text-sm text-gray-400">You can add a pet later!</p>
              </div>
            ) : (
              petDetails.map((pet, index) => {
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
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PetOwnerProfile;
