import { FileDTO } from "@/api/dto/file.dto";
import Image from "next/image";
import { UserDTO } from "@/api/dto/user.dto";
import { BanButton, RatingButtons } from "@/components/public/PublicButtons";
import Link from "next/link";

interface HomeProps {
  file: FileDTO;
  user: UserDTO;
}

function PublicFiles({ file, user }: HomeProps) {
  const fileUrl = process.env.NEXT_PUBLIC_HOST + "/uploads/" + `${file.user.id}/` + file.fileName;
  const downloadFileUrl = process.env.NEXT_PUBLIC_HOST + "/public/download/" + `${file.user.id}/` + file.fileName;

  return (
    <>
      <div
        className={`relative mb-3 cursor-pointer border-2 border-gray-500 group transform hover:scale-[1.02] sm:hover:scale-[1.04] transition-transform duration-250`}>
        <BanButton user={user} file={file} />
        <button
          className="absolute truncate overflow-hidden whitespace-nowrap top-1 right-1 text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6 hover:text-fuchsia-600 transition">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <Link href={`gallery/${file.id}`} scroll={true}>
          <Image width={file.width}
                 height={file.height}
                 src={fileUrl}
                 alt={`${file.fileName}`}
                 loading={"lazy"}
                 className="rounded-sm"
          />
        </Link>
        <div className="w-[100%] flex justify-around px-4 border-t-2 border-gray-500">
          <RatingButtons file={file} user={user} />
        </div>
      </div>
    </>
  );
}

export default PublicFiles;