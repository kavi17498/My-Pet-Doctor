import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Authentication

function VetCard({ name, des, id, propic }) {
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth
  const [loading, setLoading] = useState(true); // State to manage loading
  const [currentUser, setCurrentUser] = useState(null); // State to store the authenticated user

  useEffect(() => {
    // Track authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Update the user state
      setLoading(false); // Stop loading once state is determined
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [auth]);

  const handleProfileClick = () => {
    if (loading) {
      return; // Prevent any actions while still loading
    }

    if (currentUser) {
      navigate(`/profile/${id}`); // Navigate to profile if authenticated
    } else {
      alert('You need to be logged in to view the profile.');
      navigate('/login'); // Redirect to login if not authenticated
    }
  };

  // Display a loading spinner until the authentication state is determined
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl mt-10 m-5 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 flex flex-col justify-between">
      <figure className="flex justify-center mt-4">
        <img
          className="rounded-full border-4 border-rose-500 w-32 h-32 object-cover"
          src={propic}
          alt="Veterinary Profile"
        />
      </figure>
      <div className="card-body flex flex-col items-center justify-center text-center">
        <h2 className="card-title font-bold text-xl mb-2">{name}</h2>
        <p className="mb-4">{des}</p>
        <div className="card-actions justify-center">
        <button onClick={handleProfileClick} className="btn bg-green-500 hover:bg-green-600 text-white">
                View Profile
                </button>

        </div>
      </div>
    </div>
  );
}

export default VetCard;
