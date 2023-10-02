import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import {getUserFile} from "@/api/file";
import UserFiles from "@/components/profile/UserFiles";
import ProfileGalleryFiles from "@/components/profile/ProfileGalleryFiles";

export default async function Public() {
  if (!checkVerify()) redirect('/auth')

  const userFiles: FileDTO[] = await getUserFile('public')

  return (
    <>
      <ProfileGalleryFiles userFiles={userFiles}/>
    </>
  )
}