import { normalizeSlug } from "@/utils/normalizeSlug";
import { getPageBySlug } from "@/utils/contentful";

import type { PageSkeleton } from "@/types";

import Content from "@/components/Content";

export default async function Page() {
  const slug = "kamutaito-1";
  const normalizedSlug = normalizeSlug(slug);

  const page = (await getPageBySlug(normalizedSlug)) as PageSkeleton;

  const pageContent = Array.isArray(page.fields.content)
    ? page.fields.content?.map((entry) => ({
        ...entry,
      }))
    : [];

  return <div></div>;
  return <Content pageContent={pageContent} />;
}
