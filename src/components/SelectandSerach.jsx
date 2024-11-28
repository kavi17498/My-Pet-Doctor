import React from 'react'

function SelectandSerach() {
  return (
    <>
        <div className='flex m-10'>
        <div className='w-1/2 flex items-start justify-center'>
            <h2 className='text-pink-700 underline text-3xl'>Select Veterinarians</h2>
        </div>
        <div className='w-1/2 flex items-end justify-center'>
        <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" />
        <button className="btn">Search</button>
        </div>
             
        </div>
    </>
  )
}

export default SelectandSerach