import { normalizeSlug } from "@/utils/normalizeSlug";
import { getBlogPostData } from "@/utils/contentful";

// import type { BlogPostSkeleton } from "@/types";

// import TextLayout from "@/components/TextLayout";

export const generateStaticParams = async () => {
  const blogPosts = await getBlogPostData();

  return blogPosts?.map((post) => ({
    postId: normalizeSlug(post.sys.id),
  }));
};

// const InfoItem = ({ label, value }) => {
//   return (
//     <div className='flex flex-col gap-2 items-start'>
//       <p className='text-sm font-medium text-primary-900/70'>{label}:</p>
//       <p className='font-medium'>{value}</p>
//     </div>
//   );
// };

// const formatDate = (date: string) => {
//   const dateObj = new Date(date);

//   const formattedDateTime = dateObj.toLocaleString("fi", {
//     dateStyle: "medium", // e.g., 28.1.2025
//     timeStyle: "short", // e.g., 14:45
//   });

//   return formattedDateTime;
// };

export default async function Page({ params }: { params: { postId: string } }) {
  console.log("🚀 || Page || params:", params);
  // const normalizedId = normalizeSlug(params.postId || "");

  // const page = (await getPostById(normalizedId)) as BlogPostSkeleton;

  // const authors = page.fields.authors;

  // if (!page) {
  //   return <div>BLOG POST not found</div>;
  // }

  // const formattedCreatedAt = formatDate(page.sys.createdAt);
  // const formattedUpdatedAt = formatDate(page.sys.updatedAt);

  return (
    <div className='w-screen'>
      <div className='container mx-auto text-black flex flex-col justify-center items-center gap-10 px-6 lg:px-4 max-w-4xl'>
        {/* <TextLayout className='' text={page.fields.textContent} />

        <div className='bg-gradient-to-r from-accent-500/30 to-primary-800/30 w-full h-[1px] rounded-full' />

        <div className='flex flex-col gap-4 w-full justify-start items-start'>
          <InfoItem label='Otsikko' value={page.fields.title} />
          <InfoItem label='Julkaistu' value={formattedCreatedAt} />
          <InfoItem label='Viimeksi Päivitetty' value={formattedUpdatedAt} />
          <InfoItem
            label='Kirjoittaja'
            value={authors?.map((author) => author.fields.name).join(", ")}
          />
        </div> */}
      </div>
    </div>
  );
}
