import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import { FavoritesDTO } from "@/api/dto/file.dto";
import MasonryClient from "@/components/MasonryClient";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser } from "@/api/user";
import { cookies } from "next/headers";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import PublicFiles from "@/components/public/PublicFiles";
import React from "react";
import { getFavorites } from "@/api/favorite";

export default async function Gifs() {
  if (!checkVerify()) redirect('/auth')

  const selectedSortCookie = cookies().get("selectedProfilePublic")?.value;
  const favorites: FavoritesDTO[] = await getFavorites(selectedSortCookie)
  const user: UserDTO = await getUser()

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='profilePublic'/>
        <ChooseFileBtn/>
      </div>
      <div className='px-3 md:px-0'>
        <MasonryClient>
          {favorites && favorites.map((file) => {
            return (
              <div key={file.id}>
                <PublicFiles file={file.file} user={user} favorites={'user'}/>
              </div>
            )
          })}
        </MasonryClient>
      </div>
    </>
  )
}