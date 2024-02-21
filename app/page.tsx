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

export default async function Home() {

  const selectedSortCookie = cookies().get("selectedSortPublic")?.value;
  const filesPublic: FileDTO[] = await getPublicFiles('', selectedSortCookie);
  const user: UserDTO = await getUser();

  return (
    <>
      <div className='flex m-2 justify-between'>
        <button
          className="text-white hover:bg-[#202333] py-1 px-3 rounded-2xl border-2 border-gray-500 lg:text-base text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
               className="inline-block w-4 h-4 mr-1.5 mb-1">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          Search
        </button>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='public'/>
      </div>
      <div>
        <MasonryClient>
          {filesPublic && filesPublic.map((file) =>
            <UpdateViewsButton key={file.id} fileId={file.id}>
              <PublicFiles file={file} user={user} />
            </UpdateViewsButton>
          )}
        </MasonryClient>
      </div>
    </>
  );
}
