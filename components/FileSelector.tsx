'use client'

import React from 'react'
import PdfViewer from './PdfViewer'
import Select from './Select'
import Image from 'next/image'

interface FileSelectorProps {
  files: any[]
}

const FileSelector: React.FC<FileSelectorProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = React.useState(files[0])

  const options = files.map((file) => file.fields.file.fileName)

  const handleSetSelected = (value: string) => {
    const selected = files.find((file) => file.fields.file.fileName === value)
    setSelectedFile(selected)
  }

  for (const file of files) {
    console.log(file.fields.file.contentType)
  }

  return (
    <div className='container mx-auto flex flex-col justify-center items-center gap-8'>
      <div className="w-full max-w-[600px]">
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
          <div className="w-full h-[500px] relative">
            <Image
              src={`https://${selectedFile.fields.file.url}`}
              alt={selectedFile.fields.file.fileName}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )
      }
    </div>
  )
}

export default FileSelector
