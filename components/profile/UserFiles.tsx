import {FileDTO} from "@/api/dto/file.dto";
import Image from "next/image";
import StatusButton from "@/components/profile/StatusButton";
import { UserDTO } from "@/api/dto/user.dto";
import MasonryClient from "@/components/MasonryClient";
import Link from "next/link";

interface ProfileProps {
  files: FileDTO[]
  user?: UserDTO
}

function UserFiles({files}: ProfileProps) {

  return (
    <>
      <MasonryClient filesLength={20}>
        {files && files.map((file, index) => {
          const fileUrl = process.env.NEXT_PUBLIC_HOST + '/uploads/' + `${file.user.id}/` + file.fileName;
          return (
              <div key={file.id} className={`flex justify-center mb-3 cursor-pointer border-2 border-gray-500 ${file.reject && 'hover:border-red-500'} group transform hover:scale-[1.02] md:hover:scale-[1.04] transition-transform duration-250 rounded`}>
                <StatusButton file={file}/>
                {file.restricted === 'public' &&
                  <>
                    <Link href={`/gallery/${file.id}`} className="absolute w-full h-full z-10" scroll={false}/>
                    <div
                      className={`ml-0.5 text-white absolute truncate overflow-hidden whitespace-nowrap top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                           className="w-4 h-4 inline-block mb-0.5"
                           style={{ filter: "drop-shadow(1px 0 1px #000) drop-shadow(0 1px 1px #000)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      <p className="text-sm inline-block ml-0.5"
                         style={{ textShadow: "1px 0 1px #000, 0 1px 1px #000, -1px 0 1px #000, 0 -1px 1px #000" }}>{file.views}</p>
                    </div>
                  </>
                }
                  <Image width={file.width}
                         height={file.height}
                         src={fileUrl}
                         alt={`${file.fileName}`}
                         loading={'lazy'}
                         className="min-w-[150px] min-h-[150px] justify-center rounded"
                         unoptimized={file.fileName.split('.').pop() === 'gif'}
                  />
              </div>
            )
        })}
      </MasonryClient>
    </>
  )
}

export default UserFiles