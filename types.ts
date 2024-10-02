import * as Contentful from 'contentful'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

type IconType = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'> & {
  title?: string;
  titleId?: string;
} & RefAttributes<SVGSVGElement>>;

export type PageSkeleton = {
  contentTypeId: "page",
  sys: {
    id: string
  }
  fields: {
    title: Contentful.EntryFieldTypes.Text
  }
}

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
