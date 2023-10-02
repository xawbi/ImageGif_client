import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import {FileDTO} from "@/api/dto/file.dto";
import {getUserFile} from "@/api/file";
import ProfileGalleryFiles from "@/components/profile/ProfileGalleryFiles";

export default async function Sent() {
  if (!checkVerify()) redirect('/auth')

  const userFiles: FileDTO[] = await getUserFile('sent')

  return (
    <>
      <ProfileGalleryFiles userFiles={userFiles}/>
    </>
  )
}