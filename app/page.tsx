import {FileDTO} from "@/api/dto/file.dto";
import {getPublicFiles} from "@/api/public";
import {UserDTO} from "@/api/dto/user.dto";
import {getUser} from "@/api/user";
import PublicGalleryFiles from "@/components/public/PublicGalleryFiles";

export default async function Home() {

  const filesPublic: FileDTO[] = await getPublicFiles()
  const user: UserDTO = await getUser()

  return (
    <>
      {/*<ul className='my-columns mb-4 mt-5 pb-4 mx-3 sm:mx-2 md:mx-0 lg:mx-0'>*/}
      <PublicGalleryFiles filesPublic={filesPublic} user={user}/>
      {/*</ul>*/}
    </>
  )
}
