import { normalizeSlug } from "@/utils/normalizeSlug"
import { getBlogPostData, getPostById } from "@/utils/contentful"

import type { 
  PageSkeleton,
} from "@/types"

import TextLayout from "@/components/TextLayout"
import Content from "@/components/Content"

export const generateStaticParams = async () => {
  const blogPosts = await getBlogPostData();

  return blogPosts.map((post) => ({
    postId: normalizeSlug(post.sys.id)
  }))
}

export default async function Page({ params }: { params: { postId: string } }) {
  const normalizedId = normalizeSlug(params.postId || ''); // Assuming postId is now a string

  const page = await getPostById(normalizedId) as PageSkeleton;

  if (!page) {
    return (<div>BLOG POST not found</div>)
  }

  return (
    <div className="w-screen py-16">
      <div className="container mx-auto text-black flex flex-col justify-center items-center">
        <TextLayout type="single" className="" text={page.fields.textContent} />
      </div>
    </div>
  )
}
