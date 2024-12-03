import { getBlogPostData } from "@/utils/contentful"
import BlogPreview from "@/components/BlogPreview";

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
          <BlogPreview
            key={post.sys.id}
            id={post.sys.id}
            image={post?.fields?.previewImage}
            title={post.fields.title}
            author="Maija Karhinen-Ilo"
            date={post.fields.date}
            description={post.fields.previewDescription}
          />
        ))
      }
    </div>
  )
}
