"use client";
import { FC, useState } from "react";
import { postRating } from "@/api/rating";
import { FileDTO } from "@/api/dto/file.dto";
import { UserDTO } from "@/api/dto/user.dto";
import LikeAndDislikeButtons from "@/components/public/LikeAndDislikeButtons";

interface filePageProps {
  file: FileDTO;
  user: UserDTO;
}

const FileButtons: FC<filePageProps> = ({ file, user }) => {
  const downloadFileUrl = process.env.NEXT_PUBLIC_HOST + "/public/download/" + `${file.user.id}/` + file.fileName;
  const [modal, setModal] = useState("");

  const handleFavorites = (favorite: string) => {
    if (user) {
      return console.log("add favorites");
    } else {
      setModal(favorite);
    }
  };

  return (
    <>
      <LikeAndDislikeButtons user={user} file={file} pagesType={'slugPageFile'}/>
      <div className='flex flex-1 justify-center'>
      <button onClick={() => handleFavorites("favorite")}
              className={`hover:text-fuchsia-600 text-[#B3B3B3] pt-0.5`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6 hover:text-fuchsia-600 transition">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
      {modal === "favorite" && (
        <>
          <div className="fixed inset-0" onClick={() => setModal("")}/>
          <div
            className="absolute bg-black border-2 border-gray-500 p-4 rounded-md text-white top-[-160px] left-[50%] transform translate-x-[-50%] w-60">
            <h1 className="text-xl font-bold mb-2 text-center">Log in</h1>
            <p className="text-center">Log in to add an posts you like to favorites</p>
            <button
              className="ml-[calc(50%-25px)] mt-2 px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300">
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
  );
};

export default FileButtons;