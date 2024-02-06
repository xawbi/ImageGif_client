import {FC} from 'react'
import {FileDTO} from "@/api/dto/file.dto";
import Image from "next/image";
import StatusButton from "@/components/profile/StatusButton";
import { useModalProfilePost } from "@/store/useModalProfilePost";

interface ProfileProps {
  file: FileDTO
  favorites?: boolean
}

const UserFiles: FC<ProfileProps> = ({file, favorites}) => {
  const fileUrl = process.env.NEXT_PUBLIC_HOST + '/uploads/' + `${file.user.id}/` + file.fileName
  const downloadFileUrl = process.env.NEXT_PUBLIC_HOST + '/public/download/' + `${file.user.id}/` + file.fileName

  return (
    <>
      <div className={`flex justify-center mb-3 cursor-pointer border-2 border-gray-500 ${file.reject && 'hover:border-red-500'} group transform hover:scale-[1.02] sm:hover:scale-[1.04] transition-transform duration-250`}>
        <StatusButton file={file} favorites={favorites}/>
        <Image width={file.width}
               height={file.height}
               src={fileUrl}
               alt={`${file.fileName}`}
               loading={"lazy"}
               className="rounded-sm min-w-[150px] min-h-[150px] justify-center"
        />
      </div>
    </>
  )
}

export default UserFiles