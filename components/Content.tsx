import React from 'react'

import Hero from '@/components/ImageHero'
import TextLayout from '@/components/TextLayout'
import Video from '@/components/Video'
import Logos from '@/components/Logos'
import Disclosure from '@/components/Disclosure'
import DisclosureGroup from '@/components/DisclosureGroup'

import type { 
  TextBlockSkeleton,
  DisclosureSkeleton,
  DisclosureGroupSkeleton,
  LogosSkeleton,
  VideoSkeleton,
  HeroSkeleton,
  PageContent,
  HeroImage
} from "@/types"

interface PageContentProps {
  pageContent: PageContent[]
}

// Update the ContentBlock to expect an object with block and index as properties
const ContentBlock: React.FC<{ block: PageContent, index: number }> = ({ block, index }) => {
  const contentTypeId = block.sys.contentType.sys.id

  if (contentTypeId === 'textBlock') {
    const contentBlock = block as TextBlockSkeleton
    return <TextLayout className="" key={contentBlock.sys.id} text={contentBlock.fields.textContent} />
  }

  if (contentTypeId === 'disclosure') {
    const contentBlock = block as DisclosureSkeleton
    return (
      <div className='max-w-4xl w-full'>
        <Disclosure title={contentBlock.fields.title}>
          <TextLayout className="" key={contentBlock.sys.id} text={contentBlock.fields.textContent} />
        </Disclosure>
      </div>
    )
  }

  if (contentTypeId === 'disclosureGroup') {
    const contentBlock = block as DisclosureGroupSkeleton

    const disclosures: DisclosureSkeleton[] = Array.isArray(contentBlock.fields.disclosures)
    ? [...contentBlock.fields.disclosures]
    : []

    return (
      <div className='max-w-4xl w-full'>
        <DisclosureGroup disclosures={disclosures} />
      </div>
    )
  }

  if (contentTypeId === 'logos') {
    const contentBlock = block as LogosSkeleton
    return <Logos logos={contentBlock.fields.logos} />
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

    const desktopHero: HeroImage = {
      url: 'https:' + desktopFields?.file?.url,
      altText: typeof desktopFields?.title === 'string' ? desktopFields.title : '',
    }

    return (
      <Hero
        offset={40 + 84}
        isFirstElement={index === 0}
        key={contentBlock.sys.id}
        desktopImg={desktopHero}
      />
    )
  }

  return null
}

const Content: React.FC<PageContentProps> = ({ pageContent }) => {
  return (
    <div className='container mx-auto w-full min-h-screen flex flex-col items-center gap-8 md:gap-12 text-black px-6 lg:px-4'>
      {
        pageContent.map((block, index) => {
          // Pass block and index as an object to ContentBlock
          return (
            <ContentBlock key={index} block={block} index={index} />
          )
        })
      }
    </div>
  )
}

export default Content
