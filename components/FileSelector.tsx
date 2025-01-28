"use client";

import React from "react";
import dynamic from "next/dynamic";
import Select from "./Select";
import Image from "next/image";
import OpenSheetMusicDisplay from "../lib/OpenSheetMusicDisplay";

import { downloadZip } from "client-zip";
import { saveAs } from "file-saver";

import { BiDownload } from "react-icons/bi";
import { ImFileZip } from "react-icons/im";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

interface FileSelectorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any[];
  downloadTitle: string;
}

const FileSelector: React.FC<FileSelectorProps> = ({
  files,
  downloadTitle,
}) => {
  const [selectedFile, setSelectedFile] = React.useState(files[0]);
  console.log("🚀 || selectedFile:", selectedFile);

  const options = files.map((file) => file.fields.file.fileName);

  const handleSetSelected = (value: string) => {
    const selected = files.find((file) => file.fields.file.fileName === value);
    setSelectedFile(selected);
  };

  const handleDownloadSelectedFile = (file) => {
    const url = "https:" + file.fields.file.url;

    saveAs(url, selectedFile.fields.file.fileName);
  };

  const handleDownloadAll = async () => {
    try {
      const requests = files.map((file) =>
        fetch(file.fields.file.url).then((res) => res.blob())
      );
      const res = await Promise.all(requests);

      const zippedFiles = res.map((file, index) => ({
        name: `${downloadTitle}/${files[index].fields.file.fileName}`,
        input: file,
      }));

      const zipBlob = await downloadZip(zippedFiles).blob();
      saveAs(zipBlob, `${downloadTitle}.zip`);
    } catch (error) {
      console.error("Error downloading files:", error);
    }
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

        <div className='h-12 gap-2 flex justify-center items-center'>
          {/* Ensure the height of the icons matches the Select component */}
          <div
            onClick={() => handleDownloadSelectedFile(selectedFile)}
            className='h-full aspect-square rounded-full flex justify-center items-center text-white bg-gradient-to-br from-primary-500 to-primary-700 cursor-pointer hover:scale-110 duration-150'
          >
            <BiDownload className='text-xl' />
          </div>
          <div
            onClick={() => handleDownloadAll()}
            className='h-full aspect-square rounded-full flex justify-center items-center text-white bg-gradient-to-br from-accent-500 to-accent-700 cursor-pointer hover:scale-110 duration-150'
          >
            <ImFileZip className='text-lg' />
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
