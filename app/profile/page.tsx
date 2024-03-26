import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {getUserFiles} from "@/api/file";
import {FileDTO} from "@/api/dto/file.dto";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import { cookies } from "next/headers";
import LoadMore from "@/components/load-more";
import React from "react";

export default async function Profile() {
  if (!checkVerify()) redirect('/auth')

  const selectedSortCookie = cookies().get("selectedSort")?.value;
  const userFiles: FileDTO[] = await getUserFiles('', 1, selectedSortCookie);

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='profile'/>
        <ChooseFileBtn/>
      </div>
      <div>
        {userFiles && userFiles.length > 0 ?
          <LoadMore page={'profile'} pageFilter={'all'} selectedSortCookie={selectedSortCookie} initialFilesPublic={userFiles} />
          :
          <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mt-10 text-gray-400 font-medium'>
            You don&apos;t have any uploaded files.
          </p>
          }
      </div>
    </>
  )
}