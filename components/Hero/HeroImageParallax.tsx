'use client'

import React from 'react'
import Image from 'next/image'

const HeroImageParallax = ({
  image,
  isMobile = false,
  imageClasses,
}: {
  image: {
    url: string
    altText: string
    blur?: string
  }
  isMobile?: boolean
  imageClasses?: string
}) => {

  return (
    <Image
      alt={image.altText}
      src={`${image.url}${isMobile ? '?w=800' : '?w=1920'}`}
      fill
      sizes="(min-width: 768px) 80vw, 100vw"
      className={`object-cover ${imageClasses}`}
      placeholder={image?.blur ? 'blur' : 'empty'}
      blurDataURL={image?.blur}
    />
  )
}

export default HeroImageParallax
