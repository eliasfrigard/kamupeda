import { Asset, EntryFieldTypes } from 'contentful'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

// Contentful types.

export type BaseSkeleton<T extends string, F> = {
  contentTypeId: T
  sys: Sys<T>
  fields: F
}

export type Sys<T extends string> = {
  id: string
  createdAt: string
  updatedAt: string
  contentType: {
    sys: {
      id: T
    }
  }
}

// Contentful type fields.

export type Human = {
  name: string
  image: Asset
}

export type Page = {
  icon: IconType
  title: string
  description: string
  content: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<PageContent>
  >
}

export type BlogPost = {
  title: string
  textContent: EntryFieldTypes.RichText
  previewDescription: string
  previewImage: Asset
  author?: EntryFieldTypes.EntryLink<HumanSkeleton>
}

export type Material = {
  title: string
  files: Asset[]
  key: string
  mode: string
  instrument: string
  difficulty: number
  style: string
  ensemble: string
  origin: string
  description?: EntryFieldTypes.RichText
}

export type Hero = {
  title: string
  hero: Asset
  mobileHero: Asset
}

export type HeroImage = {
  url: string
  altText: string
  blur?: string
}

export type TextBlock = {
  title: string
  textContent: EntryFieldTypes.RichText
}

export type Video = {
  title: string
  youTubeLink: string
}


export type Logos = {
  title: string
  logos: Asset[]
}

export type DisclosureGroup = {
  title: string
  disclosures: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<DisclosureSkeleton>
  >
}

export type IconType = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'> & {
  title?: string
  titleId?: string
} & RefAttributes<SVGSVGElement>>

// Combine contentful base type with fields into skeletons.

export type HeroSkeleton = BaseSkeleton<'hero', Hero>
export type LogosSkeleton = BaseSkeleton<'logos', Logos>
export type VideoSkeleton = BaseSkeleton<'video', Video>
export type HumanSkeleton = BaseSkeleton<'human', Human>
export type PageSkeleton = BaseSkeleton<'page', Page>
export type MaterialSkeleton = BaseSkeleton<'material', Material>
export type BlogPostSkeleton = BaseSkeleton<'blogPost', BlogPost>
export type TextBlockSkeleton = BaseSkeleton<'textBlock', TextBlock>
export type DisclosureSkeleton = BaseSkeleton<'disclosure', TextBlock>
export type DisclosureGroupSkeleton = BaseSkeleton<'disclosureGroup', DisclosureGroup>

/**
 * Page content type.
 * The content field can contain any of the content types.
 */

export type PageContent = 
  | TextBlockSkeleton
  | VideoSkeleton
  | HeroSkeleton
  | MaterialSkeleton
  | LogosSkeleton
  | DisclosureSkeleton
  | DisclosureGroupSkeleton
