"use client";

import React from "react";
import Disclosure from "./Disclosure";
import { PiMusicNoteSimpleFill, PiMusicNoteSimpleThin } from "react-icons/pi";

interface InfoContainerProps {
  title: string;
  items: {
    title: string;
    value: string;
  }[];
}

const InfoItem = ({ title, content }: { title: string; content: string }) => {
  if (content)
    return (
      <div className='flex flex-col leading-loose tracking-wide border-white/20 border-b py-1 pl-1'>
        <h2 className='text-white/40 text-xs font-medium'>{title}</h2>

        {title === "Vaikeusaste" ? (
          <div className='my-2 flex text-2xl'>
            {Array.from({ length: parseInt(content) }, (_, i) => (
              <PiMusicNoteSimpleFill
                key={i}
                className='text-accent-500 drop-shadow'
              />
            ))}
            {Array.from({ length: 5 - parseInt(content) }, (_, i) => (
              <PiMusicNoteSimpleThin
                key={i}
                className='text-accent-200 opacity-50 drop-shadow'
              />
            ))}
          </div>
        ) : (
          <p className='font-semibold text-white/90'>{content}</p>
        )}
      </div>
    );
};

const InfoContainer: React.FC<InfoContainerProps> = ({
  title = "Tiedot",
  items,
}) => {
  return (
    <Disclosure title={title} defaultOpen={false}>
      <div className='grid gap-y-3 lg:grid-cols-2'>
        {items &&
          items
            .filter((item) => item.value) // Filter out empty values
            ?.map((item) => (
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
