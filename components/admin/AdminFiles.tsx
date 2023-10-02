'use client'
import {FC, useState} from 'react'
import {FileDTO} from "@/api/dto/file.dto";
import Image from "next/image";
import {updatePublic, updateReject} from "@/api/admin";

interface AdminProps {
  file: FileDTO
}

const AdminFiles: FC<AdminProps> = ({file}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const fileUrl = process.env.NEXT_PUBLIC_HOST + '/uploads/' + `${file.user.id}/` + file.fileName

  if (modalIsOpen) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  }

  const handleCloseImageClick = () => {
    setSelectedImage('')
    setModalIsOpen(false)
  }

  const handleRestricted = (fileId: number[]) => {
    updatePublic && updatePublic(fileId)
  }

  const handleBan = (fileId: number[]) => {
    updateReject && updateReject(fileId, 'admin')
  }

  return (
    <>
      <li key={file.id}
          className='relative mb-1 cursor-pointer border-2 border-gray-500 group transform hover:scale-105 transition-transform duration-250'
      >
        <div className="relative cursor-pointer"
             style={{
               paddingBottom: '100%',
               overflow: 'hidden',
             }}>
          <button onClick={() => handleBan([file.id])}
                  className='absolute truncate overflow-hidden whitespace-nowrap top-1 left-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mb-1 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
            </svg>
          </button>
          <button onClick={() => handleRestricted([file.id])}
                  className='absolute truncate overflow-hidden whitespace-nowrap top-1 right-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="inline-block w-6 h-6 mr-1 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
            </svg>
            <p className='inline-block'>Post</p>
          </button>
          <Image width={800}
                 height={800}
                 src={fileUrl}
                 alt={`${file.originalName}`}
                 loading={"lazy"}
                 className="absolute inset-0 w-full h-full object-cover rounded-sm"
                 onClick={() => handleImageClick(fileUrl)}
          />
          <p onClick={() => handleImageClick(fileUrl)} title={`${file.originalName}`}
             className="absolute truncate overflow-hidden whitespace-nowrap left-0 bottom-0 right-0 bg-black text-white text-center py-1 px-2 pr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-t-2 border-gray-500">
            {file.originalName}
          </p>
        </div>
      </li>
      {modalIsOpen &&
        <>
          <div
            className={`${modalIsOpen ? 'model open' : 'model'}`}
            onClick={handleCloseImageClick}
          >
            <svg onClick={handleCloseImageClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth={1.5} stroke="currentColor"
                 className="w-10 h-10 fixed top-10 right-10 p-1 text-white cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <a onClick={(e) => e.stopPropagation()} href={fileUrl} download={`${file.originalName}`} target="_blank"
               className='absolute truncate overflow-hidden whitespace-nowrap bottom-3 right-3 bg-black text-white text-center p-1 pt-[5px] px-[5px] z-50 rounded border-2 border-gray-500'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6 mb-1">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
              </svg>
            </a>
            <Image
              src={selectedImage}
              width={2000}
              height={2000}
              alt={`${file.originalName}`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </>
      }
    </>
  )
}

export default AdminFiles