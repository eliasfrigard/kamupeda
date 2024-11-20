'use client'

import Link from 'next/link'
import React from 'react'
import type { ReactNode } from 'react'
import { BsMusicNoteList } from "react-icons/bs"
import type { Material, MaterialSkeleton } from '@/types'
import type { Entry } from 'contentful'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const SkeletonToMaterial = (skeleton: any) => {
  const m: Material = {
    title: skeleton.fields.title,
    files: [],
    key: skeleton.fields.key,
    mode: skeleton.fields.mode,
    instrument: skeleton.fields.instrument,
    difficulty: skeleton.fields.difficulty,
    style: skeleton.fields.style,
    forEnsemble: false,
    origin: skeleton.fields.origin,
  }

  return m
}

// Chip Component
const Chip = ({ children } : { children: ReactNode }) => {
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

const Material = ({ 
  materialWithInfo, 
  loading 
} : {
  materialWithInfo: Entry<MaterialSkeleton>[],
  loading: boolean
}) => {
  if (loading) {
    return (
      <div className="container mx-auto grid lg:grid-cols-3 gap-4 lg:gap-4 items-start">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto grid lg:grid-cols-3 gap-6 items-start">
      {materialWithInfo.map((m) => {
        const material = SkeletonToMaterial(m)

        return (
          <Link
            key={m.sys.id}
            href={`/material/${m.sys.id}`}
            className="bg-gray-100 px-6 py-7 shadow-md rounded-md flex flex-col text-black items-center gap-4 hover:scale-105 duration-300"
          >
            <div className='flex gap-3 justify-center items-center'>
              <BsMusicNoteList className="text-xl" />
              <h3 className="text-xl font-semibold">{material.title}</h3>
            </div>
            <div className="h-[1px] bg-black bg-opacity-20 w-2/3 rounded-full" />
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <Chip>{difficultyToHuman(material.difficulty)}</Chip>
              <Chip>{material.instrument}</Chip>
              <Chip>{material.key}</Chip>
              <Chip>{material.mode}</Chip>
              <Chip>{material.style}</Chip>
              <Chip>{material.origin}</Chip>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Material
