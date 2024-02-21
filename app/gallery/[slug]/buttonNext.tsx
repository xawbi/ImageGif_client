"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FileDTO } from "@/api/dto/file.dto";
import { updateView } from "@/api/public";

type ButtonNextProps = {
  files: FileDTO[]
  fileId: number
}

const ButtonNext: React.FC<ButtonNextProps> = React.memo(function ButtonNextComponent({ files, fileId }) {
  const router = useRouter()
  const currentPostIndex = files.findIndex((file) => String(file.id) === fileId.toString())
  const nextFile = files[(+currentPostIndex + 1) % files.length]
  const prevFile = files[(+currentPostIndex - 1 + files.length) % files.length]

  const goToNextFile = async () => {
    const nextFileId = nextFile.id || files[0].id;
    router.push(`/gallery/${nextFileId}`)
    await updateView(nextFileId)
  }

  const goToPrevFile = async () => {
    const prevFileId = prevFile.id || files[files.length - 1].id;
    router.push(`/gallery/${prevFileId}`)
    await updateView(prevFileId)
  }

  return (
    <>
      <button className='bg-gray-900 hover:bg-gray-800 border-2 border-gray-500 mr-0.5 p-1' onClick={goToPrevFile}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button className='bg-gray-900 hover:bg-gray-800 border-2 border-gray-500 p-1' onClick={goToNextFile}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      {/*<button onClick={() => router.push('/')}>back</button>*/}
    </>
  );
});

ButtonNext.displayName = "ButtonNext";

export default ButtonNext;