"use client";

import React from "react";
import dynamic from "next/dynamic";
import Select from "./Select";
import Image from "next/image";
import OpenSheetMusicDisplay from "../lib/OpenSheetMusicDisplay";

import { BiDownload } from "react-icons/bi";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

interface FileSelectorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any[];
}

const FileSelector: React.FC<FileSelectorProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = React.useState(files[0]);

  const options = files.map((file) => file.fields.file.fileName);

  const handleSetSelected = (value: string) => {
    const selected = files.find((file) => file.fields.file.fileName === value);
    setSelectedFile(selected);
  };

  return (
    <div className='w-full mx-auto flex flex-col justify-center items-center gap-6'>
      <div className='w-full flex items-center justify-between flex-col md:flex-row gap-5 lg:gap-4 lg:pr-3'>
        <Select
          className='flex-grow w-full'
          options={options}
          selected={selectedFile.fields.file.fileName}
          setSelected={(value) => handleSetSelected(value)}
        />

        <div className='h-10 gap-2 flex justify-center items-center'>
          {/* Ensure the height of the icons matches the Select component */}
          <div className='h-full aspect-square rounded-full bg-primary-500 flex justify-center items-center text-white bg-gradient-to-r from-primary-500 to-primary-600 cursor-pointer hover:scale-110 duration-150'>
            <BiDownload className='text-xl' />
          </div>
          <div className='h-full aspect-square rounded-full bg-primary-500 flex justify-center items-center text-white bg-gradient-to-r from-primary-500 to-primary-600 cursor-pointer hover:scale-110 duration-150'>
            <BiDownload className='text-xl' />
          </div>
        </div>
      </div>

      {selectedFile.fields.file.contentType === "application/pdf" && (
        <PdfViewer url={`https://${selectedFile.fields.file.url}`} />
      )}

      {selectedFile.fields.file.contentType.startsWith("image") && (
        <div
          className='w-full rounded-md shadow-md overflow-hidden relative'
          style={{
            paddingBottom: `${
              (selectedFile.fields.file.details.image.height /
                selectedFile.fields.file.details.image.width) *
              100
            }%`,
          }}
        >
          <Image
            src={`https://${selectedFile.fields.file.url}`}
            alt={selectedFile.fields.file.fileName}
            layout='fill'
            objectFit='contain'
          />
        </div>
      )}

      {(selectedFile.fields.file.fileName.includes(".mxl") ||
        selectedFile.fields.file.contentType === "application/xml") && (
        <div className='w-full -mb-16'>
          <OpenSheetMusicDisplay
            file={`https://${selectedFile.fields.file.url}`}
          />
        </div>
      )}
    </div>
  );
};

export default FileSelector;
