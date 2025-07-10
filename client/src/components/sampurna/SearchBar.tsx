// components/sampurna/SearchBar.tsx
import React from "react";

export default function SearchBar() {
  return (
    <div className="w-full flex justify-center mt-32 md:mt-40">
      <input
        type="text"
        placeholder="Search"
        className="w-11/12 sm:w-2/3 md:w-1/2 max-w-md px-4 py-2 rounded-full bg-white bg-opacity-80 text-black shadow-md focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  );
}
