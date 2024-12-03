import React from 'react'
import Image from 'next/image'

import { Asset } from 'contentful'

const Logos = ({
  logos
} : {
  logos: Asset[]
}) => {
  return (
    <div className='max-w-4xl grid md:grid-cols-2 md:gap-16 px-6 lg:px-0 w-full'>
      {
        logos.map((logo) => {
          if (!logo.fields.file) return null

          return (
            <div key={logo.sys.id} className='relative w-full aspect-video'>
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