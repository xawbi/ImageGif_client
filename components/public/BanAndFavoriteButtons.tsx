"use client";
import { FC, useState } from "react";
import { UserDTO } from "@/api/dto/user.dto";
import { FileDTO } from "@/api/dto/file.dto";
import { updateReject } from "@/api/admin";
import { useRouter } from "next/navigation";
import { postFavorites } from "@/api/file";

interface PublicFileProps {
  user: UserDTO;
  file: FileDTO;
}

export const BanAndFavoriteButtons: FC<PublicFileProps> = ({ user, file }) => {
  const router = useRouter()
  const [favoriteClicked, setFavoriteClicked] = useState(
    user && file && file.favorites && file.favorites.some((el) => el.user.id === user.id && el.file.id === file.id)
  )

  const handleBan = async (fileId: number[]) => {
    await updateReject(fileId, "public")
  };

  const handleFavorite = async (fileId: number) => {
    if (user) {
      await postFavorites(fileId)
      setFavoriteClicked(!favoriteClicked)
    } else {
      router.push(`/gallery/${file.id}`)
    }
  }

  return (
    <>
      {user && user.role === "admin" &&
        <button onClick={() => handleBan([file.id])}
                className="absolute truncate overflow-hidden whitespace-nowrap top-1 left-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6 mb-1 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </button>
      }
      <button onClick={() => handleFavorite(file.id)}
        className={`absolute truncate overflow-hidden whitespace-nowrap top-1 right-1 text-center p-1 pt-[5px] px-[5px] opacity-0 ${favoriteClicked && 'opacity-100'} group-hover:opacity-100 transition-opacity duration-300 z-40`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill={`${favoriteClicked && '#D04D55'}`} viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className={`w-6 h-6 hover:text-fuchsia-600 transition`}>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
    </>
  )
}