import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import {getUserFiles} from "@/api/file";
import UserFiles from "@/components/profile/UserFiles";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";
import MasonryClient from "@/components/MasonryClient";
import { getDevicePixels } from "@/components/getDeviceType";

export default async function Public() {
  if (!checkVerify()) redirect('/auth')

  const userFiles: FileDTO[] = await getUserFiles('public')

  return (
    <>
      <div className='flex m-2 justify-end'>
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