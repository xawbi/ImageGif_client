import {redirect} from "next/navigation";
import { checkBan, checkVerify } from "@/api/checkVerify";
import { FileDTO } from "@/api/dto/file.dto";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser } from "@/api/user";
import { cookies } from "next/headers";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import React from "react";
import { getFavorites } from "@/api/favorite";
import LoadMore from "@/components/load-more";

export default async function Gifs() {
  if (!checkVerify()) redirect('/auth')
  if (await checkBan()) redirect('/ban')

  const selectedSortCookie = cookies().get("selectedProfilePublic")?.value;
  const favorites: FileDTO[] = await getFavorites(1, selectedSortCookie)
  const user: UserDTO = await getUser()

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='profilePublic'/>
        <ChooseFileBtn/>
      </div>
      <div className='px-3 md:px-0'>
        {favorites && favorites.length > 0 ?
          <LoadMore page={'favoritesUser'} initialFilesPublic={favorites} user={user} selectedSortCookie={selectedSortCookie} />
          :
          <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mt-10 text-gray-400 font-medium'>
            Currently, you don&apos;t have any favorites.
          </p>
        }
      </div>
    </>
  )
}