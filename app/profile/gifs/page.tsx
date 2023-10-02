import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import UserFiles from "@/components/profile/UserFiles";
import {getUserFile, updateUserRestricted} from "@/api/file";
import ProfileGalleryFiles from "@/components/profile/ProfileGalleryFiles";

export default async function Gifs() {
  if (!checkVerify()) redirect('/auth')

  const userFiles: FileDTO[] = await getUserFile('gifs')

  return (
    <>
      <ProfileGalleryFiles userFiles={userFiles}/>
    </>
  )
}