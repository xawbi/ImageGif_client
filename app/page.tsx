import { FileDTO } from "@/api/dto/file.dto";
import { getPublicFiles } from "@/api/public";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser } from "@/api/user";
import PublicFiles from "@/components/public/PublicFiles";
import MasonryClient from "@/components/MasonryClient";
import React from "react";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import { cookies } from "next/headers";
import UpdateViewsButton from "@/components/public/UpdateViewsButton";
import SearchPost from "@/components/public/SearchPost";

export default async function Home() {

  const selectedSortCookie = cookies().get("selectedSortPublic")?.value
  const filesPublic: FileDTO[] = await getPublicFiles('', 1, selectedSortCookie)
  const user: UserDTO = await getUser()

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <SearchPost/>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='public'/>
      </div>
      <div>
        <MasonryClient>
          {filesPublic && filesPublic.map((file) =>
            <UpdateViewsButton key={file.id} fileId={file.id}>
              <PublicFiles file={file} user={user}/>
            </UpdateViewsButton>
          )}
        </MasonryClient>
      </div>
    </>
  )
}