import { normalizeSlug } from "@/utils/normalizeSlug"
import { getPageData, getPageBySlug } from "@/utils/contentful"

import type { 
  PageSkeleton,
} from "@/types"

import Content from "@/components/Content"

export const generateStaticParams = async () => {
  const pages = await getPageData()
  pages.forEach((page) => {
    console.log(normalizeSlug(page.fields.title))
  })

  return pages.map((page) => ({
    slug: [normalizeSlug(page.fields.title)]
  }))
}

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.pop() || ''
  const normalizedSlug = normalizeSlug(slug)

  const page = await getPageBySlug(normalizedSlug) as PageSkeleton

  if (!page) {
    return (
      <div className="container h-full font-extrabold opacity-80 text-black mx-auto px-8 flex flex-col gap-8 justify-center items-center flex-1">
        <h1 className="text-9xl">404</h1>
        <div className="w-2/3 rounded-full h-[1px] opacity-20 bg-black" />
        <h1 className="text-4xl">Page Not Found</h1>
      </div>
    )
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
