import { createClient } from 'contentful'
import * as Contentful from 'contentful'

const space = process.env.SPACE_ID || ''
const accessToken = process.env.ACCESS_TOKEN || ''

type PageSkeleton = {
  contentTypeId: "page",
  sys: {
    id: string
  }
  fields: {
    title: Contentful.EntryFieldTypes.Text
  }
}

const normalizeSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-')
}

const getPageData = async () => {
  const client = createClient({ space, accessToken })

  const pageRes = await client.getEntries<PageSkeleton>({
    content_type: 'page'
  })

  return pageRes.items
}

export async function generateStaticParams() {
  const pages = await getPageData()

  return pages.map((page) => ({
    slug: normalizeSlug(page.fields.title)
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const normalizedSlug = params.slug

  const pages = await getPageData()
  const page = pages.find((p) => normalizeSlug(p.fields.title) === normalizedSlug)

  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center text-4xl text-black'>{params.slug}</div>
  )
}
