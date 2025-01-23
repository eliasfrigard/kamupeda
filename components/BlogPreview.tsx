import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Asset } from "contentful";
import TextLayout from "./TextLayout";
import { FaArrowRight } from "react-icons/fa";
import AnimateIn from "./AnimateIn";

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Find the last space within the allowed length
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  // If there's a space, truncate at the space; otherwise, truncate normally
  return lastSpaceIndex > -1
    ? truncated.slice(0, lastSpaceIndex) + " ..."
    : truncated + " ...";
}

interface BlogPreviewProps {
  id: string;
  image: Asset;
  title: string;
  authors: string[];
  date: string;
  reversed: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textContent: any;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  id,
  image,
  title,
  authors,
  date,
  reversed,
  textContent,
}) => {
  let firstParagraph = null;

  textContent.content.some((content) => {
    if (content.nodeType === "paragraph") {
      firstParagraph = content;

      firstParagraph.content[0].value = truncateText(
        firstParagraph.content[0].value,
        480
      );

      return true;
    }
    return false;
  });

  return (
    <AnimateIn
      className={`w-full lg:h-[600px] grid lg:grid-cols-2 overflow-hidden`}
    >
      <div
        className={`order-1 ${
          reversed ? "lg:order-2" : "lg:order-1"
        } h-screen lg:h-full w-full relative overflow-hidden order-2`}
      >
        <Image
          alt={image.fields.file.fileName as string}
          src={`http:${image?.fields?.file.url}`}
          fill
          className='object-cover rounded-lg shadow group-hover:scale-105 transition-transform duration-300'
        />
      </div>

      <div
        className={`order-2 ${
          reversed ? "lg:order-1" : "lg:order-2"
        } w-full flex flex-col pt-6 md:pt-10 md:px-10 lg:pb-10 text-primary-900/80 gap-5 tracking-wide justify-center`}
      >
        <div className='px-2 md:px-0 flex flex-col gap-4'>
          <h2 className='text-3xl font-bold mb-1'>{title}</h2>
          <div className='flex md:items-center text-sm text-accent-500 flex-col md:flex-row gap-1 md:gap-0'>
            <div className='flex flex-col md:flex-row gap-1 md:gap-0'>
              {authors &&
                authors.map((author, index) => (
                  <p key={index} className='font-medium mr-2'>
                    {author}
                    {index < authors.length - 1 && ","}
                  </p>
                ))}
            </div>
            <p className='font-light'>({date})</p>
          </div>
          <TextLayout className='text-pretty' text={firstParagraph} />
        </div>

        <Link
          className='bg-accent-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-accent-600 transition-transform transform hover:scale-[1.02] duration-200 flex justify-between items-center'
          href={`/blogi/${id}`}
        >
          Lue lisää!
          <FaArrowRight />
        </Link>
      </div>
    </AnimateIn>
  );
};

export default BlogPreview;
