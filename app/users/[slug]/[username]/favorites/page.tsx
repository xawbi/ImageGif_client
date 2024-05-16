import { FileDTO } from "@/api/dto/file.dto";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser, getUserPublic } from "@/api/user";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { getFavoritesPublic } from "@/api/favorite";
import LoadMore from "@/components/load-more";

export type Props = {
  params: {
    slug: string
    username: string
  }
}

export default async function userPage({ params: { slug } }: Props) {
  const favoritesFilesPublic: FileDTO[] = await getFavoritesPublic(+slug, 1)
  const userPublic: UserDTO = await getUserPublic(+slug)
  const user: UserDTO = await getUser()

  if (user && (userPublic.id === user.id)) redirect('/profile')
  if (userPublic && !userPublic.openFavorites) notFound()

  return (
    <>
      <div className='px-3 md:px-0 mt-2'>
        {favoritesFilesPublic && favoritesFilesPublic.length > 0 ?
          <LoadMore page={'favoritesPubic'} initialFilesPublic={favoritesFilesPublic} user={user} userId={userPublic.id} />
        :
          <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mt-10 text-gray-400 font-medium'>
            User {userPublic.username} doesn&apos;t have any favorites yet.
          </p>
        }
      </div>
    </>
  )
}