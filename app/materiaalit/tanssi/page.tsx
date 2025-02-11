import { getMaterialData } from "@/utils/contentful";
import type { Entry } from "contentful";
import type { MaterialSkeleton } from "@/types";
import Material from "@/components/Material";

export default async function BlogPage() {
  const material: Entry<MaterialSkeleton>[] = await getMaterialData({
    forDance: true,
  });

  if (!material.length) {
    return (
      <div className='text-center container mx-auto flex flex-col gap-6 px-6 lg:px-0 text-black text-xl tracking-wide font-medium'>
        Materiaalia ei saatavilla tällä hetkellä.
      </div>
    );
  }

  return (
    <div className='container mx-auto flex flex-col gap-6 px-6 lg:px-0'>
      <Material materialWithInfo={material} loading={false} />
    </div>
  );
}
