import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Asset } from "contentful";

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

interface BlogPreviewProps {
  id: string;
  image: Asset;
  title: string;
  author: string;
  date: string;
  description: string;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  id,
  image,
  title,
  author,
  date,
  description,
}) => {
  return (
    <Link
      key={id}
      href={`/blogi/${id}`}
      className='
        group
        hover:scale-[1.02]
        hover:shadow-2xl
        active:scale-100
        duration-300
        bg-gradient-to-br from-primary-500 to-primary-700
        shadow-lg
        rounded-2xl
        overflow-hidden
        ring-1 ring-white/10
        hover:ring-2 hover:ring-primary-400'
    >
      <div className='relative w-full aspect-square overflow-hidden'>
        <Image
          alt={image.fields.file.fileName as string}
          src={`http:${image?.fields?.file.url}`}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-300'
        />
      </div>
      <div className='w-full flex flex-col p-6 text-white/80 gap-4 tracking-wide'>
        <h2 className='text-xl font-bold text-white'>{title}</h2>
        <div className='flex items-center text-sm'>
          <p className='font-medium text-primary-300 mr-2'>{author}</p>
          <p className='font-light text-white/60'>({date})</p>
        </div>
        <div className='w-full h-[1px] bg-white/10 rounded-full' />
        <p className='text-sm leading-relaxed opacity-90 text-pretty pr-2'>
          {truncateText(description, 150)}
        </p>
      </div>
    </Link>
  );
};

export default BlogPreview;
