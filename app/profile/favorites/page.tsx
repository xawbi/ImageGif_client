import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import { FavoritesDTO, FileDTO } from "@/api/dto/file.dto";
import UserFiles from "@/components/profile/UserFiles";
import { getFavorites, getUserFile } from "@/api/file";
import SearchButton from "@/components/profile/SearchButton";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import MasonryClient from "@/components/MasonryClient";
import { getUser } from "@/api/user";
import { UserDTO } from "@/api/dto/user.dto";

export default async function Gifs() {
  if (!checkVerify()) redirect('/auth')

  const user: UserDTO = await getUser()
  const favorites: FavoritesDTO[] = await getFavorites()

  return (
    <>
      <div className='flex mb-4 justify-between px-3 sm:px-2 md:px-0 lg:px-0'>
        <SearchButton/>
      </div>
      <div className='px-3 md:px-0'>
        <MasonryClient>
          {favorites && favorites.map((favorite) => {
            return (
              <div key={favorite.id}>
                <UserFiles file={favorite.file} favorites={true}/>
              </div>
            )
          })}
        </MasonryClient>
      </div>
    </>
  )
}