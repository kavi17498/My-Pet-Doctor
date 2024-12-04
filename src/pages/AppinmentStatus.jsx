import React, { useEffect, useState } from 'react';
import { db } from '../firebaseconfig'; // Import Firestore instance
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function AppointmentStatus() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async (userId) => {
      try {
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
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

  const pendingAppointments = appointments.filter((app) => app.status === 'pending');
  const approvedAppointments = appointments.filter((app) => app.status === 'approved');
  const completedAppointments = appointments.filter((app) => app.status === 'completed');

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mt-6">Your Appointments</h1>

      <div className="p-6 mt-6 w-4/5 max-w-md">
        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments found.</p>
        ) : (
          <>
            {/* Pending Appointments */}
            {pendingAppointments.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-yellow-500">Pending</h2>
                {pendingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border p-4 mb-4 rounded shadow-sm">
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Type:</strong> {appointment.appointmentType}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Approved Appointments */}
            {approvedAppointments.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-green-500">Approved</h2>
                {approvedAppointments.map((appointment) => (
                  <div key={appointment.id} className="border p-4 mb-4 rounded shadow-sm">
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Type:</strong> {appointment.appointmentType}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Appointments */}
            {completedAppointments.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-500">Completed</h2>
                {completedAppointments.map((appointment) => (
                  <div key={appointment.id} className="border p-4 mb-4 rounded shadow-sm">
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Type:</strong> {appointment.appointmentType}</p>
                    <p><strong>Status:</strong> {appointment.status}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AppointmentStatus;
