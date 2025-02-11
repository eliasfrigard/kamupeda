import { getMaterialData } from "@/utils/contentful";
import type { Entry } from "contentful";
import type { MaterialSkeleton } from "@/types";
import CategorySection from "@/components/Material/CategorySection";

export default async function BlogPage() {
  const material: Entry<MaterialSkeleton>[] = await getMaterialData({
    sortByInstrument: true,
  });

  const groupedByInstrument = material.reduce((acc, curr) => {
    const instrument = curr.fields.instrument;
    // @ts-expect-error TODO: Don't know how to handle yet.
    if (!acc[instrument]) {
      // @ts-expect-error TODO: Don't know how to handle yet.
      acc[instrument] = [];
    }
    // @ts-expect-error TODO: Don't know how to handle yet.
    acc[instrument].push(curr);
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
      {Object.entries(groupedByInstrument).map(([instrument, materials]) => (
        <CategorySection
          key={instrument}
          category={instrument}
          materials={materials}
        />
      ))}
    </div>
  );
}
