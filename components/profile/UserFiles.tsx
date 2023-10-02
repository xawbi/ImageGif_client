'use client'
import {FC, useEffect, useState} from 'react'
import {FileDTO} from "@/api/dto/file.dto";
import Image from "next/image";
import {delFile, updateUserRestricted} from "@/api/file";

interface ProfileProps {
  file: FileDTO
}

const UserFiles: FC<ProfileProps> = ({file}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('')
  const fileUrl = process.env.NEXT_PUBLIC_HOST + '/uploads/' + `${file.user.id}/` + file.fileName
  const downloadFileUrl = process.env.NEXT_PUBLIC_HOST + '/public/download/' + `${file.user.id}/` + file.fileName
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

  const handleRestricted = (fileId: number) => {
    updateUserRestricted && updateUserRestricted(fileId)
  }

  const handleRemoveFile = async () => {
    if (file) {
      if (window.confirm('Are you sure you want to remove this file?')) {
        await delFile(file.id)
      }
    }
  }

  // const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  //
  // const handleImageLoad = (event) => {
  //   const img = event.target;
  //   const width = img.naturalWidth; // Get the width of the image
  //   const height = img.naturalHeight; // Get the height of the image
  //
  //   setImageDimensions({ width, height });
  // }

  const fileOriginalName = decodeURIComponent(file.originalName)

  return (
    <>
      <div className={`relative cursor-pointer border-2 border-gray-500 ${file.reject && 'hover:border-red-500'} group transform hover:scale-[1.02] sm:hover:scale-[1.04] transition-transform duration-250`}>
        {file.restricted !== 'public' &&
          <button onClick={handleRemoveFile}
                  className='absolute truncate overflow-hidden whitespace-nowrap top-1 left-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mb-1 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
            </svg>
          </button>
        }
        {!file.reject && <>
          <button disabled={file.restricted !== 'private' && true} onClick={() => handleRestricted(file.id)}
                  className={`absolute truncate overflow-hidden whitespace-nowrap top-1 right-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500 ${file.restricted === 'pending' && 'text-yellow-500'}`}>
            {file.restricted === 'private' &&
              <>
                <div className='hover:text-fuchsia-600 transition'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="inline-block w-6 h-6 mr-1 mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                  </svg>
                  <p className='inline-block'>Post</p>
                </div>
              </>
            } {file.restricted === 'public' &&
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 mb-1 text-green-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
          } {file.restricted === 'pending' &&
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="inline-block w-6 h-6 mr-1 mb-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p className='inline-block'>Pend..</p>
            </>
          }
          </button>
        </>
        }
        <Image width={800}
               height={800}
               src={fileUrl}
               alt={`${fileOriginalName}`}
               loading={"lazy"}
               className="rounded-sm"
               onClick={() => handleImageClick(fileUrl)}
          // onLoad={handleImageLoad}
        />
        <p onClick={() => handleImageClick(fileUrl)} title={`${fileOriginalName}`}
           className="absolute truncate overflow-hidden whitespace-nowrap left-0 bottom-0 right-0 bg-black text-white text-center py-1 px-2 pr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-t-2 border-gray-500">
          {fileOriginalName}
        </p>
      </div>
      {modalIsOpen &&
        <>
          <div
            className={`${modalIsOpen ? 'model open' : 'model'}`}
            onClick={handleCloseImageClick}
          >
            <svg onClick={handleCloseImageClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth={1.5} stroke="currentColor"
                 className="w-10 h-10 fixed top-10 right-10 p-1 text-white cursor-pointer z-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <a onClick={(e) => e.stopPropagation()} href={fileUrl} download={`${fileOriginalName}`} target="_blank"
               className='absolute hover:text-fuchsia-600 transition truncate overflow-hidden whitespace-nowrap bottom-3 right-3 bg-black text-white text-center p-1 pt-[5px] px-[5px] z-50 rounded border-2 border-gray-500'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="inline-block w-6 h-6 mb-1">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
              </svg>
            </a>
            <a onClick={(e) => e.stopPropagation()} href={downloadFileUrl} download={`${fileOriginalName}`}
               target="_blank"
               className='absolute hover:text-fuchsia-600 transition truncate overflow-hidden whitespace-nowrap bottom-3 right-[58px] bg-black text-white text-center p-1 pt-[5px] px-[5px] z-50 rounded border-2 border-gray-500'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="inline-block w-6 h-6 mr-1 mb-1">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
              </svg>
              <p className='inline-block'>Download</p>
            </a>
            <div className={`${window.innerWidth > 1470 && 'img_open'} ${window.innerWidth < 980 && 'h-auto'}`}>
              <Image
                src={selectedImage}
                width={2000}
                height={2000}
                alt={`${fileOriginalName}`}
              />
            </div>
          </div>
        </>
      }
    </>
  )
}

export default UserFiles