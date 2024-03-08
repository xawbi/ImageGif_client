import { FileDTO } from "@/api/dto/file.dto";
import MasonryClient from "@/components/MasonryClient";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser, getUserPublic } from "@/api/user";
import { redirect } from "next/navigation";
import PublicFiles from "@/components/public/PublicFiles";
import UpdateViewsButton from "@/components/public/UpdateViewsButton";
import React from "react";
import { getUserPublicFiles } from "@/api/public";

export type Props = {
  params: {
    slug: string
    username: string
  }
}

export async function generateMetadata({ params: { slug, username } }: Props) {
  const userPublic: UserDTO = await getUserPublic(+slug);
  if (!userPublic) {
    redirect("/error");
  }
  return {
    title: userPublic.username + " - " + "ImageGif"
  };
}

export default async function userPage({ params: { slug } }: Props) {
  // const favoritesPublic: FavoritesDTO[] = await getFavoritesPublic(+slug[0])
  const userFilesPublic: FileDTO[] = await getUserPublicFiles(+slug, 1, "popular");
  const userPublic: UserDTO = await getUserPublic(+slug);
  const user: UserDTO = await getUser();

  if (user && (userPublic.id === user.id)) redirect("/profile");

  return (
    <>
      <div className="px-3 md:px-0 mt-2">
        <MasonryClient>
          {userFilesPublic && userFilesPublic.map((file) => {
            return (
              <UpdateViewsButton key={file.id} fileId={file.id}>
                <PublicFiles file={file} user={user} />
              </UpdateViewsButton>
            );
          })}
        </MasonryClient>
      </div>
    </>
  );
}