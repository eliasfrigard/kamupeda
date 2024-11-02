import { normalizeSlug } from "@/utils/normalizeSlug"
import { getPageData, getPageBySlug } from "@/utils/contentful"

import type { 
  PageSkeleton,
} from "@/types"

import Content from "@/components/Content"

export const generateStaticParams = async () => {
  const pages = await getPageData()

  return pages.map((page) => ({
    slug: [normalizeSlug(page.fields.title)]
  }))
}

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const normalizedSlug = (params.slug || []).join('/')

  const page = await getPageBySlug(normalizedSlug) as PageSkeleton

  if (!page) {
    return (<div>Page not found</div>)
  }

  const pageContent = Array.isArray(page.fields.content)
    ? page.fields.content.map((entry) => ({
        ...entry
      }))
    : []

  return (
    <Content pageContent={pageContent} />
  )
}
