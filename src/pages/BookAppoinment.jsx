import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseconfig'; // Import Firestore instance
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function MakeAppointmentPage() {
  const { id } = useParams(); // Get the vet ID from the URL
  const navigate = useNavigate();
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('online');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const user = getAuth().currentUser;  // Get the authenticated user's ID
    if (!user) {
      alert('You need to be logged in to make an appointment!');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'appointments'), {
        vetId: id,        // Veterinarian's ID
        userId: user.uid, // Authenticated user's ID
        date,
        time,
        appointmentType,
        status: 'pending', // Default status
        createdAt: new Date(),
      });
      alert('Appointment requested successfully!');
      navigate(`/vet-profile/${id}`); // Navigate back to vet profile
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Error submitting appointment.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mt-6">Make an Appointment</h1>
      <div className="p-6 mt-6 w-4/5 max-w-md">
        <div className="flex flex-col space-y-4">
          <label className="text-sm font-medium text-gray-600">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
            required
          />
          
          <label className="text-sm font-medium text-gray-600">Select Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded"
            required
          />
          
          <label className="text-sm font-medium text-gray-600">Appointment Type</label>
          <select
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="online">Online</option>
            <option value="physical">Physical</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Request Appointment'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeAppointmentPage;
