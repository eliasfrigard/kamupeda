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
  isFirstElement: boolean
}

const ImageHero: React.FC<ImageHeroProps> = ({ desktopImg, isFirstElement }) => {
  if (isFirstElement) {
    return (
      <>
        {/* Container for the header and image */}
        {/* The image will be absolutely positioned */}
        <div className={`w-full absolute top-0 left-0 h-screen`}>
          <Image
            src={desktopImg.url}
            alt={desktopImg.altText}
            fill
            className={`object-cover`}
          />
        </div>
        <div className="relative h-screen w-full" />
      </>
    )
  }

  return (
    <div className={`w-screen relative aspect-video`}>
      <Image
        src={desktopImg.url} 
        alt={desktopImg.altText}
        fill
        className={`object-cover w-full`}
      />
    </div>
  )
}

export default ImageHero
