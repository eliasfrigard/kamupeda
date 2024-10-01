import { createClient } from 'contentful'
import * as Contentful from 'contentful'

const space = process.env.SPACE_ID || ''
const accessToken = process.env.ACCESS_TOKEN || ''

type PageSkeleton = {
  contentTypeId: "page",
  fields: {
    title: Contentful.EntryFieldTypes.Text
  }
}

export async function generateStaticParams() {
  const client = createClient({ space, accessToken })

  const pageRes = await client.getEntries<PageSkeleton>({
    content_type: 'page',
  })

  const pages = pageRes.items

  return pages.map((page) => ({
    slug: page.fields.title
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <div className='w-full min-h-screen flex justify-center items-center text-4xl text-black'>{params.slug}</div>
  )
}
