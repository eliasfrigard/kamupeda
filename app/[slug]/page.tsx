import { normalizeSlug } from "@/utils/normalizeSlug"
import { getPageData } from "@/utils/contentful"

export async function generateStaticParams() {
  const pages = await getPageData()

  return pages.map((page) => ({
    slug: normalizeSlug(page.fields.title)
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const normalizedSlug = params.slug

  const pages = await getPageData()
  const page = pages.find((p) => normalizeSlug(p.fields.title) === normalizedSlug)

  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center text-4xl text-black'>{params.slug}</div>
  )
}
