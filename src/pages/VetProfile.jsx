import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseconfig'; // Import Firestore instance
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar'; // Ensure Navbar is imported

function VetProfile() {
  const { id } = useParams(); // Get the vet ID from the URL
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVetProfile = async () => {
      try {
        const vetDocRef = doc(db, 'veterinarians', id);
        const vetDoc = await getDoc(vetDocRef);
        if (vetDoc.exists()) {
          const vetData = vetDoc.data();
          const profileCollection = collection(db, `veterinarians/${id}/profile`);
          const profileDocs = await getDocs(profileCollection);
          const profileData = profileDocs.docs.map((doc) => doc.data().profilePhotoUrl);

          vetData.profilePhotoUrl = profileData.length > 0 ? profileData[0] : null;
          setVet(vetData);

          // Fetch images for the veterinarian from the sub-collection
          const imagesCollection = collection(db, `veterinarians/${id}/images`); // Use `id` here instead of `vet.id`
          const imageDocs = await getDocs(imagesCollection);

          const imageUrls = imageDocs.docs.map((imgDoc) => imgDoc.data().imageUrls);
          vetData.images = imageUrls.flat(); // Flatten in case of nested arrays

          vetData.address = vetData.address || 'No address provided'; // Fallback if no address
          vetData.qualifications = vetData.qualifications || 'No qualifications provided';

          setVet(vetData);
        } else {
          console.log("No such veterinarian!");
        }
      } catch (error) {
        console.error("Error fetching veterinarian details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVetProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!vet) {
    return <div>Veterinarian not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mt-6">Veterinary Profile</h1>

        <div className="flex flex-row items-start justify-center p-6 mt-6 w-4/5">
          {/* Left Section: Profile Information */}
          <div className="flex-1 pr-4 border-r border-gray-200">
            {/* Profile Photo */}
            <img
              src={vet.profilePhotoUrl || "#"}
              alt="Vet's Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300 mx-auto"
            />

            <div className="mt-6">
              {/* Name Row */}
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Veterinary Name</label>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800 mr-4">{vet.name}</p>
                </div>
              </div>

              {/* Email Row */}
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800 mr-4">{vet.email}</p>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Book Veterinarian
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 pl-4">
            {/* Qualifications Section */}
            <h1 className="text-pink-500 text-3xl font-bold">Qualifications</h1>
            <h2 className="text-center text-xl font-semibold mt-4">Education And Experience</h2>
            <div className="border border-black p-4 mt-4">
              <p>{vet.qualifications}</p>
            </div>

            {/* Address Section */}
            <h2 className="text-xl font-semibold mt-6">Address</h2>
            <ul className="mt-2 list-disc list-inside">
              <li>{vet.address}</li>
            </ul>

            {/* Gallery Section */}
            <h2 className="text-xl font-semibold mt-6">Gallery</h2>
            <div className="flex mt-4 space-x-4">
              {vet.images &&
                vet.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Veterinarian ${vet.name} Image ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VetProfile;
