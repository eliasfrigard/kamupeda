import { getBlogPostData } from "@/utils/contentful"
import Link from "next/link"
import Image from 'next/image'

import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export default async function Blog() {
  const blogPosts = await getBlogPostData()

  return (
    <div className="container mx-auto py-16 grid grid-cols-3 gap-8">
      {
        blogPosts.length && blogPosts.map(async (post) => {
          return (
            <Link key={post.sys.id} href={`/blog/${post.sys.id}`} className="hover:scale-105 duration-200">
              <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow ">
                <Image
                  alt={post.fields.previewImage.fields.file.fileName} 
                  src={`http:${post.fields.previewImage.fields.file.url}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full flex flex-col p-4 text-black gap-3">
                <h2 className="text-lg font-bold">{post.fields.title}</h2>
                <div className="w-full h-[2px] bg-black bg-opacity-60 rounded-full" />
                <p className="text-sm leading-relaxed opacity-80">{post.fields.previewDescription}</p>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}
