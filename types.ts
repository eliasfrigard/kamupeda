import * as Contentful from 'contentful'

export type PageSkeleton = {
  contentTypeId: "page",
  sys: {
    id: string
  }
  fields: {
    title: Contentful.EntryFieldTypes.Text
  }
}
