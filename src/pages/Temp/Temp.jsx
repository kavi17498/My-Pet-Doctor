import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseconfig.js'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions

function Temp() {
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVeterinarians = async () => {
      try {
        // Fetch veterinarian data
        const vetsCollection = collection(db, 'veterinarians');
        const vetDocs = await getDocs(vetsCollection);
        const vetsData = [];

        for (const vetDoc of vetDocs.docs) {
          const vet = { id: vetDoc.id, ...vetDoc.data() };

          // Fetch profile picture from sub-collection
          const profileCollection = collection(db, `veterinarians/${vet.id}/profile`);
          const profileDocs = await getDocs(profileCollection);
          const profileData = profileDocs.docs.map((doc) => doc.data().profilePhotoUrl);

          vet.profilePhotoUrl = profileData.length > 0 ? profileData[0] : null;

          // Fetch images for the veterinarian from sub-collection
          const imagesCollection = collection(db, `veterinarians/${vet.id}/images`);
          const imageDocs = await getDocs(imagesCollection);

          const imageUrls = imageDocs.docs.map((imgDoc) => imgDoc.data().imageUrls);
          vet.images = imageUrls.flat(); // Flatten in case of nested arrays

          // Add address and qualifications to the vet object
          vet.address = vet.address || 'No address provided'; // Fallback if no address
          vet.qualifications = vet.qualifications || 'No qualifications provided'; // Fallback if no qualifications

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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Veterinarians</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {veterinarians.map((vet) => (
          <div
            key={vet.id}
            className="bg-white p-4 rounded shadow-md border border-gray-300"
          >
            <h2 className="text-xl font-bold text-green-600 mb-2">{vet.name}</h2>
            <p className="text-gray-700">Email: {vet.email}</p>
            <p className="text-gray-700">Phone: {vet.phoneNumber}</p>
            <p className="text-gray-700">Address: {vet.address}</p> {/* Display address */}
            <p className="text-gray-700">Qualifications: {vet.qualifications}</p> {/* Display qualifications */}

            {/* Profile Picture */}
            <div className="mt-4 mb-4">
              {vet.profilePhotoUrl ? (
                <img
                  src={vet.profilePhotoUrl}
                  alt={`Profile picture of ${vet.name}`}
                  className="w-24 h-24 object-cover rounded-full border-2 border-green-600"
                />
              ) : (
                <p className="text-gray-500">No profile picture</p>
              )}
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
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
        ))}
      </div>
    </div>
  );
}

export default Temp;
