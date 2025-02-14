import { normalizeSlug } from "@/utils/normalizeSlug";
import { getBlogPostData, getPostById } from "@/utils/contentful";

import type { BlogPostSkeleton } from "@/types";
import Divider from "@/components/Divider";
import { dancingScript } from "@/app/fonts";

import TextLayout from "@/components/TextLayout";

export const generateStaticParams = async () => {
  const blogPosts = await getBlogPostData();

  return blogPosts?.map((post) => ({
    postId: normalizeSlug(post.sys.id),
  }));
};

const formatDate = (date: string) => {
  const dateObj = new Date(date);

  const formattedDateTime = dateObj.toLocaleString("fi", {
    dateStyle: "medium", // e.g., 28.1.2025
    timeStyle: "short", // e.g., 14:45
  });

  return formattedDateTime;
};

export default async function Page({ params }: { params: { postId: string } }) {
  const normalizedId = normalizeSlug(params.postId || "");

  const page = (await getPostById(normalizedId)) as BlogPostSkeleton;

  // @ts-expect-error TODO: Fix this
  const authors = page.fields.authors;

  if (!page) {
    return <div>BLOG POST not found</div>;
  }

  const formattedCreatedAt = formatDate(page.sys.createdAt);
  const formattedUpdatedAt = formatDate(page.sys.updatedAt);

  return (
    <div className='w-screen'>
      <div className='container mx-auto text-black flex flex-col justify-center items-center gap-10 px-6 lg:px-4 max-w-4xl'>
        <div className='w-full flex flex-col gap-6'>
          <h1 className={`text-5xl font-semibold ${dancingScript.className}`}>
            {page.fields.title}
          </h1>
          <Divider className='opacity-20' />
          <div className='flex flex-wrap gap-5'>
            {authors &&
              authors?.map((author) => (
                <p
                  className='text-accent-500 underline font-medium'
                  key={author.sys.id}
                >
                  {author.fields.name}
                </p>
              ))}
            <div className='flex gap-5 items-end flex-wrap'>
              <div className='flex gap-1 justify-end items-center'>
                <p className='opacity-60 text-xs -mb-[2px]'>Julkaistu:</p>
                <p className='font-medium text-sm'>{formattedCreatedAt}</p>
              </div>
              <div className='flex gap-1 justify-end items-center'>
                <p className='opacity-60 text-xs -mb-[2px]'>Päivitetty:</p>
                <p className='font-medium text-sm'>{formattedUpdatedAt}</p>
              </div>
            </div>
          </div>
        </div>

        <TextLayout className='' text={page.fields.textContent} />
      </div>
    </div>
  );
}
