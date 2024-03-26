"use client";
import { FC, useState } from "react";
import { UserDTO } from "@/api/dto/user.dto";
import { FileDTO } from "@/api/dto/file.dto";
import { updateReject } from "@/api/admin";
import { useRouter } from "next/navigation";
import { postFavorites } from "@/api/favorite";

interface PublicFileProps {
  user?: UserDTO;
  file: FileDTO;
  favorites?: string
}

export const BanAndFavoriteButtons: FC<PublicFileProps> = ({ user, file, favorites }) => {
  const router = useRouter();
  const [favoriteClicked, setFavoriteClicked] = useState(
    user && file && file.favorites && file.favorites.some((el) => el.user.id === user.id && el.file.id === file.id)
  );

  const handleBan = async (fileId: number[]) => {
    await updateReject(fileId, "public");
  };

  const handleFavorite = async (fileId: number) => {
    if (user) {
      await postFavorites(fileId);
      setFavoriteClicked(!favoriteClicked);
    } else {
      router.push(`/gallery/${file.id}`);
    }
  };

  return (
    <>
      <div
        className={`ml-0.5 text-white absolute truncate overflow-hidden whitespace-nowrap top-1 ${user && user.role === "admin" && favorites != 'user' ? "left-11" : "left-1"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-4 h-4 inline-block mb-0.5"
             style={{ filter: "drop-shadow(1px 0 1px #000) drop-shadow(0 1px 1px #000)" }}>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <p className="text-sm inline-block ml-0.5"
           style={{ textShadow: "1px 0 1px #000, 0 1px 1px #000, -1px 0 1px #000, 0 -1px 1px #000" }}>{file.views}</p>
      </div>
      {user && user.role === "admin" && favorites !== 'user' &&
        <button onClick={() => handleBan([file.id])}
                className="absolute truncate overflow-hidden whitespace-nowrap top-1 left-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6 mb-1 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </button>
      }
      {favorites && favorites !== 'public' ?
        <button onClick={() => handleFavorite(file.id)}
                className="absolute truncate overflow-hidden whitespace-nowrap top-1 right-1 bg-black text-white text-center p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6 pl-[1px] text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </button>
        :
        <button onClick={() => handleFavorite(file.id)}
                className={`absolute truncate overflow-hidden whitespace-nowrap top-1 right-1 text-center p-1 pt-[5px] px-[5px] opacity-0 ${favoriteClicked && "opacity-100"} group-hover:opacity-100 transition-opacity duration-300 z-40`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill={`${favoriteClicked && "#D04D55"}`} viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor" className={`w-6 h-6 hover:text-fuchsia-600 transition`}>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      }
    </>
  );
};