import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseconfig'; // Import Firestore instance
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function AppointmentStatus() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async (userId) => {
      try {
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);

        const appointmentsData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const appointmentData = { ...docSnapshot.data(), id: docSnapshot.id };

            // Fetch veterinarian details
            if (appointmentData.vetId) {
              const vetDocRef = doc(db, 'veterinarians', appointmentData.vetId);
              const vetDoc = await getDoc(vetDocRef);
              if (vetDoc.exists()) {
                const vetData = vetDoc.data();
                appointmentData.vetName = vetData.name || 'Unknown';
                appointmentData.vetPhoneNumber = vetData.phoneNumber || 'N/A';
              }
            }

            return appointmentData;
          })
        );

        setAppointments(appointmentsData);
      } catch (err) {
        setError('Failed to fetch appointments. Please try again later.');
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchAppointments(user.uid);
      } else {
        setAppointments([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold">Loading your appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold text-center mb-6">Your Appointments</h1>

        {appointments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No appointments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="border-b border-gray-200 md:table-row block md:table-row">
                  <th className="text-left p-4 font-medium text-gray-500 uppercase block md:table-cell">
                    Date
                  </th>
                  <th className="text-left p-4 font-medium text-gray-500 uppercase block md:table-cell">
                    Time
                  </th>
                  <th className="text-left p-4 font-medium text-gray-500 uppercase block md:table-cell">
                    Type
                  </th>
                  <th className="text-left p-4 font-medium text-gray-500 uppercase block md:table-cell">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium text-gray-500 uppercase block md:table-cell">
                    Message
                  </th>
                  <th className="text-left p-4 font-medium text-gray-500 uppercase block md:table-cell">
                    Meeting Link
                  </th>
                  <th className="text-left p-4 font-medium text-gray-500 uppercase block md:table-cell">
                    Veterinarian
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-gray-200 md:table-row block md:table-row"
                  >
                    <td className="p-4 text-gray-700 block md:table-cell">
                      {appointment.date || 'N/A'}
                    </td>
                    <td className="p-4 text-gray-700 block md:table-cell">
                      {appointment.time || 'N/A'}
                    </td>
                    <td className="p-4 text-gray-700 block md:table-cell">
                      {appointment.appointmentType || 'N/A'}
                    </td>
                    <td className="p-4 text-gray-700 block md:table-cell">
                      {appointment.status || 'Unknown'}
                    </td>
                    <td className="p-4 text-gray-700 block md:table-cell">
                      {appointment.message || 'N/A'}
                    </td>
                    <td className="p-4 text-gray-700 block md:table-cell">
                      {appointment.meetingLink ? (
                        <a
                          href={appointment.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Join Meeting
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="p-4 text-gray-700 block md:table-cell">
                      {appointment.vetName || 'Unknown'} <br />
                      {appointment.vetPhoneNumber || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentStatus;
