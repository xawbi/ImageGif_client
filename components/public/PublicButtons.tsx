'use client'
import { FC } from "react";
import { UserDTO } from "@/api/dto/user.dto";
import { FileDTO } from "@/api/dto/file.dto";
import { updateReject } from "@/api/admin";

interface PublicFileProps {
  user: UserDTO
  file: FileDTO
}

const PublicButtons: FC<PublicFileProps> = ({user, file}) => {
  const handleBan = (fileId: number[]) => {
    updateReject && updateReject(fileId, 'public')
  }

  return (
    <>
      {user && user.role === 'admin' &&
        <button onClick={() => handleBan([file.id])} className='absolute truncate overflow-hidden whitespace-nowrap top-1 left-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6 mb-1 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
          </svg>
        </button>
      }
    </>
  );
};

export default PublicButtons;