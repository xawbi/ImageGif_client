import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import {getUserFiles} from "@/api/file";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import MasonryClient from "@/components/MasonryClient";
import UserFiles from "@/components/profile/UserFiles";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import { cookies } from "next/headers";
import LoadMore from "@/components/load-more";
import React from "react";

export default async function Sent() {
  if (!checkVerify()) redirect('/auth')

  const selectedSortCookie = cookies().get("selectedSort")?.value;
  const userFiles: FileDTO[] = await getUserFiles('sent', 1, selectedSortCookie);

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <DropdownSortBtn pageType='profile' selectedSortCookie={selectedSortCookie}/>
        <ChooseFileBtn/>
      </div>
      {userFiles && userFiles.length > 0 ?
        <LoadMore page={'profile'} pageFilter={'pending'} selectedSortCookie={selectedSortCookie} initialFilesPublic={userFiles} />
        :
        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mt-10 text-gray-400 font-medium'>
          There are no files with a pending status.
        </p>
      }
    </>
  )
}