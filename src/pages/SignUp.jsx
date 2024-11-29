import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth function
import { auth } from '../firebaseconfig.js'; // Import the Firebase Auth object from your firebase.js
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize the navigate hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Create a new user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the login page after successful signup
      navigate('/login');
      console.log('User signed up successfully');
    } catch (error) {
      setError(error.message); // Handle any errors from Firebase Auth
    }
  };

  return (
    <div className="flex h-screen">
      {/* Right side: Text */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <div className="text-center w-full max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-green-600">Create Your Account</h1>
          <p className="text-lg text-gray-600 mb-6">Welcome !!!</p>
          <h2 className="text-2xl font-semibold mb-6 text-rose-500">Pet Owner Info</h2>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full border-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Sign Up Button */}
          <button 
            onClick={handleSubmit} 
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Sign Up
          </button>

          {/* Continue with */}
          <div className="mt-6">
            <label className="block text-gray-700 mb-2">Continue with</label>
            <img src="#" alt="Social login" className="mx-auto" />
          </div>

          {/* Sign Up */}
          <p className="mt-4 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 underline">
              Log In
            </a>
          </p>
        </div>
      </div>

      {/* Left side: Image */}
      <div className="flex-1 flex justify-center items-center bg-gray-200">
        <img
          src="https://via.placeholder.com/400"
          alt="Pet"
          className="max-w-full max-h-full"
        />
      </div>
    </div>
  );
}

export default SignUp;
