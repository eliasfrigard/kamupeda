'use client'

import React from 'react'
import AnimateIn from '../AnimateIn'
import HeroImage from './HeroImage'
import HeroImageParallax from './HeroImageParallax'

const Hero = ({
  Image,
  children,
  desktopImg,
  mobileImg,
  overlay = true,
  spaced = false,
  fallback = false,
  parallaxSpeed,
  imagePosition = 'center',
  overlayClasses,
} : {
  Image: any
  children?: React.ReactNode
  desktopImg: {
    url: string
    altText: string
    blur?: string
  }
  mobileImg: {
    url: string
    altText: string
    blur?: string
  }
  overlay?: boolean
  spaced: boolean
  fallback?: boolean
  parallaxSpeed?: number
  imagePosition?: string
  overlayClasses?: string
}) => {
  const overlayElement = () => {
    const overlayClasses = `absolute w-full h-screen bg-primary-950 bg-opacity-20 backdrop-blur`

    if (!overlay) return null

    // Use fragment because AnimateIn requires children.
    return <AnimateIn delay={1000} className={`absolute w-full h-full ${overlayClasses}`}><></></AnimateIn>
  }

  // Spaced and default classes.
  const defaultClasses = `h-screen w-full -mt-[85px] flex justify-center items-center shadow-lg overflow-hidden object-${imagePosition}`
  const spacedClasses = `relative w-full aspect-[9/16] md:aspect-video object-${imagePosition}`

  // Desktop and mobile classes.
  const desktopClasses = `relative ${spaced ? spacedClasses : defaultClasses} ${fallback && !mobileImg?.url ? 'block' : 'hidden md:block'}`
  const mobileClasses = `relative ${spaced ? spacedClasses : defaultClasses} ${fallback && !mobileImg?.url ? 'hidden' : 'block md:hidden'}`

  const renderImage = (isMobile: boolean) => {
    if (spaced) {
      return (
        <HeroImage
          imageClasses={`object-${imagePosition}`}
          Image={Image}
          image={isMobile ? mobileImg : desktopImg}
          isMobile={isMobile}
        />
      )
    } else {
      return (
        <HeroImageParallax
          imageClasses={`object-${imagePosition}`}
          Image={Image}
          image={isMobile ? mobileImg : desktopImg}
          isMobile={isMobile}
          parallaxSpeed={parallaxSpeed}
        />
      )
    }
  }

  return (
    <>
      {
        desktopImg.url && (
          <AnimateIn className={desktopClasses}>
            {renderImage(false)}

            {overlayElement()}

            <div className='z-30 mt-85 centerContent px-4 w-full h-full'>
              {children}
            </div>
          </AnimateIn>
        )
      }

      {
        mobileImg.url && (
          <AnimateIn className={mobileClasses}>
            {renderImage(true)}

            {overlayElement()}

            <div className='z-30 mt-85 centerContent px-4 w-full h-full'>
              {children}
            </div>
          </AnimateIn>
        )
      }
    </>
  )
}

export default Hero
