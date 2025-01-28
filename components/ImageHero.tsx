import Image from "next/image";
import React from "react";
import { dancingScript } from "@/app/fonts";
import AnimateIn from "./AnimateIn";

interface ImageHeroProps {
  desktopImg: {
    url: string;
    altText: string;
    blur?: string;
  };
  mobileImg?: {
    url: string;
    altText: string;
    blur?: string;
  };
  isFirstElement: boolean;
  offset: number;
  text: string;
}

const ImageHero: React.FC<ImageHeroProps> = ({
  desktopImg,
  isFirstElement,
  text,
}) => {
  if (isFirstElement) {
    return (
      <>
        <div className='relative w-screen h-[calc(100vh-84px)] -mt-[32px] lg:-mt-[48px] aspect-video flex justify-center items-center'>
          <Image
            src={desktopImg.url}
            alt={desktopImg.altText}
            fill
            className='absolute object-cover w-full h-full'
          />

          <AnimateIn className='absolute w-full h-full bg-gradient-to-br from-black/20 to-black/20 backdrop-blur'>
            <div
              className={`w-full h-full flex justify-center items-center z-10 text-8xl text-white font-bold tracking-wide shadow-lg ${dancingScript.className}`}
            >
              {text}
            </div>
          </AnimateIn>
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
  );
};

export default ImageHero;
