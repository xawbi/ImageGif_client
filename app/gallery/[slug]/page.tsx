import { FileDTO } from "@/api/dto/file.dto";
import { getFile, getPublicComments } from "@/api/public";
import Image from "next/image";
import FileButtons from "@/components/public/file/FileButtons";
import { SetScroll } from "@/components/public/ScrollComponents";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser } from "@/api/user";
import { CommentType } from "@/api/dto/comment.dto";
import FileComment from "@/components/public/file/FileComment";
import InputComment from "@/components/public/file/InputComment";
import defaultChat from "@/public/defaultChat.png";
import { formatDistanceToNow } from "date-fns";
import CircleAvatar from "@/components/profile-layout/Avatar/CircleAvatar";
import Link from "next/link";

export type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params: { slug } }: Props) {
  const file: FileDTO = await getFile(+slug);
  return {
    title: file.postName + " - " + "ImageGif",
    description: file.postDescription
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const file: FileDTO = await getFile(+slug);
  const comments: CommentType[] = await getPublicComments(+slug);
  const user: UserDTO = await getUser();
  const fileUrl = process.env.NEXT_PUBLIC_HOST + "/uploads/" + `${file.user.id}/` + file.fileName;

  function countComments(comments: any[]): number {
    return comments.reduce(
      (totalCount, comment) => totalCount + 1 + countComments(comment.childComments || []),
      0
    );
  }

  return (
    <>
      <SetScroll>
        <div className="flex flex-wrap">
          <div
            className="w-full xl:w-1/2 xl:mb-0">
            <div className="bg-gradient-to-b from-[#000007] via-[#000007] to-[#00000f]">
              <Image
                width={file.width}
                height={file.height}
                src={fileUrl}
                alt={`${file.fileName}`}
                loading="eager"
                className="object-contain w-full max-h-[calc(100svh-180px)]"
              />
            </div>
            <div className="flex justify-around bg-gray-900 py-1">
              <FileButtons user={user} file={file} />
            </div>
            <div className="mt-2 ml-2 flex items-center">
              <Link href={`/users/${file.user.id}/${file.user.username}`} className='flex items-center'>
                <div className="relative overflow-hidden rounded-full w-8 h-8 mr-1 flex-shrink-0 inline-block border border-gray-500">
                  <CircleAvatar avatarParams={file.user.avatar[0]} />
                </div>
                <span className="text-sm text-gray-300 mr-3">{file.user.username}</span>
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-4 h-4 text-gray-400 inline-block mr-1">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span className="text-sm text-gray-400">{file.views} Views • {formatDistanceToNow(file.restrictedUpdatedAt)}</span>
            </div>
            {file.postDescription &&
              <>
                <div className="whitespace-pre-line pb-6 px-2 bg-black break-words mt-4">
                  {file.postDescription}
                </div>
              </>
            }
          </div>
          {/* Блок с комментариями */}
          <div className="flex-shrink-0 w-full xl:w-1/2 xl:pr-0 px-4 mt-4 xl:mt-0">
            <p className="text-xl sm:text-2xl font-medium">{countComments(comments)} COMMENTS</p>
            <InputComment user={user} file={file} />
            {countComments(comments) === 0 &&
              <div className="text-[#132637] text-center my-20">
                <Image alt="chat" src={defaultChat} width={150} height={150} className="mx-auto" />
                <p className="text-2xl font-medium">Be the first to comment</p>
              </div>
            }
            {comments.map(comment => (
              <FileComment key={comment.id} comment={comment} user={user} file={file} />
            ))}
          </div>
        </div>
      </SetScroll>
    </>
  );
}