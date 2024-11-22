import React from 'react'
import getYoutubeID from 'get-youtube-id'
// import AnimateIn from './AnimateIn'

const Video = ({ 
  title, 
  link, 
  prominent = false, 
  className 
} : {
  title: string
  link: string
  prominent?: boolean
  className?: string
}) => {
  return (
    <div className={`w-full centerContent flex-col ${className}`}>
      <iframe
        title={title}
        src={`https://www.youtube.com/embed/${getYoutubeID(link)}`}
        {...(prominent ? { itemProp: 'video' } : null)}
        className='video roundedShadow'
        allowFullScreen
        loading='lazy'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      ></iframe>
    </div>
  )
}

export default Video
