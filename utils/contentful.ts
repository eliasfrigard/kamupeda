import { createClient } from 'contentful'
import { normalizeSlug } from './normalizeSlug'

// Types.
import type { PageSkeleton } from "@/types"

const space = process.env.SPACE_ID || ''
const accessToken = process.env.ACCESS_TOKEN || ''
const host = process.env.CONTENTFUL_API || 'cdn.contentful.com'

export const getPageData = async () => {
  const client = createClient({ space, accessToken, host })

  const pageRes = await client.getEntries<PageSkeleton>({
    content_type: 'page',
  })

  return pageRes.items
}

export const getPageBySlug = async (slug: string) => {
  // @ts-expect-error TODO: Don't know how to handle yet.
  const pages: PageSkeleton[] = await getPageData()

  return pages.find((p) => normalizeSlug(p.fields.title) === normalizeSlug(slug))

}

export const getPageTitles = async () => {
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

  const buildHierarchy = (page) => ({
    title: page.title,
    children: page.children.map((childId: string) => {
      const childPage = pages.find(p => p.id === childId)
      return { 
        icon: childPage?.icon,
        title: childPage?.title,
        description: childPage?.description,
      }
    })
  })

  // Step 4: Build the hierarchy for each top-level page
  return topLevelPages.map(buildHierarchy)
}