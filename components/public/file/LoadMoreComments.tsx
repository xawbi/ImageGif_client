"use client";
import { FC, useEffect, useState } from "react";
import { CommentType } from "@/api/dto/comment.dto";
import { getPublicComments } from "@/api/public";
import FileComment from "@/components/public/file/FileComment";
import { UserDTO } from "@/api/dto/user.dto";
import { FileDTO } from "@/api/dto/file.dto";

interface galleryProps {
  fileId: number;
  initialComments: CommentType[];
  user: UserDTO
  file: FileDTO
  commentsLength: number
}

const LoadMoreComments: FC<galleryProps> = ({ fileId, initialComments, user, file, commentsLength }) => {

  const [commentsData, setCommentsData] = useState<CommentType[]>(initialComments)
  const [pageLoaded, setPageLoaded] = useState(1)

  useEffect(() => {
    newFuncInitialComments()
  }, [initialComments])

  const newFuncInitialComments = async () => {
    let loadedTotal = 1
    if (pageLoaded > 1) loadedTotal = 6
    console.log(pageLoaded)
    console.log(loadedTotal)
    const newInitialComments = await getPublicComments(fileId, 1, pageLoaded * 16) ?? [];
    setCommentsData(newInitialComments)
  }

  const loadMoreComments = async () => {
    const nextPage = pageLoaded + 1
    let loadedTotal = 1
    if (nextPage > 1) loadedTotal = 6
    const newComments = await getPublicComments(fileId, nextPage, 16) ?? [];
    setCommentsData((prevComments: CommentType[]) => [...prevComments, ...newComments])
    setPageLoaded(nextPage)
  }

  return (
    <>
      {commentsData.map(comment => (
        <FileComment key={comment.id} comment={comment} user={user} file={file} />
      ))}
      {commentsData.length > 0 && commentsData.length < commentsLength &&
        <div className="flex justify-center items-center my-4">
          <hr className='flex-grow border-2 border-gray-900 mr-1' />
          <button
            onClick={loadMoreComments}
            className="py-2 px-4 bg-black hover:bg-[#090913] border-2 border-gray-900 text-white rounded-md shadow-md transition"
          >
            Load more
          </button>
          <hr className='flex-grow border-2 border-gray-900 ml-1' />
        </div>
      }
    </>
  );
};

export default LoadMoreComments;