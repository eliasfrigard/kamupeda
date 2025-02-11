"use client";

import React from "react";
import { pdfjs, Document, Page } from "react-pdf";
import Pagination from "./Pagination";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

interface PDFDocumentProxy {
  numPages: number;
}

function PdfViewer({ url }: { url: string }) {
  const [page, setPage] = React.useState<number>(1);
  const [pages, setPages] = React.useState<number>(1);
  const [divWidth, setDivWidth] = React.useState<number>(window.innerWidth);

  const documentRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    setDivWidth(documentRef.current?.clientWidth || window.innerWidth);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setDivWidth(documentRef.current?.clientWidth || window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [documentRef]);

  const onDocumentLoadSuccess = (document: PDFDocumentProxy) => {
    const { numPages } = document;
    setPages(numPages);
  };

  return (
    <>
      <div ref={documentRef} className='border max-w-full w-full mb-3'>
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode='canvas'
          onLoadError={() => {
            console.log("PDF load error");
          }}
        >
          <Page
            width={divWidth}
            pageNumber={page}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      <Pagination
        totalPages={pages}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}

export default PdfViewer;
