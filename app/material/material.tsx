'use client'

import Link from 'next/link'
import React from 'react'
import { GiChiliPepper } from "react-icons/gi"
import { BsMusicNoteList } from "react-icons/bs"

// Chip Component
const Chip = ({ children }) => {
  if (!children) return null

  return (
    <div className="bg-white opacity-80 p-2 text-gray-800 text-xs rounded-full shadow">
      {children}
    </div>
  )
}

const SkeletonCard = () => (
  <div className="bg-white border p-4 shadow-md rounded-md flex flex-col text-black items-center gap-4 animate-pulse">
    <div className="h-6 w-2/3 bg-gray-300 rounded-md"></div>
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-5 w-5 bg-gray-300 rounded-full"></div>
      ))}
    </div>
    <div className="h-[1px] bg-gray-300 w-2/3 rounded-full"></div>
    <div className="flex flex-wrap gap-2 justify-center items-center">
      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
    </div>
  </div>
)

const difficultyToHuman = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return 'Alkeistaso'
    case 2:
      return 'Keskitaso'
    case 3:
      return 'Edistyneet'
    default:
      return undefined
  }
}

const Material = ({ materialWithInfo, loading }) => {
  if (loading) {
    return (
      <div className="container mx-auto grid lg:grid-cols-3 gap-4 lg:gap-8 items-start">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto grid lg:grid-cols-3 gap-6 lg:gap-12 items-start">
      {materialWithInfo.map((m) => (
        <Link
          href={`/material/${m.id}`}
          key={m.id}
          className="bg-gray-100 px-6 py-7 shadow-md rounded-md flex flex-col text-black items-center gap-4 hover:scale-105 duration-300"
        >
          <div className='flex gap-3 justify-center items-center'>
            <BsMusicNoteList className="text-xl" />
            <h3 className="text-xl font-semibold">{m.title}</h3>
          </div>
          {/* <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <GiChiliPepper
                key={index}
                className={index < m.difficulty ? "text-red-500" : "text-gray-300"}
              />
            ))}
          </div> */}
          <div className="h-[1px] bg-black bg-opacity-20 w-2/3 rounded-full" />
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <Chip>{difficultyToHuman(m.difficulty)}</Chip>
            <Chip>{m.instrument}</Chip>
            <Chip>{m.key}</Chip>
            <Chip>{m.mode}</Chip>
            <Chip>{m.style}</Chip>
            <Chip>{m.origin}</Chip>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Material
