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

export default async function Page({ params }: { params: { id: string } }) {
  const page = (await getMaterialById(params.id)) as MaterialSkeleton;

  if (!page) {
    return <div>BLOG POST not found</div>;
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
                value: page.fields.difficulty.toString(),
              },
              { title: "Tyyli", value: page.fields.style },
              { title: "Moodi", value: page.fields.mode },
              { title: "Soitin", value: page.fields.instrument },
              { title: "Alkuperä", value: page.fields.origin },
            ]}
          />

          <FileSelector files={page.fields.files} />
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
