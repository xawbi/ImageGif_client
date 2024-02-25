import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import UserFiles from "@/components/profile/UserFiles";
import {getUserFiles} from "@/api/file";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import MasonryClient from "@/components/MasonryClient";
import { cookies } from "next/headers";
import DropdownSortBtn from "@/components/DropdownSortBtn";

export default async function Gifs() {
  if (!checkVerify()) redirect('/auth')

  const selectedSortCookie = cookies().get("selectedSort")?.value;
  const userFiles: FileDTO[] = await getUserFiles('gifs', selectedSortCookie === 'oldest' ? 'oldest' : undefined);

  return (
    <>
      <div className='flex m-2 justify-between'>
        <DropdownSortBtn pageType='profile' selectedSortCookie={selectedSortCookie}/>
        <ChooseFileBtn/>
      </div>
        <MasonryClient>
          {userFiles && userFiles.map((file) => {
            return (
              <div key={file.id}>
                <UserFiles file={file}/>
              </div>
            )
          })}
        </MasonryClient>
    </>
  )
}