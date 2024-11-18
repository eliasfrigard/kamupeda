'use client'

import React from 'react';
import { GiChiliPepper } from "react-icons/gi";

// Chip Component
const Chip = ({ children }) => {
  if (!children) return null;

  return (
    <div className="bg-blue-300 p-2 text-gray-800 text-xs rounded-full shadow">
      {children}
    </div>
  );
};

// Skeleton Loader for Material Card
const SkeletonCard = () => (
  <div className="bg-white border p-4 shadow-md rounded-md flex flex-col text-black items-center gap-4 animate-pulse">
    {/* Skeleton Title */}
    <div className="h-6 w-2/3 bg-gray-300 rounded-md"></div>
    {/* Skeleton Chili Pepper Rating */}
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-5 w-5 bg-gray-300 rounded-full"></div>
      ))}
    </div>
    {/* Skeleton Divider Line */}
    <div className="h-[1px] bg-gray-300 w-2/3 rounded-full"></div>
    {/* Skeleton Chips */}
    <div className="flex flex-wrap gap-2 justify-center items-center">
      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
    </div>
  </div>
);

const Material = ({ materialWithInfo, loading }) => {
  if (loading) {
    return (
      <div className="container mx-auto grid lg:grid-cols-3 gap-4 lg:gap-8 items-start">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto grid lg:grid-cols-3 gap-4 lg:gap-8 items-start">
      {materialWithInfo.map((m) => (
        <div
          key={m.id}
          className="bg-white border p-4 shadow-md rounded-md flex flex-col text-black items-center gap-4"
        >
          <h3 className="text-lg font-semibold">{m.title}</h3>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <GiChiliPepper
                key={index}
                className={index < m.difficulty ? "text-red-500" : "text-gray-300"}
              />
            ))}
          </div>
          <div className="h-[1px] bg-black bg-opacity-20 w-2/3 rounded-full" />
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <Chip>{m.instrument}</Chip>
            <Chip>{m.key} ({m.mode})</Chip>
            <Chip>{m.style}</Chip>
            <Chip>{m.origin}</Chip>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Material;
