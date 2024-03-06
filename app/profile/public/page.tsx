import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import {getUserFiles} from "@/api/file";
import UserFiles from "@/components/profile/UserFiles";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import MasonryClient from "@/components/MasonryClient";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import { cookies } from "next/headers";
import PublicFiles from "@/components/public/PublicFiles";
import React from "react";
import { getUser } from "@/api/user";
import { getUserPublicFiles } from "@/api/public";

export default async function Public() {
  if (!checkVerify()) redirect('/auth')

  const selectedSortCookie = cookies().get("selectedProfilePublic")?.value;
  const user = await getUser()
  const userFilesPublic: FileDTO[] = await getUserPublicFiles(user.id, selectedSortCookie);

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='profilePublic'/>
        <ChooseFileBtn/>
      </div>
      <div className='px-3 md:px-0'>
        <MasonryClient>
          {userFilesPublic && userFilesPublic.map((file) => {
            return (
              <div key={file.id}>
                <PublicFiles file={file} user={user}/>
              </div>
            )
          })}
        </MasonryClient>
      </div>
    </>
  )
}