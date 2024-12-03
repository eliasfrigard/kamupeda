import type { Entry } from 'contentful'
import { createClient } from 'contentful'
import { normalizeSlug } from './normalizeSlug'

import type {
  PageSkeleton, 
  MaterialSkeleton, 
  BlogPostSkeleton, 
  DisclosureSkeleton,
  DisclosureGroupSkeleton,
  TextBlockSkeleton
} from "@/types"

export const getContentfulClient = () =>
  createClient({
    space: process.env.CONTENTFUL_SPACE_ID || 'nqeymplwbzvw',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'a3H-O1EdPtVNSixPuUvIpu-pXFWOkzvCtvuA11TA5-4',
    host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
  })

export const getPageData = async () => {
  const client = getContentfulClient()

  const pageRes = await client.getEntries<PageSkeleton>({
    content_type: 'page',
  })

  return pageRes.items
}

export const getBlogPostData = async (): Promise<Entry<BlogPostSkeleton>[]> => {
  const client = getContentfulClient()

  const pageRes = await client.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    // @ts-expect-error TODO: Don't know how to handle yet.
    order: '-sys.createdAt',
  })

  return pageRes.items
}

export const getMaterialData = async (): Promise<Entry<MaterialSkeleton>[]> => {
  const client = getContentfulClient()

  const response = await client.getEntries<MaterialSkeleton>({
    content_type: 'material',
    // @ts-expect-error TODO: Don't know how to handle yet.
    order: '-sys.createdAt',
  })

  return response.items
}

export const searchMaterialData = async ({
  searchQuery,
  filters,
}: {
  searchQuery: string
  filters: Record<string, string>
}): Promise<Entry<MaterialSkeleton>[]> => {
  const client = getContentfulClient()

  const query: Record<string, unknown> = {
    content_type: 'material',
  }

  if (filters.key) {
    query['fields.key'] = filters.key
  }
  if (filters.mode) {
    query['fields.mode'] = filters.mode
  }
  if (filters.difficulty) {
    query['fields.difficulty'] = filters.difficulty
  }
  if (filters.instrument) {
    query['fields.instrument'] = filters.instrument
  }
  if (filters.style) {
    query['fields.style'] = filters.style
  }
  if (filters.origin) {
    query['fields.origin'] = filters.origin
  }
  
  if (filters.forEnsemble !== undefined && filters.forEnsemble !== '') {
    query['fields.forEnsemble'] = filters.forEnsemble === 'Kyllä'
  }

  if (searchQuery) {
    query.query = searchQuery
  }

  const { items } = await client.getEntries<MaterialSkeleton>(query)
  return items
}

const getDisclosures = async (disclosureIds: string[]) => {
  const client = getContentfulClient()

  const disclosures = await client.getEntries<DisclosureSkeleton>({
    // @ts-expect-error
    'sys.id[in]': disclosureIds.join(','),
  })

  return disclosures.items
}

export const getPageBySlug = async (slug: string) => {
  // @ts-expect-error TODO: Don't know how to handle yet.
  const pages: PageSkeleton[] = await getPageData()
  
  const page = pages.find((p) => normalizeSlug(p.fields.title) === normalizeSlug(slug))
  
  if (page?.fields.content) {
    // @ts-expect-error
    for (const contentBlock of page.fields.content) {
      if (contentBlock.sys.contentType.sys.id === 'disclosureGroup') {
        const disclosureGroup = contentBlock as DisclosureGroupSkeleton

        const disclosures = Array.isArray(disclosureGroup.fields.disclosures) ? disclosureGroup.fields.disclosures : []
        
        // Fetch disclosures asynchronously
        const disclosureIds = disclosures.map((disclosure: DisclosureSkeleton) => disclosure.sys.id)
        // @ts-expect-error
        disclosureGroup.fields.disclosures = await getDisclosures(disclosureIds)
      }
    }
  }

  return page
}

export const getPostById = async (id: string) => {
  // @ts-expect-error TODO: Don't know how to handle yet.
  const pages: BlogPostSkeleton[] = await getBlogPostData()

  return pages.find((p) => normalizeSlug(p.sys.id) === normalizeSlug(id))
}

export const getMaterialById = async (id: string) => {
  // @ts-expect-error TODO: Don't know how to handle yet.
  const pages: MaterialSkeleton[] = await getMaterialData()

  return pages.find((p) => normalizeSlug(p.sys.id) === normalizeSlug(id))
}

export const getAssetById = async (id: string) => {
  const client = getContentfulClient()

  return await client.getAsset(id)
}
