'use client'
import { FC, useEffect, useState } from "react";
import FileUploadForm from "@/components/profile/UploadFile/FileUploadForm";
import InvisibleOverlay from "@/components/profile-layout/Avatar/InvisibleOverlay";

const ChooseFileBtn: FC = () => {
  const [fileUploadFormVisible, setFileUploadFormVisible] = useState(false)

  useEffect(() => {
    if (fileUploadFormVisible) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [fileUploadFormVisible])

  const handleOpenUploadForm = () => {
    setFileUploadFormVisible(true)
  }

  const handleCloseUploadForm = () => {
    setFileUploadFormVisible(false)
  }

  return (
    <>
      <label onClick={handleOpenUploadForm} htmlFor="fileInput"
             className='text-blue-600 hover:bg-[#202333] py-2 px-3 border-2 border-gray-500 lg:text-base rounded-2xl text-sm cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="inline-block w-5 h-5 mr-1.5 mb-1">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
        </svg>
        Choose file
      </label>
      {fileUploadFormVisible &&
        <>
          <InvisibleOverlay onClick={handleCloseUploadForm} z={20}/>
          <div
            className='fixed bg-black flex p-5 py-7 border-2 border-gray-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl z-20'>
            <FileUploadForm handleCloseUploadForm={handleCloseUploadForm}/>
          </div>
        </>
      }
    </>
  )
}

export default ChooseFileBtn