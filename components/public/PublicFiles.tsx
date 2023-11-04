import { FC } from "react";
import {FileDTO} from "@/api/dto/file.dto";
import Image from "next/image";
import {UserDTO} from "@/api/dto/user.dto";
import PublicButtons from "@/components/public/PublicButtons";

interface HomeProps {
  file: FileDTO
  user: UserDTO
}

const PublicFiles: FC<HomeProps> = ({file, user}) => {
  const fileUrl = process.env.NEXT_PUBLIC_HOST + '/uploads/' + `${file.user.id}/` + file.fileName
  const downloadFileUrl = process.env.NEXT_PUBLIC_HOST + '/public/download/' + `${file.user.id}/` + file.fileName

  return (
    <>
        <div className={`relative mb-3 cursor-pointer border-2 border-gray-500 group transform hover:scale-[1.02] sm:hover:scale-[1.04] transition-transform duration-250`}>
          <PublicButtons user={user} file={file}/>
          <button
            className='absolute truncate overflow-hidden whitespace-nowrap top-1 right-1 text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 hover:text-fuchsia-600 transition">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
          </button>
          <Image width={file.width}
                 height={file.height}
                 src={fileUrl}
                 alt={`${file.fileName}`}
                 loading={"lazy"}
                 className='rounded-sm'
          />
          <div className='w-[100%] flex justify-around px-4 border-t-2 border-gray-500'>
            <button className='text-center py-[3px] z-50 hover:text-fuchsia-600 text-[#B3B3B3]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="inline-block w-[22px] h-[22px]">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"/>
              </svg>
              <span className="">10</span>
            </button>
            <button className='text-center py-[3px] px-[5px] hover:text-fuchsia-600 z-50 text-[#B3B3B3] text-sm'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-[22px] h-[22px] mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
              </svg>
            </button>
            <button className='text-center py-[3px] px-[5px] hover:text-fuchsia-600 z-50 text-[#B3B3B3]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="inline-block w-[22px] h-[22px]">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"/>
              </svg>
              8
            </button>
          </div>
        </div>
    </>
  )
}

export default PublicFiles