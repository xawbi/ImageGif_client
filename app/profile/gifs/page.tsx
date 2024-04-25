import {redirect} from "next/navigation";
import { checkBan, checkVerify } from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import UserFiles from "@/components/profile/UserFiles";
import {getUserFiles} from "@/api/file";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import MasonryClient from "@/components/MasonryClient";
import { cookies } from "next/headers";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import React from "react";
import LoadMore from "@/components/load-more";

export default async function Gifs() {
  if (!checkVerify()) redirect('/auth')
  if (await checkBan()) redirect('/ban')

  const selectedSortCookie = cookies().get("selectedSort")?.value;
  const userFiles: FileDTO[] = await getUserFiles('gifs', 1, selectedSortCookie);

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='profile'/>
        <ChooseFileBtn/>
      </div>
      {userFiles && userFiles.length > 0 ?
        <LoadMore page={'profile'} pageFilter={'gifs'} selectedSortCookie={selectedSortCookie} initialFilesPublic={userFiles} />
        :
        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mt-10 text-gray-400 font-medium'>
          You haven&apos;t uploaded any GIFs yet.
        </p>
      }
    </>
  )
}