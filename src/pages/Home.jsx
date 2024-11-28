import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import VetCard from '../components/VetCard'
import vets from '../assets/data.json'
import SelectandSerach from '../components/SelectandSerach'
import NearbyYou from '../components/NearbyYou'
import Slider2 from '../components/Slider2'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
       
        <Navbar />
        <hr className="border-t-2 border-gray-300 my-4"  />
        <Slider />
        <hr className="border-t-2 border-gray-300 my-4" />
        <SelectandSerach />
        <div className="flex flex-row justify-center align-middle gap-5 mt-10">
            { vets.map((vet)=>(<VetCard key={vet.id} name={vet.name} des={vet.about}  />)) }
        </div>

        <div className="flex justify-center items-center">
        <a className="text-pink-500 text-2xl">See more..</a>
        </div>

        <hr className="border-t-2 border-gray-300 my-4" />
        <Slider2 />
        <NearbyYou />
        <div className="flex flex-row justify-center align-middle gap-5 mt-10">
            { vets.map((vet)=>(<VetCard key={vet.id} name={vet.name} des={vet.about}  />)) }
        </div>
        <div className="flex justify-center items-center">
        <a className="text-pink-500 text-2xl">See more..</a>
        </div>
        <Footer />


       
    </>
  )
}

export default Home