import React from 'react';

function VetCard({ name, des }) {
  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl mt-16 m-10">
        <figure>
          <img
            className="rounded-full w-32 h-32 object-cover mx-auto mt-4"
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title text-center">{name}</h2>
          <p>{des}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">View Profile</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VetCard;
