import React from 'react';

function SelectandSearch() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between m-10 space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Title Section */}
      <div className="lg:w-1/2 flex items-center justify-center">
        <h2 className="text-rose-500 underline text-3xl font-bold">
          Select Veterinarians
        </h2>
      </div>

      {/* Search Section */}
      <div className="lg:w-1/2 flex items-center justify-center space-x-3">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out">
          Search
        </button>
      </div>
    </div>
  );
}

export default SelectandSearch;
