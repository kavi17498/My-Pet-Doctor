import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication

function VetCard({ name, des, id, propic }) {
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  const handleProfileClick = () => {
    const currentUser = auth.currentUser; // Check if the user is authenticated
    if (currentUser) {
      navigate(`/profile/${id}`);
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  };

  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl mt-16 m-10">
        <figure>
          <img
            className="rounded-full w-32 h-32 object-cover mx-auto mt-4"
            src={propic}
            alt="Veterinary Profile"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title text-center">{name}</h2>
          <p>{des}</p>
          <div className="card-actions justify-center">
            <button onClick={handleProfileClick} className="btn btn-primary">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VetCard;
