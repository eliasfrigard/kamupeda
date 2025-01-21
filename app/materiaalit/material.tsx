'use client'

import Link from 'next/link'
import React from 'react'
import { BsFillPeopleFill } from "react-icons/bs"
import { GiViolin } from "react-icons/gi";
import Chip from '@/components/Chip'

import type { Material, MaterialSkeleton } from '@/types'
import type { Entry } from 'contentful'

import OpenSheetMusicDisplay from '../../lib/OpenSheetMusicDisplay'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SkeletonToMaterial = (skeleton: any) => {
  const m: Material = {
    title: skeleton.fields.title,
    files: skeleton.fields.files.map((file) => ({
      url: file.fields.file.url,
      contentType: file.fields.file.contentType,
      filename: file.fields.file.fileName,
    })),
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

// const DetailRow = ({ label, value }) => (
//   <div className="flex gap-1 flex-col text-center">
//     <p className="text-primary-200/50 font-medium text-xs italic">{label}</p>
//     <p className="font-bold text-sm">{value}</p>
//   </div>
// )

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
            className="relative group bg-gradient-to-br from-primary-600 to-primary-700 focus:outline-accent-500 active:scale-95 py-7 shadow-lg rounded-lg flex flex-col text-white items-center gap-5 hover:scale-[1.05] transition-transform duration-150 overflow-hidden px-4"
            >
            <div className='w-full h-full top-0 absolute group-hover:bg-black/20 duration-300' />

            <div className='flex gap-2 justify-center items-center z-10'>
              {
                material.ensemble ? (
                  <BsFillPeopleFill className="text-2xl text-primary-100" />
                ) : (
                  <GiViolin className="text-3xl text-primary-100" />
                )
              }
              <h3 className="text-xl font-semibold text-center -mb-1">{material.title}</h3>
            </div>

            <div className="h-[1px] bg-primary-50 bg-opacity-20 w-2/3 rounded-full mb-1 z-10" />

            <div className="flex flex-wrap gap-3 justify-center items-center z-10">
              <Chip>{difficultyToHuman(material.difficulty)}</Chip>
              <Chip>{material.instrument}</Chip>
              <Chip>
                {material.key && material.mode
                  ? `${material.key}-${material.mode}`
                  : material.key || material.mode || ""}
              </Chip>
              <Chip>{material.style}</Chip>
              <Chip>{material.origin}</Chip>
              <Chip>{material.ensemble}</Chip>
            </div>

            {
              (() => {
                const file = material.files.find(file => file.filename.includes(".mxl") || file.contentType === 'application/xml')
                return file ? (
                  <div className="w-full mx-auto text-white -my-10">
                    <OpenSheetMusicDisplay
                    drawTitle={false}
                    drawSubtitle={false}
                    drawPartNames={false}
                    drawPartAbbreviations={false}
                    defaultColorMusic="#FFFFFF"
                    drawCredits={false}
                    drawComposer={false}
                    drawLyricist={false}
                    drawMetronomeMarks={false}
                    drawMeasureNumbers={false}
                    drawMeasureNumbersOnlyAtSystemStart={false}
                    drawTimeSignatures={false}
                    drawUpToMeasureNumber={1}
                    file={file.url}
                  />
                  </div>
                ) : null;
              })()
            }
          </Link>
        )
      })}
    </div>
  )
}

export default Material
