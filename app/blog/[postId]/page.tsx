import { normalizeSlug } from "@/utils/normalizeSlug"
import { getBlogPostData, getPostById } from "@/utils/contentful"

import type { 
  BlogPostSkeleton,
} from "@/types"

import TextLayout from "@/components/TextLayout"

export const generateStaticParams = async () => {
  const blogPosts = await getBlogPostData();

  return blogPosts.map((post) => ({
    postId: normalizeSlug(post.sys.id)
  }))
}

export default async function Page({ params }: { params: { postId: string } }) {
  const normalizedId = normalizeSlug(params.postId || ''); // Assuming postId is now a string

  const page = await getPostById(normalizedId) as BlogPostSkeleton

  if (!page) {
    return (<div>BLOG POST not found</div>)
  }

  return (
    <div className="w-screen">
      <div className="container mx-auto text-black flex flex-col justify-center items-center">
        <TextLayout type="single" text={page.fields.textContent} />
      </div>
    </div>
  )
}
