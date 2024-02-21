import { FileDTO } from "@/api/dto/file.dto";
import Image from "next/image";
import { UserDTO } from "@/api/dto/user.dto";
import { BanAndFavoriteButtons } from "@/components/public/BanAndFavoriteButtons";
import Link from "next/link";
import LikeAndDislikeButtons from "@/components/public/LikeAndDislikeButtons";
import UpdateViewsButton from "@/components/public/UpdateViewsButton";

interface HomeProps {
  file: FileDTO;
  user: UserDTO;
}

function PublicFiles ({ file, user }: HomeProps) {
  const fileUrl = process.env.NEXT_PUBLIC_HOST + "/uploads/" + `${file.user.id}/` + file.fileName;
  const downloadFileUrl = process.env.NEXT_PUBLIC_HOST + "/public/download/" + `${file.user.id}/` + file.fileName;

  return (
    <>
      <div
        className={`mb-3 cursor-pointer border-2 border-gray-500 group transform hover:scale-[1.02] sm:hover:scale-[1.04] transition-transform duration-250`}>
        <BanAndFavoriteButtons user={user} file={file} />
        <Link href={`gallery/${file.id}`} scroll={true} className="flex justify-center">
          <Image width={file.width}
                 height={file.height}
                 src={fileUrl}
                 alt={`${file.postName}`}
                 loading={"lazy"}
                 className="rounded-sm min-w-[150px] min-h-[150px] justify-center"
          />
        </Link>
        <div className="flex justify-around px-4 border-t-2 border-gray-500">
          <LikeAndDislikeButtons user={user} file={file} pagesType={"homePageFile"} />
        </div>
      </div>
    </>
  );
}

export default PublicFiles;