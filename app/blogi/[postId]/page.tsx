import { normalizeSlug } from "@/utils/normalizeSlug"
import { getBlogPostData, getPostById } from "@/utils/contentful"

import type { 
  BlogPostSkeleton,
} from "@/types"

import TextLayout from "@/components/TextLayout"

export const generateStaticParams = async () => {
  const blogPosts = await getBlogPostData();

  return blogPosts?.map((post) => ({
    postId: normalizeSlug(post.sys.id)
  }))
}

export default async function Page({ params }: { params: { postId: string } }) {
  const normalizedId = normalizeSlug(params.postId || '')

  const page = await getPostById(normalizedId) as BlogPostSkeleton

  // @ts-expect-error TODO: Fix this
  const author = page.fields.author?.fields.name

  if (!page) {
    return (<div>BLOG POST not found</div>)
  }

  return (
    <div className="w-screen">
      <div className="container mx-auto text-black flex flex-col justify-center items-center gap-10 px-6 lg:px-4 max-w-4xl">
        <div className="bg-primary-800 w-full p-6 rounded-lg text-white shadow tracking-wide flex flex-col gap-3">
          <h1 className="text-2xl font-bold leading-[3rem] text-pretty">{page.fields.title}</h1>

          {
            author && (    
              <div className="flex flex-col gap-6">
                <div className="w-full h-[1px] bg-white/10 rounded-full" />
                <div className="grid grid-cols-3">
                  <p className="text-sm font-medium">{author}</p>
                  <p className="text-sm font-medium">20 Januari 2024</p>
                  <p className="text-sm font-medium">{author}</p>
                </div>
              </div>
            )  
          }
        </div>

        <TextLayout className="" text={page.fields.textContent} />
      </div>
    </div>
  )
}
