'use client'
import React from 'react'
import { pdfjs, Document, Page } from 'react-pdf'

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
  const [pages, setPages] = React.useState<number | null>(null)

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
      <div className='flex justify-between mt-4'>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</button>
        <button onClick={() => setPage(page + 1)} disabled={page >= pages}>Next</button>
      </div>
    </>
  )
}

export default PdfViewer
