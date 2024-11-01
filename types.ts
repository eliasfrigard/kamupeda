import * as Contentful from 'contentful'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

type IconType = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'> & {
  title?: string;
  titleId?: string;
} & RefAttributes<SVGSVGElement>>

export type TextBlockSkeleton = {
  contentTypeId: 'textBlock',
  sys: {
    id: string,
    contentType: {
      sys: {
        id: 'textBlock',
      },
    },
  },
  fields: {
    title: string,
    textContent: Contentful.EntryFieldTypes.RichText,
  },
}

export type VideoSkeleton = {
  contentTypeId: 'video',
  sys: {
    id: string,
    contentType: {
      sys: {
        id: 'video',
      },
    },
  },
  fields: {
    title: string,
    youTubeLink: string,
  },
}

export type HeroSkeleton = {
  contentTypeId: 'hero',
  sys: {
    id: string,
    contentType: {
      sys: {
        id: 'hero',
      },
    },
  },
  fields: {
    title: string,
    hero: Contentful.EntryFieldTypes.Asset,
    mobileHero: Contentful.EntryFieldTypes.Asset,
  },
}

export type PageContent = TextBlockSkeleton | VideoSkeleton | HeroSkeleton

export type PageSkeleton = {
  contentTypeId: 'page',
  sys: {
    id: string,
  },
  fields: {
    icon: IconType,
    title: string,
    description: string,
    pageChildren: Contentful.EntryFieldTypes.Array<
      Contentful.EntryFieldTypes.EntryLink<PageSkeleton>
    >,
    // Should support more content types in the future.
    content: Contentful.EntryFieldTypes.Array<
      Contentful.EntryFieldTypes.EntryLink<PageContent>
    >,
  },
};

// Define other potential content types here
export type OtherContentTypeSkeleton = {
  contentTypeId: 'otherContentType',
  // Add other fields as needed
};


export type Product = {
  name: string;
  description: string;
  href: string;
  icon: IconType;
}

export type CallToAction = {
  name: string;
  href: string;
  icon: IconType;
}
