import React from 'react'

const HeroImage = ({
  Image, // Next.js Image component
  image,
  isMobile = false,
  imageClasses
}: {
  Image: any
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
      className={`object-cover rounded-md shadow-md filter ${imageClasses}`}
      placeholder={image?.blur ? 'blur' : 'empty'}
      blurDataURL={image?.blur}
    />
  )
}

export default HeroImage
