import TextLayout from "@/components/TextLayout"
import { getBlogPostData } from "@/utils/contentful"
import Link from "next/link"

import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export default async function Blog() {
  const blogPosts = await getBlogPostData()

  return (
    <div className="container mx-auto py-16">
      {
        blogPosts.length && blogPosts.map(async (post) => {
          const descriptionHtml = await markdownToHtml(post.fields.description)

          return (
            <Link key={post.sys.id} href={`/blog/${post.sys.id}`}>
              <div className="relative w-full flex items-center text-black rounded min-h-[400px] hover:bg-gray-500 hover:bg-opacity-10 hover:scale-105 duration-200 overflow-hidden">
                <div className="h-full w-1/3 bg-red-500"></div>
                <div className="w-2/3 h-full flex flex-col px-8 py-6 gap-4">
                  <h2 className="text-xl font-bold">{post.fields.title}</h2>
                  <div className="flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}
