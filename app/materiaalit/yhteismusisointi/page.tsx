import { getMaterialData } from "@/utils/contentful";
import type { Entry } from "contentful";
import type { MaterialSkeleton } from "@/types";
import CategorySection from "@/components/Material/CategorySection";

export default async function BlogPage() {
  const material: Entry<MaterialSkeleton>[] = await getMaterialData({
    forEnsemble: true,
  });

  const groupedByInstrument = material.reduce((acc, curr) => {
    const ensemble = curr.fields.ensemble;
    // @ts-expect-error TODO: Don't know how to handle yet.
    if (!acc[ensemble]) {
      // @ts-expect-error TODO: Don't know how to handle yet.
      acc[ensemble] = [];
    }
    // @ts-expect-error TODO: Don't know how to handle yet.
    acc[ensemble].push(curr);
    return acc;
  }, {} as Record<string, Entry<MaterialSkeleton>[]>);

  if (!material.length) {
    return (
      <div className='text-center container mx-auto flex flex-col gap-6 px-6 lg:px-0 text-black text-xl tracking-wide font-medium'>
        Materiaalia ei saatavilla tällä hetkellä.
      </div>
    );
  }

  return (
    <div className='container mx-auto flex flex-col gap-6 px-6 lg:px-0'>
      {Object.entries(groupedByInstrument).map(([ensemble, materials]) => (
        <CategorySection
          key={ensemble}
          category={ensemble}
          materials={materials}
        />
      ))}
    </div>
  );
}
