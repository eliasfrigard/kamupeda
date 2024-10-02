import { normalizeSlug } from "@/utils/normalizeSlug"
import { getPageData } from "@/utils/contentful"
import type { PageSkeleton, TextBlockSkeleton } from "@/types"
import TextLayout from '@/components/TextLayout'

export async function generateStaticParams() {
  const pages = await getPageData()

  return pages.map((page) => ({
    slug: normalizeSlug(page.fields.title)
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const normalizedSlug = params.slug

  // @ts-expect-error TODO: Don't know how to handle yet.
  const pages: PageSkeleton[] = await getPageData()
  const page = pages.find((p) => normalizeSlug(p.fields.title) === normalizedSlug)

  if (!page) {
    return <div>Page not found</div>
  }

  // @ts-expect-error TODO: Don't know how to handle yet.
  const pageContent = page.fields.content as TextBlockSkeleton[]

  return (
    <div className='w-full min-h-screen flex justify-center items-center text-4xl text-black'>
      {
        pageContent.map((block: TextBlockSkeleton) => {
          const contentTypeId = block.sys.contentType.sys.id

          if (contentTypeId === 'textBlock') {
            return (
              <div key={block.sys.id} className='p-4'>
                <TextLayout className="" text={block.fields.textContent} />
              </div>
            )
          }

          return null
        })
      }
    </div>
  )
}
