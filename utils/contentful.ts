import { createClient } from 'contentful'
import { normalizeSlug } from './normalizeSlug'

// Types.
import type { PageSkeleton, Page } from "@/types"

const space = process.env.SPACE_ID || 'nqeymplwbzvw'
const accessToken = process.env.ACCESS_TOKEN || 'a3H-O1EdPtVNSixPuUvIpu-pXFWOkzvCtvuA11TA5-4'
const host = process.env.CONTENTFUL_API || 'cdn.contentful.com'

export const getPageData = async () => {
  const client = createClient({ space, accessToken, host })

  const pageRes = await client.getEntries<PageSkeleton>({
    content_type: 'page',
  })

  return pageRes.items
}

export const getBlogPostData = async () => {
  const client = createClient({ space, accessToken, host })

  const pageRes = await client.getEntries<PageSkeleton>({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  })

  return pageRes.items
}

export const getMaterialData = async () => {
  const client = createClient({ space, accessToken, host })
  
  const pageRes = await client.getEntries<PageSkeleton>({
    content_type: 'material',
    order: '-sys.createdAt',
  })
  
  return pageRes.items
}

export const searchMaterialData = async ({
  searchQuery,
  filters,
} : {
  searchQuery: string
  filters: Record<string, string>
}) => {
  const client = createClient({ space, accessToken, host })

  const query: Record<string, any> = {
    content_type: 'material',
    'fields.key': filters.key,
    'fields.mode': filters.mode,
    'fields.difficulty': filters.difficulty,
    'fields.instrument': filters.instrument,
    'fields.style': filters.style,
    'fields.origin': filters.origin,
  }

  if (searchQuery) {
    query.query = searchQuery;
  }

  if (filters.forEnsemble !== undefined && filters.forEnsemble !== '') {
    query['fields.forEnsemble'] = filters.forEnsemble === 'Kyllä'
  }

  const { items } = await client.getEntries<PageSkeleton>(query)
  return items
}

export const getPageBySlug = async (slug: string) => {
  // @ts-expect-error TODO: Don't know how to handle yet.
  const pages: PageSkeleton[] = await getPageData()

  return pages.find((p) => normalizeSlug(p.fields.title) === normalizeSlug(slug))
}

export const getPostById = async (id: string) => {
  // @ts-expect-error TODO: Don't know how to handle yet.
  const pages: PageSkeleton[] = await getBlogPostData()

  return pages.find((p) => normalizeSlug(p.sys.id) === normalizeSlug(id))
}

export const getMaterialById = async (id: string) => {
  // @ts-expect-error TODO: Don't know how to handle yet.
  const pages: PageSkeleton[] = await getMaterialData()

  return pages.find((p) => normalizeSlug(p.sys.id) === normalizeSlug(id))
}

export const getPages = async (): Promise<Page[]> => {
  const client = createClient({ space, accessToken, host })
  
  const pageRes = await client.getEntries<PageSkeleton>({
    content_type: 'page',
    select: ['fields.icon', 'fields.title', 'fields.description', 'fields.pageChildren']
  })

  const pages = pageRes.items.map((item) => ({
    id: item.sys.id,
    icon: item.fields.icon,
    title: item.fields.title,
    description: item.fields.description,
    children: item.fields.pageChildren?.map(child => child.sys.id) || []
  }))

  const childIds = new Set(pages.flatMap(page => page.children))
  const topLevelPages = pages.filter(page => !childIds.has(page.id))

  const buildHierarchy = (page: { 
    id: string
    icon: string 
    title: string
    description: string 
    children: string[] 
  }): Page => ({
    id: page.id,
    icon: page.icon,
    title: page.title,
    description: page.description,
    children: page.children.map(childId => {
      const childPage = pages.find(p => p.id === childId)
      return childPage ? buildHierarchy(childPage) : null
    }).filter(child => child !== null)
  })

  return topLevelPages.map(buildHierarchy)
}