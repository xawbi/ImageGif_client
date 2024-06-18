import { FileDTO } from "@/api/dto/file.dto";
import { getPublicFiles } from "@/api/public";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser } from "@/api/user";
import React, { Suspense } from "react";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import { cookies } from "next/headers";
import SearchPost from "@/components/public/SearchPost";
import LoadMore from "@/components/load-more";
import { checkBan } from "@/api/checkVerify";
import { redirect } from "next/navigation";
import Footer from "@/components/footer/Footer";
import LoadingPublic from "@/components/public/LoadingPublic";

export default async function Page() {
  if (await checkBan()) redirect('/ban')
  const selectedSortCookie = cookies().get("selectedSortPublic")?.value
  let filesPublic: FileDTO[] = await getPublicFiles('', '', selectedSortCookie, 1)
  const user: UserDTO = await getUser()

  return (
    <>
      <Suspense fallback={<LoadingPublic/>}>
        <div className="flex m-2 mx-[5px] justify-between">
          <SearchPost />
          <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType="public" />
        </div>
        <LoadMore page={'public'} selectedSortCookie={selectedSortCookie} initialFilesPublic={filesPublic} user={user} />
        <Footer/>
      </Suspense>
    </>
  );
}