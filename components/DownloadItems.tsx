"use client";

import React from "react";
import { BiSolidDownload } from "react-icons/bi";

interface DownloadItemsProps {
  // Define your props here
}

const DownloadItems: React.FC<DownloadItemsProps> = ({ files }) => {
  const handleDownloadAll = () => {
    files.forEach((file) => {
      console.log(file.fields.file.url);
      const link = document.createElement("a");
      link.href = "https:" + file.fields.file.url; // The URL of the file
      link.download = ""; // Specify a filename if you want or leave empty to use the default
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM
    });
  };

  return (
    <div className='fixed h-14 bottom-10 right-10 flex flex-row-reverse gap-2 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full p-2 shadow-md'>
      <div className='aspect-square h-full bg-primary-800 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600'>
        <BiSolidDownload className='text-2xl' />
      </div>
      <div
        className='aspect-square h-full bg-primary-800 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600'
        onClick={() => handleDownloadAll()}
      >
        <p className='text-lg font-extrabold'>{files.length}</p>
      </div>
    </div>
  );
};

export default DownloadItems;
