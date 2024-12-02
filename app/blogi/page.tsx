import { getBlogPostData } from "@/utils/contentful"
import Link from "next/link"
import Image from 'next/image'

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapBlogPost = (post: any) => {
  return {
    sys: post.sys,
    fields: {
      date: formatDate(post.sys.createdAt),
      title: post.fields.title,
      previewDescription: post.fields.previewDescription,
      previewImage: post.fields.previewImage,
    }
  }
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('fi-FI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export default async function Blog() {
  const blogPosts = await getBlogPostData()
  const mappedPosts = blogPosts.map(mapBlogPost)

  return (
    <div className="container mx-auto grid lg:grid-cols-3 gap-4 lg:gap-8 px-4">
      {
        mappedPosts.length && mappedPosts.map((post) => (
          <Link key={post.sys.id} href={`/blogi/${post.sys.id}`} className="group hover:scale-[1.01] active:scale-100 duration-300 bg-primary-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                alt={post?.fields?.previewImage?.fields?.file?.fileName} 
                src={`http:${post?.fields?.previewImage?.fields?.file.url}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-full flex flex-col p-6 text-white/80 gap-3 tracking-wide">
              <h2 className="text-lg font-semibold">{post.fields.title}</h2>
              <div className="flex items-center text-xs">
                <p className="font-medium mr-2">
                  Maija Karhinen-Ilo
                </p>
                (<p className="font-light">
                  {post.fields.date}
                </p>)
              </div>
              <div className="w-full h-[1px] bg-white/10 rounded-full" />
              <p className="text-sm leading-relaxed opacity-80 text-pretty pr-2">
                {truncateText(post.fields.previewDescription, 150)} {/* Adjust character limit as needed */}
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}
