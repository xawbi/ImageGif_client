import { FC } from "react";
import { FileDTO } from "@/api/dto/file.dto";
import Image from "next/image";
import AdminFilesButton from "@/components/admin/AdminFilesButton";

interface AdminProps {
  file: FileDTO;
}

const AdminFiles: FC<AdminProps> = ({ file }) => {
  const fileUrl = process.env.NEXT_PUBLIC_HOST + "/uploads/" + `${file.user.id}/` + file.fileName;

  return (
    <>
      <div key={file.id}
          className="relative overflow-hidden pb-[100%] mb-1 cursor-pointer border-2 border-gray-500 group transform hover:scale-105 transition-transform duration-250"
      >
        <AdminFilesButton file={file}/>
        <Image width={file.width}
               height={file.height}
               src={fileUrl}
               alt={`${file.fileName}`}
               sizes='100vh'
               loading={"lazy"}
               className="absolute rounded-sm w-full h-full object-cover overflow-hidden"
        />
        <p title={`${file.fileName}`}
           className="absolute truncate overflow-hidden whitespace-nowrap left-0 bottom-0 right-0 bg-black text-white text-center py-1 px-2 pr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-t-2 border-gray-500">
          {file.fileName}
        </p>
      </div>
    </>
  );
};

export default AdminFiles;