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
        <div className="bg-primary-800 w-full p-8 rounded-lg text-white shadow-lg tracking-wide flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{page.fields.title}</h1>
          <div className="w-full h-[1px] bg-white/20 rounded-full" />
          <div>
            <p className="text-sm font-medium">{author}</p>
          </div>
        </div>

        <TextLayout className="" text={page.fields.textContent} />
      </div>
    </div>
  )
}
