"use client";
import { FC, useState } from "react";
import { FileDTO } from "@/api/dto/file.dto";
import { UserDTO } from "@/api/dto/user.dto";
import LikeAndDislikeButtons from "@/components/public/LikeAndDislikeButtons";
import { postFavorites } from "@/api/file";

interface filePageProps {
  file: FileDTO;
  user: UserDTO;
}

const FileButtons: FC<filePageProps> = ({ file, user }) => {
  const downloadFileUrl = process.env.NEXT_PUBLIC_HOST + "/public/download/" + `${file.user.id}/` + file.fileName;
  const [modal, setModal] = useState("")
  const [favoriteClicked, setFavoriteClicked] = useState(
    user ? file && file.favorites && file.favorites.some((el) => el.user.id === user.id && el.file.id === file.id) : false
  )

  const handleFavorites = async (favorite: string, fileId: number) => {
    if (user) {
      await postFavorites(fileId)
      setFavoriteClicked(!favoriteClicked)
    } else {
      setModal(favorite);
    }
  };

  return (
    <>
      <LikeAndDislikeButtons user={user} file={file} pagesType={'slugPageFile'}/>
      <div className='flex relative flex-1 justify-center'>
      <button onClick={() => handleFavorites("favorite", file.id)}
              className={`hover:text-fuchsia-600 text-[#B3B3B3] pt-0.5`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill={`${favoriteClicked && '#D04D55'}`} viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6 hover:text-fuchsia-600 transition">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
      {modal === "favorite" && (
        <>
          <div className="fixed inset-0" onClick={() => setModal("")}/>
          <div
            className="absolute text-center bg-black text-xs sm:text-sm border-2 border-gray-500 p-1 rounded-md text-white bottom-8 transform max-w-[160px] z-50">
            <h2 className="text-xl font-bold mb-2">Log in</h2>
            <p>Log in to add an posts you like to favorites</p>
            <button
              className="mt-2 px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300">
              Go!
            </button>
          </div>
        </>
      )}
      </div>
      <div className='flex flex-1 justify-center'>
      <a href={downloadFileUrl}
         className={`py-[3px] px-[5px] hover:text-fuchsia-600 text-[#B3B3B3] pt-0.5`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      </a>
      </div>
    </>
  )
}

export default FileButtons;