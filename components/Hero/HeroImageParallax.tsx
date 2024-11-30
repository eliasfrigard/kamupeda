import React from 'react'
import { useParallax } from "react-scroll-parallax"

const HeroImageParallax = ({
  Image, // Next.js Image component
  image,
  isMobile = false,
  imageClasses,
  parallaxSpeed = -50,
}: {
  Image: any
  image: {
    url: string
    altText: string
    blur?: string
  }
  isMobile?: boolean
  imageClasses?: string
  parallaxSpeed?: number
}) => {
  const parallax = useParallax({ speed: parallaxSpeed })

  return (
    <Image
      ref={parallax.ref}
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
