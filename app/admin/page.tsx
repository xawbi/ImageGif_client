import {checkAdmin} from "@/api/checkVerify";
import {notFound} from "next/navigation";
import {FileDTO} from "@/api/dto/file.dto";
import {getFilePending} from "@/api/admin";
import AdminFiles from "@/components/admin/AdminFiles";

export default async function Admin() {
  if (!await checkAdmin()) notFound()

  const filesPending: FileDTO[] = await getFilePending()

  return (
    <>
      <ul className='grid pt-5 px-3 sm:px-2 md:px-0 lg:px-0 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {filesPending && filesPending.map((file) => {
          return (
            <>
              <AdminFiles file={file}/>
            </>
          )
        })}
      </ul>
    </>
  )
}