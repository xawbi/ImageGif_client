import {redirect} from "next/navigation";
import { checkBan, checkVerify } from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import { cookies } from "next/headers";
import React from "react";
import { getUser } from "@/api/user";
import { getPublicFiles, getUserPublicFiles } from "@/api/public";
import LoadMore from "@/components/load-more";

export default async function Public() {
  if (!checkVerify()) redirect('/auth')
  if (await checkBan()) redirect('/ban')

  const selectedSortCookie = cookies().get("selectedProfilePublic")?.value;
  const user = await getUser()
  const userFilesPublic: FileDTO[] = await getPublicFiles(user.id, '', selectedSortCookie, 1);

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='profilePublic'/>
        <ChooseFileBtn/>
      </div>
      <div className='px-3 md:px-0'>
        {userFilesPublic && userFilesPublic.length > 0 ?
          <LoadMore page={'publicUser'} selectedSortCookie={selectedSortCookie} initialFilesPublic={userFilesPublic} user={user} />
          :
          <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mt-10 text-gray-400 font-medium'>
            You don&apos;t have any posts yet.
          </p>
        }
      </div>
    </>
  )
}