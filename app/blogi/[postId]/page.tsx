import { normalizeSlug } from "@/utils/normalizeSlug";
import { getBlogPostData, getPostById } from "@/utils/contentful";

import type { BlogPostSkeleton } from "@/types";

import TextLayout from "@/components/TextLayout";

export const generateStaticParams = async () => {
  const blogPosts = await getBlogPostData();

  return blogPosts?.map((post) => ({
    postId: normalizeSlug(post.sys.id),
  }));
};

export default async function Page({ params }: { params: { postId: string } }) {
  const normalizedId = normalizeSlug(params.postId || "");

  const page = (await getPostById(normalizedId)) as BlogPostSkeleton;

  // @ts-expect-error TODO: Fix this
  const author = page.fields.author?.fields.name;

  if (!page) {
    return <div>BLOG POST not found</div>;
  }

  return (
    <div className='w-screen'>
      <div className='container mx-auto text-black flex flex-col justify-center items-center gap-10 px-6 lg:px-4 max-w-4xl'>
        <div className='bg-gradient-to-br from-primary-600 to-primary-700 w-full p-8 rounded-xl text-white shadow-lg tracking-wide flex flex-col gap-6'>
          {/* Title Section */}
          <h1 className='text-3xl font-extrabold leading-tight text-white text-center'>
            {page.fields.title}
          </h1>

          {/* Divider */}
          <div className='w-full h-[2px] bg-white/20 rounded-full' />

          {/* Author and Date Section */}
          {author && (
            <div className='flex flex-col items-center gap-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 w-full text-center text-sm text-primary-200 gap-y-4'>
                <div className='flex flex-col text-center gap-1'>
                  <p className='font-medium text-white text-xs'>Author</p>
                  <p className='font-light'>{author}</p>
                </div>
                <div className='flex flex-col text-center gap-1'>
                  <p className='font-medium text-white text-xs'>Published On</p>
                  <p className='font-light'>20 January 2024</p>
                </div>
                <div className='flex flex-col text-center gap-1'>
                  <p className='font-medium text-white text-xs'>Contributor</p>
                  <p className='font-light'>{author}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <TextLayout className='' text={page.fields.textContent} />
      </div>
    </div>
  );
}
