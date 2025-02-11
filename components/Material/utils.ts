import type { Material } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const skeletonToMaterial = (skeleton: any) => {
  const m: Material = {
    title: skeleton.fields.title,
    files: skeleton.fields.files,
    key: skeleton.fields.key,
    mode: skeleton.fields.mode,
    timeSignature: skeleton.fields.timeSignature,
    instrument: skeleton.fields.instrument,
    difficulty: skeleton.fields.difficulty,
    style: skeleton.fields.style,
    ensemble: skeleton.fields.ensemble,
    origin: skeleton.fields.origin,
  };
  return m;
};

export const difficultyToHuman = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return "Alkeistaso";
    case 2:
      return "Keskitaso";
    case 3:
      return "Edistyneet";
    default:
      return undefined;
  }
};
