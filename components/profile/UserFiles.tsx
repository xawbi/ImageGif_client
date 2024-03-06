import {FC} from 'react'
import {FileDTO} from "@/api/dto/file.dto";
import Image from "next/image";
import StatusButton from "@/components/profile/StatusButton";
import { BanAndFavoriteButtons } from "@/components/public/BanAndFavoriteButtons";
import { UserDTO } from "@/api/dto/user.dto";

interface ProfileProps {
  file: FileDTO
  user?: UserDTO
  userPublic?: boolean
}

const UserFiles: FC<ProfileProps> = ({file, user, userPublic}) => {
  const fileUrl = process.env.NEXT_PUBLIC_HOST + '/uploads/' + `${file.user.id}/` + file.fileName

  return (
    <>
      <div className={`flex justify-center mb-3 cursor-pointer border-2 border-gray-500 ${file.reject && 'hover:border-red-500'} group transform hover:scale-[1.02] sm:hover:scale-[1.04] transition-transform duration-250 rounded`}>
        {!userPublic &&
          <>
            <StatusButton file={file}/>
            <BanAndFavoriteButtons user={user} file={file}/>
          </>
        }
        <Image width={file.width}
               height={file.height}
               src={fileUrl}
               alt={`${file.fileName}`}
               loading={"lazy"}
               className="min-w-[150px] min-h-[150px] justify-center rounded"
        />
      </div>
    </>
  )
}

export default UserFiles