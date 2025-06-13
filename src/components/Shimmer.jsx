import React from "react";

function Shimmer() {
  return (
    <div className="w-60 h-72 bg-white rounded-xl shadow-md p-4 animate-pulse flex flex-col gap-4">
      <div className="bg-gray-300 h-36 w-full rounded-md"></div>
      <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      <div className="bg-gray-300 h-8 w-full rounded-md"></div>
    </div>
  );
}

export default Shimmer;
