import React from 'react';
import slidergirl from '../assets/firstSliderGirl.png';

function Slider() {
  return (
    <div className="flex h-[400px]">
      {/* Left side: Text */}
      <div className="w-3/5 flex items-center justify-center bg-white-100 ">
        <h1 className="text-5xl font-bold text-gray-800 text-left p-40 ">
          Trusted Veterinary <br /> Connections <br /> for Happier, <br /> Healthier Pets!
        </h1>
      </div>

      {/* Right side: Image */}
      <div className="w-2/5 flex items-center justify-center bg-white-300">
        <img
          src={slidergirl}
          alt="Sample"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}

export default Slider;
