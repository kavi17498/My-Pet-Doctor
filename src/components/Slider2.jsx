import React from 'react';
import vet1 from '../assets/vet 1.png';

function Slider2() {
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-[400px]">
      {/* Left side: Image */}
      <div className="w-full md:w-2/5 flex items-center justify-center bg-gray-100 p-4">
        <img src={vet1} alt="Sample" className="max-w-full h-auto" />
      </div>
      {/* Right side: Text */}
      <div className="w-full md:w-3/5 flex items-center justify-center bg-gray-50 p-6">
        <p className="text-base sm:text-sm md:text-sm lg:text-5xl font-bold text-gray-800 text-center md:text-left p-4 leading-snug sm:leading-normal">
          Your Pet's Health, Our <br /> Priority - Bridging the <br /> Gap Between You and <br /> Expert Vets.
        </p>
      </div>
    </div>
  );
}

export default Slider2;
