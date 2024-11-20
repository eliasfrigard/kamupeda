'use client'

import React from 'react'

interface InfoContainerProps {
  items: {
    title: string
    value: string
  }[]
}

function InfoItem({ title, content } : { title: string, content: string }) {
  if (!content) return null
  return (
    <div className="flex flex-col leading-loose opacity-80">
      <h2 className="opacity-30 text-sm font-medium">{title}</h2>
      <p className="font-medium">{content}</p>
    </div>
  );
}

const InfoContainer: React.FC<InfoContainerProps> = ({ items }) => {
  const [infoOpen, setInfoOpen] = React.useState(false)

  if (!infoOpen) {
    return (
      <div className="bg-gray-50 w-full h-10 rounded-md shadow-md gap-4 grid lg:grid-cols-2">
      </div>
    )
  }

  return (
    <div onClick={() => setInfoOpen(!infoOpen)} className="bg-gray-50 w-full pt-8 pb-6 px-8 rounded-md shadow-md gap-4 grid lg:grid-cols-2">
      {
        items.map((item) => {
          if (!item.value) return null
          return (
            <InfoItem key={item.title} title={item.title} content={item.value} />
          )
        })
      }
    </div>
  )
}

export default InfoContainer
