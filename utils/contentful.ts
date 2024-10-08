import { createClient } from 'contentful'

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

export const getPageTitles = async () => {
  const client = createClient({ space, accessToken, host })
  
  const pageRes = await client.getEntries<PageSkeleton>({
    content_type: 'page',
    select: ['fields.title']
  })

  return pageRes.items.map((item) => item.fields.title)
}