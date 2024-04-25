import { FileDTO } from "@/api/dto/file.dto";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser, getUserPublic } from "@/api/user";
import { redirect } from "next/navigation";
import React from "react";
import { getPublicFiles, getUserPublicFiles } from "@/api/public";
import LoadMore from "@/components/load-more";
import { checkBan } from "@/api/checkVerify";

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
  const userFilesPublic: FileDTO[] = await getPublicFiles(slug, '', 'newest', 1);
  const userPublic: UserDTO = await getUserPublic(+slug);
  const user: UserDTO = await getUser();

  if (user && (userPublic.id === user.id)) redirect("/profile");

  return (
    <>
      <div className="px-3 md:px-0 mt-2">
        {userFilesPublic && userFilesPublic.length > 0 ?
          <LoadMore page={'userPubic'} initialFilesPublic={userFilesPublic} user={user} userId={userPublic.id} />
        :
          <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mt-10 text-gray-400 font-medium'>
            User {userPublic.username} doesn&apos;t have any posts yet.
          </p>
        }
      </div>
    </>
  );
}