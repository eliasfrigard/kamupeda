import React from 'react'
import Image from 'next/image'

import { Asset } from 'contentful'

const Logos = ({
  logos
} : {
  logos: Asset[]
}) => {
  console.log(logos)
  return (
    <div className='max-w-4xl grid grid-cols-3 gap-3 px-6 lg:px-4 w-full bg-primary-800 p-8 rounded-xl shadow-xl'>
      {
        logos.map((logo, i) => {
          if (!logo.fields.file) return null

          return (
            <div className='relative h-full aspect-video'>
              <Image
                key={logo.sys.id}
                src={`https:${logo.fields.file.url}`}
                alt="hello"
                fill
                className={`object-contain rounded-lg`}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default Logos