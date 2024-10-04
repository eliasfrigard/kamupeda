import { normalizeSlug } from "@/utils/normalizeSlug"
import { getPageData } from "@/utils/contentful"
import type { PageSkeleton, PageContent, TextBlockSkeleton, VideoSkeleton } from "@/types"
import TextLayout from '@/components/TextLayout'
import Video from '@/components/Video'

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
  const pageContent = page.fields.content as PageContent[]

  return (
    <div className='container mx-auto w-full min-h-screen flex flex-col justify-center items-center gap-8 mb-16 text-black'>
      {
        pageContent.map((block) => {
          const contentTypeId = block.sys.contentType.sys.id
          
          if (contentTypeId === 'textBlock') {
            const contentBlock = block as TextBlockSkeleton
            
            return <TextLayout key={contentBlock.sys.id} className="" text={contentBlock.fields.textContent} />
          }
          
          if (contentTypeId === 'video') {
            const contentBlock = block as VideoSkeleton

            return (
              <Video
                key={contentBlock.fields.title}
                className="w-full aspect-video"
                title={contentBlock.fields.title}
                link={contentBlock.fields.youTubeLink}
              />
            )
          }

          return null
        })
      }
    </div>
  )
}
