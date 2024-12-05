import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getVeterinarianEmail, sendAppointmentEmail } from '../api';
import { db } from '../firebaseconfig';

function MakeAppointmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('online');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const user = getAuth().currentUser;
    if (!user) {
      alert('You need to be logged in to make an appointment!');
      return;
    }

    setLoading(true);

    try {
      const vetEmail = await getVeterinarianEmail(id);
      if (!vetEmail) {
        alert('Failed to fetch veterinarian email');
        setLoading(false);
        return;
      }

      const payload = {
        userEmail: user.email,
        vetEmail,
        date,
        time,
        appointmentType,
      };

      const emailResponse = await sendAppointmentEmail(payload);
      console.log('Email response:', emailResponse);

      await addDoc(collection(db, 'appointments'), {
        vetId: id,
        userId: user.uid,
        date,
        time,
        appointmentType,
        status: 'pending',
        createdAt: new Date(),
      });

      alert('Appointment requested successfully!');
      navigate('/'); // Navigate to home after successful appointment
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Error submitting appointment.');
    }

    setLoading(false);
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
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

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? 'Submitting...' : 'Request Appointment'}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeAppointmentPage;
