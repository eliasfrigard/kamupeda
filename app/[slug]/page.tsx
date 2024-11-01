import { normalizeSlug } from "@/utils/normalizeSlug"
import { getPageData, getPageBySlug } from "@/utils/contentful"

// import Hero from '@/components/Hero'
import Hero from '@/components/ImageHero'
import TextLayout from '@/components/TextLayout'
import Video from '@/components/Video'

import type { 
  PageSkeleton, 
  PageContent, 
  TextBlockSkeleton, 
  VideoSkeleton,
  HeroSkeleton
} from "@/types"

export const generateStaticParams = async () => {
  const pages = await getPageData()

  return pages.map((page) => ({
    slug: normalizeSlug(page.fields.title)
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const normalizedSlug = params.slug

  const page = await getPageBySlug(normalizedSlug) as PageSkeleton

  if (!page) {
    return <div>Page not found</div>
  }

  // @ts-expect-error TODO: Don't know how to handle yet.
  const pageContent = page.fields.content as PageContent[] | undefined

  return (
    <div className='container mx-auto w-full min-h-screen flex flex-col justify-center items-center gap-8 mb-16 text-black'>
      {
        pageContent?.map((block) => {
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
          
          if (contentTypeId === 'hero') {
            const contentBlock = block as HeroSkeleton

            const hero = {
              desktopImg: {
                url: 'https:' + contentBlock.fields.hero.fields.file.url,
                altText: contentBlock.fields.hero.fields.title,
              },
              mobileImg: {
                url: 'https:' + contentBlock.fields.mobileHero.fields.file.url,
                altText: contentBlock.fields.mobileHero.fields.title,
              },
            }

            return (
              // <Hero 
              //   spaced={false}
              //   desktopImg={hero.desktopImg}
              //   mobileImg={hero.mobileImg}
              // />
              <Hero 
                key={contentBlock.sys.id}
                desktopImg={hero.desktopImg}
              />
            )
          }

          return null
        })
      }
    </div>
  )
}
