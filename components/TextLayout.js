import React from 'react'
import Image from 'next/image'
import Video from './Video'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

// Render options for Contentful rich text
const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (node.data.target.sys.contentType.sys.id === "video") {
        return (
          <Video
            className="pt-0 pb-2 md:pt-4 md:pb-5"
            key={node.data.target.fields.name}
            title={node.data.target.fields.name}
            link={node.data.target.fields.youTubeLink}
          />
        );
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { url, fileName } = node.data.target.fields.file
      return (
        <Image
          src={`https:${url}`}
          alt={fileName}
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
        />
      )
    },
  },
}

const TextLayout = ({ text, type = 'dynamic', className }) => {
  let textLength = 0

  text?.content.forEach((t) => {
    if (t.nodeType !== 'paragraph') return

    t.content.forEach((v) => {
      const value = v?.value?.length
      if (typeof value === 'number') {
        textLength = textLength + value
      }
    })
  })

  const textContent = text.content.filter((v) => {
    if (v.nodeType !== 'paragraph') return true
    return v.content[0].value.length > 0
  })

  const textDocument = {
    ...text,
    content: textContent,
  }

  const maxLengthForTwoColumns = 1500

  // Determine layout and alignment classes conditionally
  const layoutClasses = textLength < maxLengthForTwoColumns || type === 'single'
    ? 'prose py-0 my-0 max-w-4xl space-y-4 px-4 lg:px-0 flex flex-col'
    : 'prose max-w-7xl lg:columns-2 gap-10 leading-loose'

  const alignmentClasses = className || 'items-center justify-center'

  return (
    <div
      className={`${layoutClasses} ${alignmentClasses} prose-img:rounded prose-img:shadow-md text-center prose-headings:font-sans prose-a:text-accent-500 prose-li:list-none`}
    >
      {documentToReactComponents(textDocument, options)}
    </div>
  )
}

export default TextLayout
