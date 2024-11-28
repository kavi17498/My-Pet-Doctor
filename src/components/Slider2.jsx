import React from 'react'
import vet1 from '../assets/vet 1.png'

function Slider2() {
  return (
    <>
        <div className="flex h-[400px]">
         {/* Left side: Image */}
      <div className="w-2/5 flex items-center justify-center bg-white-300">
        <img
          src={vet1}
          alt="Sample"
          className="max-w-full h-auto"
        />
      </div>
      {/* Right side: Text */}
      <div className="w-3/5 flex items-center justify-center bg-white-100 ">
        <h1 className="text-5xl font-bold text-gray-800 text-left p-40 ">
          Your Pet's Health, Our <br /> Priority - Bridging the <br /> Gap Between You and <br /> Expert Vets.
        </h1>
      </div>

     
    </div>
    </>
  )
}

export default Slider2