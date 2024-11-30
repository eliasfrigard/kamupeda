'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Select from './Select'
import Image from 'next/image'
import OpenSheetMusicDisplay from '../lib/OpenSheetMusicDisplay'

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false, })

interface FileSelectorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any[]
}

const FileSelector: React.FC<FileSelectorProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = React.useState(files[0])
  console.log('🚀 || selectedFile:', selectedFile.fields.file.fileName.includes('.mxl'))

  const options = files.map((file) => file.fields.file.fileName)

  const handleSetSelected = (value: string) => {
    const selected = files.find((file) => file.fields.file.fileName === value)
    setSelectedFile(selected)
  }

  return (
    <div className='container mx-auto flex flex-col justify-center items-center gap-6'>
      <div className="w-full">
        <Select
          options={options}
          selected={selectedFile.fields.file.fileName}
          setSelected={(value) => handleSetSelected(value)}
        />
      </div>

      {
        selectedFile.fields.file.contentType === 'application/pdf' && (
          <PdfViewer url={`https://${selectedFile.fields.file.url}`} />
        )
      }

      {
        selectedFile.fields.file.contentType.startsWith('image') && (
          <div className="w-full rounded-md shadow-md overflow-hidden relative" style={{ paddingBottom: `${(selectedFile.fields.file.details.image.height / selectedFile.fields.file.details.image.width) * 100}%` }}>
            <Image
              src={`https://${selectedFile.fields.file.url}`}
              alt={selectedFile.fields.file.fileName}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )
      }

      {
        (selectedFile.fields.file.fileName.includes('.mxl') 
        || selectedFile.fields.file.contentType === 'application/xml') && (
          <div className='w-full'>
            <OpenSheetMusicDisplay file={`https://${selectedFile.fields.file.url}`} />
          </div>
        )
      }
    </div>
  )
}

export default FileSelector
