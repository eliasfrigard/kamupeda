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
  offset: number
}

const ImageHero: React.FC<ImageHeroProps> = ({ desktopImg, isFirstElement }) => {
  if (isFirstElement) {
    return (
      <>
        <div 
          className="relative w-screen h-[calc(100vh-84px)] -mt-[32px] lg:-mt-[48px] aspect-video"
          >
          <Image
            src={desktopImg.url} 
            alt={desktopImg.altText}
            fill
            className="absolute object-cover w-full h-full"
          />
        </div>
      </>
    );
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
