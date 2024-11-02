import { Asset, EntryFieldTypes } from 'contentful'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

type IconType = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'> & {
  title?: string
  titleId?: string
} & RefAttributes<SVGSVGElement>>

export type Sys<T extends string> = {
  id: string
  contentType: {
    sys: {
      id: T
    }
  }
}

export type BaseSkeleton<T extends string, F> = {
  contentTypeId: T
  sys: Sys<T>
  fields: F
}

export type TextBlockFields = {
  title: string
  textContent: EntryFieldTypes.RichText
}

export type VideoFields = {
  title: string
  youTubeLink: string
}

export type HeroFields = {
  title: string
  hero: Asset
  mobileHero: Asset
}

export type TextBlockSkeleton = BaseSkeleton<'textBlock', TextBlockFields>
export type VideoSkeleton = BaseSkeleton<'video', VideoFields>
export type HeroSkeleton = BaseSkeleton<'hero', HeroFields>

export type PageContent = TextBlockSkeleton | VideoSkeleton | HeroSkeleton
export type PageSkeleton = BaseSkeleton<'page', PageFields>
export type PageFields = {
  icon: IconType
  title: string
  description: string
  pageChildren: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<PageSkeleton>
  >
  content: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<PageContent>
  >
}

export type Page = {
  id: string
  icon: string
  title: string
  description: string
  children: Page[]
}

export type HeroImageType = {
  url: string
  altText: string
  blur?: string
}