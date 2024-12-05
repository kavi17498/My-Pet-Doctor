// src/api.js
import { db } from './firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Fetch veterinarian email by veterinarian ID.
 * @param {string} vetId - Veterinarian ID.
 * @returns {Promise<string | null>} - Veterinarian email or null if not found.
 */
export const getVeterinarianEmail = async (vetId) => {
  try {
    const vetRef = doc(db, 'veterinarians', vetId);
    const vetDoc = await getDoc(vetRef);

    if (vetDoc.exists()) {
      return vetDoc.data().email;
    } else {
      console.error('No such veterinarian!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching veterinarian email:', error);
    return null;
  }
};

/**
 * Send appointment email.
 * @param {Object} payload - Email payload containing userEmail, vetEmail, date, time, and appointmentType.
 * @returns {Promise<Object>} - Response from the email server.
 */
export const sendAppointmentEmail = async (payload) => {
  try {
    const response = await fetch('http://localhost:3001/send-appointment-emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return response.json();
  } catch (error) {
    console.error('Error sending appointment email:', error);
    throw error;
  }
};
