import { getBlogPostData } from "@/utils/contentful";
import BlogPreview from "@/components/BlogPreview";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapBlogPost = (post: any) => {
  return {
    sys: post.sys,
    fields: {
      date: formatDate(post.sys.createdAt),
      title: post.fields.title,
      previewImage: post.fields.previewImage,
      textContent: post.fields.textContent,
    },
  };
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("fi-FI", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export default async function Blog() {
  const blogPosts = await getBlogPostData();
  const mappedPosts = blogPosts.map(mapBlogPost);

  return (
    <div className='w-screen container grid grid-cols-1 gap-y-12 mx-auto px-4 md:px-6'>
      {mappedPosts.length &&
        mappedPosts.map((post, index) => (
          <BlogPreview
            reversed={index % 2 === 1}
            key={post.sys.id}
            id={post.sys.id}
            image={post?.fields?.previewImage}
            title={post.fields.title}
            author='Maija Karhinen-Ilo'
            date={post.fields.date}
            textContent={post.fields.textContent}
          />
        ))}
    </div>
  );
}
