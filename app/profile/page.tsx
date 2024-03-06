import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {getUserFiles} from "@/api/file";
import {FileDTO} from "@/api/dto/file.dto";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import MasonryClient from "@/components/MasonryClient";
import UserFiles from "@/components/profile/UserFiles";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import { cookies } from "next/headers";

export default async function Profile() {
  if (!checkVerify()) redirect('/auth')

  const selectedSortCookie = cookies().get("selectedSort")?.value;
  const userFiles: FileDTO[] = await getUserFiles('', selectedSortCookie);

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='profile'/>
        <ChooseFileBtn/>
      </div>
      <div>
        <MasonryClient>
          {userFiles && userFiles.map((file) => {
            return (
              <div key={file.id}>
                <UserFiles file={file}/>
              </div>
            )
          })}
        </MasonryClient>
      </div>
    </>
  )
}