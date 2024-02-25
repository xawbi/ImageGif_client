import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import { FavoritesDTO } from "@/api/dto/file.dto";
import UserFiles from "@/components/profile/UserFiles";
import { getFavorites } from "@/api/file";
import MasonryClient from "@/components/MasonryClient";

export default async function Gifs() {
  if (!checkVerify()) redirect('/auth')

  const favorites: FavoritesDTO[] = await getFavorites()

  return (
    <>
      <div className='px-3 md:px-0 mt-2'>
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