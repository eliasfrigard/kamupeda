import React from "react";
import Image from "next/image";
import Video from "./Video";
import dynamic from "next/dynamic";
// import DisclosureGroup from "./DisclosureGroup";
const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

import OpenSheetMusicDisplay from "../lib/OpenSheetMusicDisplay";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      // const fields = node.data.target.fields;
      const contentType = node.data.target.sys?.contentType?.sys.id;

      // if (contentType === "disclosureGroup") {
      //   const disclosures = Array.isArray(fields.disclosures)
      //     ? [...fields.disclosures]
      //     : [];

      //   return <DisclosureGroup disclosures={disclosures} />;
      // }

      if (contentType === "video") {
        return (
          <Video
            className='pt-0 pb-2 md:pt-4 md:pb-5'
            key={node.data.target.fields.name}
            title={node.data.target.fields.name}
            link={node.data.target.fields.youTubeLink}
          />
        );
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, fileName, contentType } = node.data.target.fields.file;

      if (fileName.includes("mxl") || fileName.includes("xml")) {
        return (
          <div className='-mb-16'>
            <OpenSheetMusicDisplay file={`https://${url}`} />
          </div>
        );
      }

      if (contentType.includes("pdf")) {
        return <PdfViewer url={`https:${url}`} />;
      }

      if (contentType.includes("audio")) {
        return (
          <audio
            controls
            className='w-full'
            src={`https:${url}`}
            alt={fileName}
          />
        );
      }
      if (contentType.includes("image")) {
        return (
          <Image
            src={`https:${url}`}
            alt={fileName}
            className='m-0 rounded-lg shadow-lg'
            width={node.data.target.fields.file.details.image.width}
            height={node.data.target.fields.file.details.image.height}
          />
        );
      }
    },
  },
};

const TextLayout = ({ text, className }) => {
  let textLength = 0;

  /**
   * Calculate the total text length.
   */
  text?.content.forEach((t) => {
    if (t?.nodeType !== "paragraph") return;

    t?.content.forEach((v) => {
      const value = v?.value?.length;

      if (typeof value === "number") {
        textLength = textLength + value;
      }
    });
  });

  /**
   * Filter empty text nodes.
   */
  const content = text?.content
    .map((t) => {
      if (t.nodeType === "paragraph") {
        t.content = t.content.filter(
          (v) => v.nodeType !== "text" || v.value?.length > 0
        );
      }
      return t;
    })
    .filter((t) => t.nodeType !== "paragraph" || t.content.length > 0);

  const textDocument = {
    ...text,
    content: content,
  };

  return (
    <div
      className={`prose py-0 my-0 max-w-4xl prose-slate gap-4 prose-img:roundedShadow prose-img:shadow-md prose-headings:leading-[2.1rem] prose-h1:leading-[3.1rem] leading-[2.1rem] tracking-wide prose-blockquote:border-accent-500 prose-blockquote:border-l-[3px] prose-blockquote:border-opacity-70 prose-blockquote:rounded-sm prose-blockquote:py-3 prose-blockquote:pl-6 prose-a:text-accent-600 flex flex-col prose-blockquote:text-sm prose-blockquote:leading-[2.1rem] prose-blockquote:max-w-3xl prose-blockquote:my-0 prose-p:my-0 prose-headings:my-0 space-y-4 text-pretty ${className}`}
    >
      {documentToReactComponents(textDocument, options)}
    </div>
  );
};

export default TextLayout;
