import { FileDTO } from "@/api/dto/file.dto";
import { getPublicFiles } from "@/api/public";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser } from "@/api/user";
import React from "react";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import { cookies } from "next/headers";
import SearchPost from "@/components/public/SearchPost";
import LoadMore from "@/components/load-more";

export default async function Home() {
  const selectedSortCookie = cookies().get("selectedSortPublic")?.value;
  let filesPublic: FileDTO[] = await getPublicFiles("", 1, selectedSortCookie);
  const user: UserDTO = await getUser();

  return (
    <>
      <div className="flex m-2 mx-[5px] justify-between">
        <SearchPost />
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType="public" />
      </div>
      <LoadMore page={'public'} selectedSortCookie={selectedSortCookie} initialFilesPublic={filesPublic} user={user} />
    </>
  );
}