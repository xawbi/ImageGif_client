import { FileDTO } from "@/api/dto/file.dto";
import { getFile, getPublicComments, getPublicFileRating } from "@/api/public";
import Image from "next/image";
import FileButtons from "@/components/public/file/FileButtons";
import { SetScroll } from "@/components/public/ScrollComponents";
import { UserDTO } from "@/api/dto/user.dto";
import { getUser } from "@/api/user";
import { CommentType } from "@/api/dto/comment.dto";
import FileComment from "@/components/public/file/FileComment";
import InputComment from "@/components/public/file/InputComment";
import defaultChat from "@/public/defaultChat.png";

export type Props = {
  params: {
    slug: string;
  };
};

export type TypeRatingFile = {
  likeSum: number
  dislikeSum: number
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
            <div className='bg-gradient-to-b from-[#000007] via-[#000007] to-[#00000f]'>
              <Image
                width={file.width}
                height={file.height}
                src={fileUrl}
                alt={`${file.fileName}`}
                loading="eager"
                className="object-contain w-full max-h-[calc(100svh-170px)]"
              />
            </div>
            <div className="flex justify-around bg-gray-900 py-1">
              <FileButtons user={user} file={file} />
            </div>
            {file.postDescription &&
              <>
                <div className="whitespace-pre-line pt-5 pb-10 px-2 bg-black break-words">
                  {file.postDescription}
                </div>
              </>
            }
          </div>
          {/* Блок с комментариями */}
          <div className="flex-shrink-0 w-full xl:w-1/2 xl:pr-0 px-4">
            <p className="text-2xl font-medium">{countComments(comments)} COMMENTS</p>
            <InputComment user={user} file={file} />
            {countComments(comments) === 0 &&
              <div className="text-[#132637] text-center my-20">
                <Image alt="chat" src={defaultChat} width={150} height={150} className="mx-auto"/>
                <p className='text-2xl font-medium'>Be the first to comment</p>
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