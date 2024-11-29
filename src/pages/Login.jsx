import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth function
import { auth } from '../firebaseconfig'; // Import the Firebase Auth object from your firebaseconfig
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate for programmatic routing

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign the user in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the home page or dashboard after successful login
      navigate('/'); // Adjust based on your route
      console.log('User logged in successfully');
    } catch (error) {
      setError(error.message); // Handle errors from Firebase
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Right side: Text */}
        <div className="flex-1 flex justify-center items-center bg-white">
          <div className="text-center w-full max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-green-600">Login here</h1>
            <p className="text-lg text-gray-600 mb-6">Welcome back !!!</p>
            <h2 className="text-2xl font-semibold mb-6 text-rose-500">Log In</h2>

            {/* Enter Email */}
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

            {/* Error message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Login Button */}
            <button 
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Login
            </button>

            {/* Continue with */}
            <div className="mt-6">
              <label className="block text-gray-700 mb-2">Continue with</label>
              <img src="#" alt="Social login" className="mx-auto" />
            </div>

            {/* Sign Up */}
            <p className="mt-4 text-gray-600">
              Don't have an account yet?{' '}
              <a href="/signup" className="text-blue-500 underline">
                Sign Up now
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
    </>
  );
}

export default Login;
