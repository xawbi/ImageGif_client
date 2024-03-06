import { FileDTO } from "@/api/dto/file.dto";
import Image from "next/image";
import { UserDTO } from "@/api/dto/user.dto";
import { BanAndFavoriteButtons } from "@/components/public/BanAndFavoriteButtons";
import Link from "next/link";
import LikeAndDislikeButtons from "@/components/public/LikeAndDislikeButtons";

interface HomeProps {
  file: FileDTO
  user: UserDTO
  favorites?: string
}

function PublicFiles ({ file, user, favorites }: HomeProps) {
  const fileUrl = process.env.NEXT_PUBLIC_HOST + "/uploads/" + `${file.user.id}/` + file.fileName;
  const host = process.env.NEXT_IMAGEGIF_HOST

  return (
    <>
      <div
        className={`mb-3 cursor-pointer border-2 border-gray-500 group transform hover:scale-[1.02] sm:hover:scale-[1.04] transition-transform duration-250 rounded`}>
        <BanAndFavoriteButtons user={user} file={file} favorites={favorites}/>
        <Link href={`${host}/gallery/${file.id}`} scroll={true} className="flex justify-center">
          <Image width={file.width}
                 height={file.height}
                 src={fileUrl}
                 alt={`${file.postName}`}
                 loading={"lazy"}
                 className="rounded-t min-w-[150px] min-h-[150px] justify-center"
          />
        </Link>
        <p title={`${file.fileName}`}
           className="absolute truncate overflow-hidden whitespace-nowrap left-0 bottom-8 right-0 backdrop-blur-sm bg-black/30 text-white text-center pb-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {file.postName}
        </p>
        <div className="flex justify-around px-4 border-t-2 border-gray-500">
          <LikeAndDislikeButtons user={user} file={file} pagesType={"homePageFile"} host={host}/>
        </div>
      </div>
    </>
  );
}

export default PublicFiles;