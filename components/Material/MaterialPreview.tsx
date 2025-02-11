import React from "react";
import Link from "next/link";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiViolin } from "react-icons/gi";
import Chip from "@/components/Chip";

import { skeletonToMaterial, difficultyToHuman } from "./utils";
import OpenSheetMusicDisplay from "../../lib/OpenSheetMusicDisplay";

import type { Entry } from "contentful";
import type { MaterialSkeleton } from "@/types";

interface MaterialPreviewProps {
  material: Entry<MaterialSkeleton>;
}

const MaterialPreview: React.FC<MaterialPreviewProps> = ({ material }) => {
  const m = skeletonToMaterial(material);

  return (
    <Link
      href={`/materiaalit/${material.sys.id}`}
      className='relative group bg-gradient-to-br from-primary-500 to-primary-600 focus:outline-accent-500 active:scale-[1.02] py-7 shadow-lg rounded-lg flex flex-col text-secondary-400 items-center gap-5 hover:scale-[1.05] transition-transform duration-150 overflow-hidden px-4'
    >
      <div className='w-full h-full top-0 absolute group-hover:bg-black/20 duration-300' />

      <div className='flex gap-3 justify-center items-center z-10'>
        {m.ensemble ? (
          <BsFillPeopleFill className='text-2xl text-secondary-500' />
        ) : (
          <GiViolin className='text-2xl text-secondary-500' />
        )}
        <h3 className='text-xl font-semibold text-center -mb-1'>{m.title}</h3>
      </div>

      <div className='h-[1px] bg-primary-50 bg-opacity-20 w-2/3 rounded-full mb-1 z-10' />

      <div className='flex flex-wrap gap-3 justify-center items-center z-10'>
        <Chip>{difficultyToHuman(m.difficulty)}</Chip>
        <Chip>{m.instrument}</Chip>
        <Chip>
          {m.key && m.mode ? `${m.key}-${m.mode}` : m.key || m.mode || ""}
        </Chip>
        <Chip>{m.timeSignature}</Chip>
        <Chip>{m.style}</Chip>
        <Chip>{m.origin}</Chip>
        <Chip>{m.ensemble}</Chip>
      </div>

      {(() => {
        const file = m.files.find((file) => {
          const contentType = file.fields.file.contentType;
          const fileName = file.fields.file.fileName as string;

          if (fileName.includes(".mxl") || contentType === "application/xml") {
            return true;
          }
        });

        return file ? (
          <div className='w-full mx-auto text-secondary-400 -my-10'>
            <OpenSheetMusicDisplay
              drawTitle={false}
              drawSubtitle={false}
              drawPartNames={false}
              drawPartAbbreviations={false}
              defaultColorMusic='#fefcf4'
              drawCredits={false}
              drawComposer={false}
              drawLyricist={false}
              drawMetronomeMarks={false}
              drawMeasureNumbers={false}
              drawMeasureNumbersOnlyAtSystemStart={false}
              drawTimeSignatures={false}
              drawUpToMeasureNumber={1}
              file={file.fields.file.url}
            />
          </div>
        ) : null;
      })()}
    </Link>
  );
};

export default MaterialPreview;
