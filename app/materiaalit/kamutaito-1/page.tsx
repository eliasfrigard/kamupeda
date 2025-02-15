import { normalizeSlug } from "@/utils/normalizeSlug";
import { getPageBySlug } from "@/utils/contentful";

import Content from "@/components/Content";
import type { PageSkeleton } from "@/types";

export default async function Page() {
  const slug = "kamutaito-1";
  const normalizedSlug = normalizeSlug(slug);

  const page = (await getPageBySlug(normalizedSlug)) as PageSkeleton;

  const pageContent = Array.isArray(page.fields.content)
    ? page.fields.content?.map((entry) => ({
        ...entry,
      }))
    : [];

  return <Content pageContent={pageContent} />;
}
