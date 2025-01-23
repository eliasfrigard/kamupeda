import React from "react";
import MaterialPreview from "./MaterialPreview";
import type { Material, MaterialSkeleton } from "@/types";
import type { Entry } from "contentful";

// Skeleton Card
const SkeletonCard = () => (
  <div className='bg-white border p-4 rounded-lg flex flex-col text-black items-center gap-4 animate-pulse h-[230px] bg-gradient-to-br from-primary-600/70 to-primary-700/70'></div>
);

const Material = ({
  materialWithInfo,
  loading,
}: {
  materialWithInfo: Entry<MaterialSkeleton>[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start px-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className='container mx-auto grid lg:grid-cols-3 gap-6 items-stretch'>
      {materialWithInfo.map((m) => {
        return <MaterialPreview key={m.sys.id} material={m} />;
      })}
    </div>
  );
};

export default Material;
