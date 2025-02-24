import { normalizeSlug } from "@/utils/normalizeSlug";
import { getMaterialData, getMaterialById } from "@/utils/contentful";
import FileSelector from "@/components/FileSelector";
import InfoContainer from "@/components/InfoContainer";
import TextLayout from "@/components/TextLayout";

import type { MaterialSkeleton } from "@/types";

export const generateStaticParams = async () => {
  const material = await getMaterialData();

  return material?.map((m) => ({
    id: normalizeSlug(m.sys.id),
  }));
};

const isAudioFile = (file) => {
  return file.fields.file.contentType.includes("audio");
};

export default async function Page({ params }: { params: { id: string } }) {
  const page = (await getMaterialById(params.id)) as MaterialSkeleton;

  const audioFiles = page.fields.files.filter((file) => isAudioFile(file));
  const sheetMusic = page.fields.files.filter((file) => !isAudioFile(file));

  if (!page) {
    return (
      <div className='container h-full font-extrabold text-primary-800 mx-auto px-8 flex flex-col gap-8 justify-center items-center flex-1'>
        <h1 className='text-9xl'>404</h1>
        <div className='w-2/3 rounded-full h-[1px] opacity-20 bg-primary-800' />
        <h1 className='text-4xl'>Page Not Found</h1>
      </div>
    );
  }

  return (
    <div className='w-screen'>
      <div className='container mx-auto text-black flex flex-col justify-center items-center gap-8 px-6 lg:px-4 max-w-4xl'>
        <div className='flex flex-col gap-5 w-full'>
          <InfoContainer
            title={page.fields.title}
            items={[
              {
                title: "Vaikeusaste",
                value: page.fields.difficulty?.toString(),
              },
              { title: "Tyyli", value: page.fields.style },
              { title: "Moodi", value: page.fields.mode },
              { title: "Soitin", value: page.fields.instrument },
              { title: "Alkuperä", value: page.fields.origin },
            ]}
          />

          <FileSelector downloadTitle={page.fields.title} files={sheetMusic} />

          <div className='mt-4'>
            {audioFiles.length > 0 &&
              audioFiles.map((file) => (
                <audio
                  key={file.sys.id}
                  controls
                  className='w-full'
                  src={`https:${file.fields.file.url}`}
                />
              ))}
          </div>
        </div>

        {page.fields.description && (
          <TextLayout
            className={`text-center font-dancing-script`}
            text={page.fields.description}
          />
        )}
      </div>
    </div>
  );
}
