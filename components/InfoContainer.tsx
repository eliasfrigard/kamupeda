'use client'

import React from 'react'
import Disclosure from './Disclosure'

interface InfoContainerProps {
  items: {
    title: string
    value: string
  }[]
}

const InfoItem = ({ title, content }: { title: string, content: string }) => (
  content ? (
    <div className="flex flex-col leading-loose">
      <h2 className="opacity-30 text-sm font-medium">{title}</h2>
      <p className="font-medium">{content}</p>
    </div>
  ) : null
);

const InfoContainer: React.FC<InfoContainerProps> = ({ items }) => {
  return (
    <Disclosure title="Tiedot" defaultOpen={false}>
      <div className="grid gap-4 lg:grid-cols-2">
        {items
          .filter(item => item.value) // Filter out empty values
          .map(item => (
            <InfoItem key={item.title} title={item.title} content={item.value} />
          ))}
      </div>
    </Disclosure>
  );
};


export default InfoContainer;
