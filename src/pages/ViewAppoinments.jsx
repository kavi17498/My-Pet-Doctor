import React, { useEffect, useState } from "react";
import { db } from "../firebaseconfig";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";

function VetAppointments() {
  const [vetId, setVetId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email?.endsWith("@petdoc.lk")) {
        console.log(`User email: ${user.email}`);
        setAuthorized(true);
      } else {
        console.warn("Unauthorized access or user not logged in");
        setAuthorized(false);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  const fetchAppointments = async () => {
    if (!vetId.trim()) {
      alert("Please enter a veterinarian ID.");
      return;
    }

    setLoading(true);
    try {
      const q = query(collection(db, "appointments"), where("vetId", "==", vetId));
      const querySnapshot = await getDocs(q);

      const appointmentsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments. Please try again.");
    }
    setLoading(false);
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    const appointmentRef = doc(db, "appointments", appointmentId);

    try {
      await updateDoc(appointmentRef, {
        status: newStatus,
        message: message.trim(),
        meetingLink: meetingLink.trim(),
      });

      // Update local state after successful Firestore update
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === appointmentId
            ? { ...app, status: newStatus, message: message.trim(), meetingLink: meetingLink.trim() }
            : app
        )
      );
      setMessage("");
      setMeetingLink("");
      alert("Appointment updated successfully!");
    } catch (error) {
      console.error("Error updating appointment: ", error);
      alert("Failed to update appointment.");
    }
  };

  if (!authorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-red-500">
          Unauthorized access. Only users with emails ending in <strong>@petdoc.lk</strong> can access this page.
        </p>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mt-6">Veterinarian Appointment Management</h1>

      {/* Input for Veterinarian ID */}
      <div className="mt-6 w-4/5 max-w-md">
        <input
          className="w-full p-2 border rounded mb-4"
          type="text"
          placeholder="Enter Veterinarian ID"
          value={vetId}
          onChange={(e) => setVetId(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={fetchAppointments}
        >
          {loading ? "Loading..." : "Find Appointments"}
        </button>
      </div>

      {/* Appointment List */}
      <div className="p-6 mt-6 w-4/5 max-w-lg">
        {appointments.length === 0 ? (
          loading ? (
            <p>Loading appointments...</p>
          ) : (
            <p>No appointments found for this veterinarian ID.</p>
          )
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="border p-4 mb-4 rounded shadow-sm bg-white">
              <p><strong>Owner:</strong> {appointment.ownerName}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Type:</strong> {appointment.appointmentType}</p>
              <p><strong>Status:</strong> {appointment.status}</p>

              <textarea
                className="w-full p-2 mt-2 border rounded"
                placeholder="Enter a message for the pet owner"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              {appointment.appointmentType === "online" && (
                <input
                  className="w-full p-2 mt-2 border rounded"
                  type="url"
                  placeholder="Enter a meeting link"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                />
              )}

              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => updateAppointmentStatus(appointment.id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => updateAppointmentStatus(appointment.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
}

export default VetAppointments;
