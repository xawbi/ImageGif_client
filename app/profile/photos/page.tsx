import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import {getUserFile} from "@/api/file";
import UserFiles from "@/components/profile/UserFiles";
import SearchButton from "@/components/profile/SearchButton";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import MasonryClient from "@/components/MasonryClient";

export default async function Photos() {
  if (!checkVerify()) redirect('/auth')

  const userFiles: FileDTO[] = await getUserFile('photos')

  return (
    <>
      <div className='flex mb-4 justify-between px-3 sm:px-2 md:px-0 lg:px-0'>
        <SearchButton/>
        <ChooseFileBtn/>
      </div>
      <div className='px-3 md:px-0'>
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