import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {getUserFile} from "@/api/file";
import {FileDTO} from "@/api/dto/file.dto";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import SearchButton from "@/components/profile/SearchButton";
import MasonryClient from "@/components/MasonryClient";
import UserFiles from "@/components/profile/UserFiles";

export default async function Profile() {
  if (!checkVerify()) redirect('/auth')

  const userFiles: FileDTO[] = await getUserFile('')

  return (
    <>
      <div className='flex mb-4 justify-between px-3 sm:px-2 md:px-0 lg:px-0'>
        <SearchButton/>
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