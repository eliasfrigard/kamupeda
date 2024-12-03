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
    ensemble: skeleton.fields.ensemble,
    origin: skeleton.fields.origin,
  }
  return m
}

// Chip Component
const Chip = ({ children } : { children: ReactNode }) => {
  if (!children) return null

  return (
    <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-2 text-primary-800 text-xs rounded-full shadow font-medium tracking-wide">
      {children}
    </div>
  )
}

// Skeleton Card
const SkeletonCard = () => (
  <div className="bg-white border p-4 shadow-md rounded-lg flex flex-col text-black items-center gap-4 animate-pulse">
    <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-md"></div>
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-full"></div>
      ))}
    </div>
    <div className="h-[1px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 w-2/3 rounded-full"></div>
    <div className="flex flex-wrap gap-2 justify-center items-center">
      <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-md"></div>
      <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-md"></div>
      <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-md"></div>
      <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-md"></div>
    </div>
  </div>
)

// Difficulty Conversion
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
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start px-4 py-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto grid lg:grid-cols-3 gap-6 items-stretch">
      {materialWithInfo.map((m) => {
        const material = SkeletonToMaterial(m)

        return (
          <Link
            key={m.sys.id}
            href={`/materiaalit/${m.sys.id}`}
            className="relative group bg-gradient-to-br from-primary-500 to-primary-700 focus:outline-accent-500 active:scale-95 px-6 py-7 shadow-lg rounded-lg flex flex-col text-white items-center gap-5 hover:scale-[1.03] transition-transform duration-300 overflow-hidden"
            >
            <div className='w-full h-full top-0 absolute group-hover:bg-black/20 duration-300' />
            <div className='flex gap-3 justify-center items-center z-10'>
              <BsMusicNoteList className="text-2xl text-primary-100" />
              <h3 className="text-xl font-semibold text-center">{material.title}</h3>
            </div>
            <div className="h-[1px] bg-primary-50 bg-opacity-20 w-2/3 rounded-full mb-1 z-10" />
            <div className="flex flex-wrap gap-3 justify-center items-center px-4 z-10">
              <Chip>{difficultyToHuman(material.difficulty)}</Chip>
              <Chip>{material.instrument}</Chip>
              <Chip>{material.key}</Chip>
              <Chip>{material.mode}</Chip>
              <Chip>{material.style}</Chip>
              <Chip>{material.origin}</Chip>
              <Chip>{material.ensemble}</Chip>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Material
