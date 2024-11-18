import { normalizeSlug } from "@/utils/normalizeSlug"
import { getMaterialData, getMaterialById } from "@/utils/contentful"
import PdfViewer from "@/components/PdfViewer"

import type { 
  PageSkeleton,
} from "@/types"
import Image from "next/image"

export const generateStaticParams = async () => {
  const material = await getMaterialData()

  return material.map((m) => ({
    id: normalizeSlug(m.sys.id)
  }))
}

function InfoItem({ title, content } : { title: string, content: string }) {
  if (!content) return null;
  return (
    <div className="flex flex-col leading-loose opacity-80">
      <h2 className="opacity-30 text-sm font-medium">{title}</h2>
      <p className="font-medium">{content}</p>
    </div>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const page = await getMaterialById(params.id) as PageSkeleton

  const pdfDoc = page.fields.files.find((file) => file.fields.file.contentType === 'application/pdf')
  console.log('🚀 || Page || pdfDoc:', pdfDoc)

  if (!page) {
    return (<div>BLOG POST not found</div>)
  }

  return (
    <div className="w-screen">
      <div className="container mx-auto text-black flex flex-col justify-center items-center gap-6 px-6">
        <h1 className="text-3xl lg:text-4xl font-semibold text-pretty">{page.fields.title}</h1>
        <div className="h-[1px] w-2/3 bg-black bg-opacity-20" />

        <PdfViewer url={'https://' + pdfDoc.fields.file.url} />

        {/* INFO */}
        <div className="bg-gray-50 w-full pt-8 pb-6 px-8 rounded-md shadow-md gap-4 grid lg:grid-cols-2">
          <InfoItem title="Vaikeusaste" content={page.fields.difficulty} />
          <InfoItem title="Tyyli" content={page.fields.style} />
          <InfoItem title="Moodi" content={page.fields.mode} />
          <InfoItem title="Soitin" content={page.fields.instrument} />
          <InfoItem title="Alkuperä" content={page.fields.origin} />
        </div>
      </div>
    </div>
  )
}
