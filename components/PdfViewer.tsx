'use client'

import React from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import Button from './Button'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`

interface PDFDocumentProxy {
  numPages: number;
}

function PdfViewer({
  url,
}: {
  url: string
}) {
  const [page, setPage] = React.useState<number>(1)
  const [pages, setPages] = React.useState<number>(1)

  const onDocumentLoadSuccess = (document: PDFDocumentProxy) => {
    const { numPages } = document
    setPages(numPages)
  }

  return (
    <>
      <div className='border rounded-md shadow-md p-12'>
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode="canvas" // using canvas render mode
          onLoadError={() => {
            console.log('PDF load error')
          }}
        >
          <Page
            pageNumber={page}
            renderTextLayer={false} // Disable the text layer
            renderAnnotationLayer={false} // Disable the annotation layer
          />
        </Document>
      </div>
      <div className='flex justify-between mt-4 gap-14'>
        <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>Edellinen</Button>
        <div className='flex justify-center items-center gap-2 '>
          <p className='font-semibold'>{page}</p>
          <p className='text-xs opacity-60 mt-[1px]'>({pages})</p>
        </div>
        <Button onClick={() => setPage(page + 1)} disabled={page >= pages}>Seuraava</Button>
      </div>
    </>
  )
}

export default PdfViewer
