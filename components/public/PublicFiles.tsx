import Image from "next/image";
import { UserDTO } from "@/api/dto/user.dto";
import { BanAndFavoriteButtons } from "@/components/public/BanAndFavoriteButtons";
import Link from "next/link";
import LikeAndDislikeButtons from "@/components/public/LikeAndDislikeButtons";
import UpdateViewsButton from "@/components/public/UpdateViewsButton";
import React from "react";
import { FileDTO } from "@/api/dto/file.dto";
import MasonryClient from "@/components/MasonryClient";

interface HomeProps {
  filesPublic: FileDTO[];
  user?: UserDTO;
  favorites?: string;
  pageLoaded?: number
}

function PublicFiles({ filesPublic, user, favorites }: HomeProps) {

  const host = process.env.NEXT_PUBLIC_IMAGEGIF_HOST

  return (
    <>
      <MasonryClient filesLength={25}>
      {filesPublic && filesPublic.map((file, index) => {
        const fileUrl = process.env.NEXT_PUBLIC_HOST + "/uploads/" + `${file.user.id}/` + file.fileName;
        return (
          <UpdateViewsButton key={file.id} fileId={file.id}>
            <div
              className={`mb-3 cursor-pointer border-2 border-gray-500 group transform hover:scale-[1.02] sm:hover:scale-[1.04] transition-transform duration-250 rounded`}
            >
              <BanAndFavoriteButtons user={user} file={file} favorites={favorites} />
              <Link href={`${host}/gallery/${file.id}`} className="flex justify-center" scroll={false}>
                <Image
                  width={file.width}
                  height={file.height}
                  src={fileUrl}
                  alt={`${file.postName}`}
                  loading={'lazy'}
                  className="rounded-t min-w-[150px] min-h-[150px] justify-center"
                  unoptimized={file.fileName.split('.').pop() === 'gif'}
                />
              </Link>
              <p
                title={`${file.fileName}`}
                className="absolute truncate overflow-hidden whitespace-nowrap left-0 bottom-8 right-0 backdrop-blur-sm bg-black/30 text-white text-center pb-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {file.postName}
              </p>
              <div className="flex justify-around px-4 border-t-2 border-gray-500">
                <LikeAndDislikeButtons user={user} file={file} pagesType={"homePageFile"} />
              </div>
            </div>
          </UpdateViewsButton>
        );
      })}
      </MasonryClient>
    </>
  )
}

export default PublicFiles;