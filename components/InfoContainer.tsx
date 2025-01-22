"use client";

import React from "react";
import Disclosure from "./Disclosure";

interface InfoContainerProps {
  title: string;
  items: {
    title: string;
    value: string;
  }[];
}

const InfoItem = ({ title, content }: { title: string; content: string }) =>
  content ? (
    <div className='flex flex-col leading-loose tracking-wide border-primary-500/20 border-b py-1'>
      <h2 className='text-black/30 text-xs font-medium'>{title}</h2>
      <p className='font-semibold text-black/70'>{content}</p>
    </div>
  ) : null;

const InfoContainer: React.FC<InfoContainerProps> = ({
  title = "Tiedot",
  items,
}) => {
  return (
    <Disclosure title={title} defaultOpen={false}>
      <div className='grid gap-y-3 lg:grid-cols-2'>
        {items
          .filter((item) => item.value) // Filter out empty values
          .map((item) => (
            <InfoItem
              key={item.title}
              title={item.title}
              content={item.value}
            />
          ))}
      </div>
    </Disclosure>
  );
};

export default InfoContainer;
