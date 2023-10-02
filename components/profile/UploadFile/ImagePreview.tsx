import React, {FC} from "react";
import Image from "next/image";

interface FileUploadProps {
  files: File[];
  handleRemoveFile: (index: number) => void
}

const ImagePreview: FC<FileUploadProps> = ({files, handleRemoveFile}) => {
  return (
    <div className="overflow-y-auto max-h-[350px]">
      {files.map((file, index) => {
        const src = URL.createObjectURL(file);
        return (
          <div key={index} className='flex my-3 justify-between w-[350px] bg-gray-900 border-2 border-gray-500'>
            <div className='flex items-center'>
              <div className="relative w-28 h-16" key={file.name}>
                <Image src={src} alt={file.name} className="object-cover" fill/>
              </div>
              <p
                className='inline-block ml-4 overflow-hidden whitespace-nowrap max-w-[190px] overflow-ellipsis'>{file.name}</p>
            </div>
            <button onClick={(e) => {
              e.preventDefault()
              handleRemoveFile(index);
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6 text-red-500 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
              </svg>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ImagePreview;