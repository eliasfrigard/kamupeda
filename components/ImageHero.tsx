import Image from "next/image"
import React from "react"

interface ImageHeroProps {
  desktopImg: {
    url: string
    altText: string
    blur?: string
  }
  mobileImg?: {
    url: string
    altText: string
    blur?: string
  }
}

const ImageHero: React.FC<ImageHeroProps> = ({ desktopImg }) => {
  return (
    <div className="w-screen h-24 relative">
      <Image
        src={desktopImg.url} 
        alt={desktopImg.altText}
        fill
        className={`object-cover`}
      />
    </div>
  )
}

export default ImageHero
