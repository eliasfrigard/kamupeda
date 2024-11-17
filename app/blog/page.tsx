import { getBlogPostData } from "@/utils/contentful"
import Link from "next/link"
import Image from 'next/image'

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default async function Blog() {
  const blogPosts = await getBlogPostData()

  return (
    <div className="container mx-auto grid lg:grid-cols-3 gap-4 lg:gap-8 px-4">
      {
        blogPosts.length && blogPosts.map((post) => (
          <Link key={post.sys.id} href={`/blog/${post.sys.id}`} className="hover:scale-105 duration-200">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow">
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
              <p className="text-sm leading-relaxed opacity-80">
                {truncateText(post.fields.previewDescription, 150)} {/* Adjust character limit as needed */}
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}
