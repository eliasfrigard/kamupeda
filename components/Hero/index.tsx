'use client'

import React from 'react'
import HeroImage from './HeroImage'
import HeroImageParallax from './HeroImageParallax'

import type { HeroImageType } from '@/types'

const Hero = ({
  children,
  desktopImg,
  mobileImg,
  overlay = true,
  spaced = false,
  imagePosition = 'center',
} : {
  children?: React.ReactNode
  desktopImg: HeroImageType
  mobileImg: HeroImageType
  overlay?: boolean
  spaced: boolean
  parallaxSpeed?: number
  imagePosition?: string
}) => {
  const overlayElement = () => {
    const overlayClasses = `absolute w-full h-screen bg-primary-950 bg-opacity-20 backdrop-blur`

    if (!overlay) return null

    // Use fragment because AnimateIn requires children.
    return <div className={`absolute w-full h-full ${overlayClasses}`}><></></div>
  }

  // Spaced and default classes.
  const defaultClasses = `h-screen w-full -mt-[85px] flex justify-center items-center shadow-lg overflow-hidden object-${imagePosition}`
  const spacedClasses = `relative w-full aspect-[9/16] md:aspect-video hidden md:block object-${imagePosition}`

  // Desktop and mobile classes.
  const desktopClasses = `relative hidden md:block ${spaced ? spacedClasses : defaultClasses}`
  const mobileClasses = `relative block md:hidden ${spaced ? spacedClasses : defaultClasses}`

  const renderImage = (isMobile: boolean) => {
    if (spaced) {
      return (
        <HeroImage
          imageClasses={`object-${imagePosition}`}
          image={isMobile ? mobileImg : desktopImg}
          isMobile={isMobile}
        />
      )
    } else {
      return (
        <HeroImageParallax
          imageClasses={`object-${imagePosition}`}
          image={isMobile ? mobileImg : desktopImg}
          isMobile={isMobile}
        />
      )
    }
  }

  return (
    <>
      {
        desktopImg.url && (
          <div className={desktopClasses}>
            {renderImage(false)}

            {overlayElement()}

            <div className='z-30 mt-85 centerContent px-4 w-screen h-full'>
              {children}
            </div>
          </div>
        )
      }

      {
        mobileImg.url && (
          <div className={mobileClasses}>
            {renderImage(true)}

            {overlayElement()}

            <div className='z-30 mt-85 centerContent px-4 w-full h-full'>
              {children}
            </div>
          </div>
        )
      }
    </>
  )
}

export default Hero
