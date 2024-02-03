'use client'
import { FC } from "react";
import { updatePublic, updateReject } from "@/api/admin";
import { FileDTO } from "@/api/dto/file.dto";
import { useModalProfilePost } from "@/store/useModalProfilePost";

interface AdminFilesProps {
  file: FileDTO;
}

const AdminFilesButton: FC<AdminFilesProps> = ({file}) => {
  const setPostModal = useModalProfilePost(state => state.setPostModal)
  const handleRestricted = (fileId: number[]) => {
    updatePublic && updatePublic(fileId);
  };

  const handleBan = (fileId: number[]) => {
    updateReject && updateReject(fileId, "admin");
  };

  return (
    <>
      <div onClick={() => setPostModal && setPostModal({ postModal: true, file: file, checkModal: 'admin' })} className='absolute w-full h-full z-10'/>
      <button onClick={() => handleBan([file.id])}
              className="absolute truncate overflow-hidden whitespace-nowrap top-1 left-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-6 h-6 mb-1 text-red-500">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </button>
      <button onClick={() => handleRestricted([file.id])}
              className="absolute truncate overflow-hidden whitespace-nowrap top-1 right-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="inline-block w-6 h-6 mr-1 mb-1">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        <p className="inline-block">Post</p>
      </button>
    </>
  );
};

export default AdminFilesButton;