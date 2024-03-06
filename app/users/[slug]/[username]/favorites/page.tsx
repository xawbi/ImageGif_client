import { FavoritesDTO } from "@/api/dto/file.dto";
import MasonryClient from "@/components/MasonryClient";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser, getUserPublic } from "@/api/user";
import { redirect } from "next/navigation";
import React from "react";
import PublicFiles from "@/components/public/PublicFiles";
import { getFavoritesPublic } from "@/api/favorite";

export type Props = {
  params: {
    slug: string
    username: string
  }
}

export async function generateMetadata({ params: { slug, username } }: Props) {
  const userPublic: UserDTO = await getUserPublic(+slug[0])
  if (userPublic && +slug !== userPublic.id) {
    redirect('/error')
  }
  return {
    title: userPublic.username + ' - ' + 'ImageGif',
  }
}

export default async function userPage({ params: { slug } }: Props) {
  const favoritesPublic: FavoritesDTO[] = await getFavoritesPublic(+slug[0])
  const userPublic: UserDTO = await getUserPublic(+slug)
  const user: UserDTO = await getUser()

  if (user && (userPublic.id === user.id)) redirect('/profile')
  if (!userPublic.openFavorites) redirect('/error')

  return (
    <>
      <div className='px-3 md:px-0 mt-2'>
        <MasonryClient>
          {favoritesPublic && favoritesPublic.map((file) => {
            return (
              <div key={file.id}>
                <PublicFiles file={file.file} user={user} favorites={'public'}/>
              </div>
            )
          })}
        </MasonryClient>
      </div>
    </>
  )
}