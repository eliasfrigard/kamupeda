import React from 'react'

import Hero from '@/components/ImageHero'
import TextLayout from '@/components/TextLayout'
import Video from '@/components/Video'

import type { 
  TextBlockSkeleton, 
  VideoSkeleton,
  HeroSkeleton,
  PageContent,
  HeroImageType
} from "@/types"

interface PageContentProps {
  pageContent: PageContent[]
}

const Content: React.FC<PageContentProps> = ({ pageContent }) => {
  return (
    <div className='container mx-auto w-full min-h-screen flex flex-col justify-center items-center gap-8 mb-16 text-black'>
      {
        pageContent.map((block) => {
          const contentTypeId = block.sys.contentType.sys.id
          
          if (contentTypeId === 'textBlock') {
            const contentBlock = block as TextBlockSkeleton
            return <TextLayout key={contentBlock.sys.id} text={contentBlock.fields.textContent} />
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

            const desktopFields = contentBlock.fields.hero.fields
            const mobileFields = contentBlock.fields.mobileHero.fields

            const desktopHero: HeroImageType = {
              url: 'https:' + desktopFields?.file?.url,
              altText: typeof desktopFields?.title === 'string' ? desktopFields.title : '',
            }
            
            const mobileHero: HeroImageType = {
              url: 'https:' + mobileFields?.file?.url,
              altText: typeof mobileFields?.title === 'string' ? mobileFields.title : '',
            }

            return (
              <Hero 
                key={contentBlock.sys.id}
                mobileImg={desktopHero}
                desktopImg={mobileHero}
              />
            )
          }

          return null
        })
      }
    </div>
  )
}

export default Content
