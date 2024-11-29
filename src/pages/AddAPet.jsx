import React from 'react';
import addpet from "../assets/addapet.png";

function AddAPet() {
  return (
    <div className="flex h-screen">
    {/* Right side: Text */}
    <div className="flex-1 flex justify-center items-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Add a Pet</h1>
        <p className="text-lg text-gray-600">
          Fill in the details to add your pet to our system.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Pet Info</h2>
  
        {/* Flex container for text and list */}
        <div className="flex items-center mt-4 gap-4">
          <p className="text-bold">Select your pet Species:</p>
          <ul className="menu lg:menu-horizontal bg-base-200 rounded-box text-sm p-2">
            <li>
              <details className="text-sm" close>
                <summary className="cursor-pointer">Parent item</summary>
                <ul className="bg-base-100 text-sm rounded-lg p-1">
                  <li><a className="p-1 hover:bg-gray-200 rounded">Submenu 1</a></li>
                  <li><a className="p-1 hover:bg-gray-200 rounded">Submenu 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

      {/* Flex container for text and list */}
      <div className="flex items-center mt-4 gap-4">
          <p className="text-bold">Select your Pet Birth Year:</p>
          <ul className="menu lg:menu-horizontal bg-base-200 rounded-box text-sm p-2">
            <li>
              <details className="text-sm" close>
                <summary className="cursor-pointer">Parent item</summary>
                <ul className="bg-base-100 text-sm rounded-lg p-1">
                  <li><a className="p-1 hover:bg-gray-200 rounded">Submenu 1</a></li>
                  <li><a className="p-1 hover:bg-gray-200 rounded">Submenu 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <p className='mt-5'>Enter Pet Name(Optional)</p>
        <input
              className="border border-cyan-500 w-full p-2 rounded-md mt-5"
              placeholder="Enter Pet Name"
            />
        <br />
        <p className='mt-5'>About Your Pet(optional)</p>
        <textarea
            className="border border-cyan-500 w-full p-3 rounded-md mt-5"
            placeholder="Your Message"
            rows="6"
          ></textarea>

          <br />

          <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600">
              Save And Continue
            </button>

          


      </div>
    </div>
  
    {/* Left side: Image */}
    <div className="flex-1 flex justify-center items-center bg-gray-200">
      <img
        src={addpet}
        alt="Pet"
        className="max-w-full max-h-full"
      />
    </div>
  </div>
  
  );
}

export default AddAPet;
