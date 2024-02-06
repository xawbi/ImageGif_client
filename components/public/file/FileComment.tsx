"use client";
import { FC, useState } from "react";
import { UserDTO } from "@/api/dto/user.dto";
import { CommentType } from "@/api/dto/comment.dto";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { deleteComment } from "@/api/comment";
import InputComment from "@/components/public/file/InputComment";
import { FileDTO } from "@/api/dto/file.dto";
import iconReply from "@/public/icon/iconReply.png";
import defaultAvatar from "@/public/defaultAvatar.png";
import LikeAndDislikeButtons from "@/components/public/LikeAndDislikeButtons";

interface filePageProps {
  comment: CommentType;
  user: UserDTO;
  file: FileDTO;
  level?: number;
}

const FileComment: FC<filePageProps> = ({ comment, user, file, level }) => {
  const commentAvatar = comment.user.avatar?.[0];
  const avatarUrl = commentAvatar
    ? process.env.NEXT_PUBLIC_HOST + "/avatars/" + `${comment.user.id}/` + commentAvatar.fileName
    : "";
  const scale = 100 / +(commentAvatar?.width || 1);
  const x = -((commentAvatar?.x || 0) as number) * scale;
  const y = -((commentAvatar?.y || 0) as number * scale);
  const commentDate = new Date(comment.createAt);
  const timeAgo = formatDistanceToNow(commentDate);
  const [isHoveredComment, setIsHoveredComment] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const renderReplies = (comments: CommentType[], comment: CommentType) => {
    return comments.map((reply: CommentType) => (
      reply.parentComment.id == comment.id && comment.parentComment == null ?
        <FileComment key={reply.id} comment={reply} user={user} file={file} level={1} />
        : <FileComment key={reply.id} comment={reply} user={user} file={file} level={2} />
    ));
  };

  const handleDeleteComment = async () => {
    if (user.role == "admin" || comment.user.id === user.id) {
      await deleteComment(comment.id);
    }
  };

  return (
    <div>
      <div key={comment.id} className={`flex items-start mb-4 ${level && 'pl-12'}`}
           onMouseEnter={() => setIsHoveredComment(true)}
           onMouseLeave={() => setIsHoveredComment(false)}>
        <div className="relative overflow-hidden rounded-full w-10 h-10 mr-2 mt-3 flex-shrink-0">
          {comment.user.avatar[0] ?
            <Image
              draggable="false"
              src={avatarUrl}
              alt="Avatar"
              width={1000}
              height={1000}
              loading="lazy"
              style={{
                objectFit: "cover",
                transform: `translate3d(${x}%, ${y}%, 0) scale3d(${scale},${scale},1)`,
                transformOrigin: "top left"
              }}
            />
            :
            <Image
              src={defaultAvatar}
              fill={true}
              alt="aa"
              className={`pointer-events-none`}
            />
          }
        </div>
        <div className="flex-grow bg-gray-900 pl-3 pr-1 py-1.5 rounded hover:bg-gray-800 break-words overflow-hidden">
          <div className="flex items-center">
            <p className="text-white font-bold mr-2 cursor-pointer">{comment.user.username}</p>
            <p className="text-gray-500">{timeAgo} ago</p>
            {level && level == 2 && <>
              <svg className="w-4 h-4 text-gray-400" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M5 10.9a8.7 8.7 0 0 1 6.4-3.6V6a2 2 0 0 1 2.3-2c.4 0 .7.1 1 .3l5.5 4.3a2.1 2.1 0 0 1 0 3.3l-5.5 4.3a2 2 0 0 1-2 .3 2 2 0 0 1-1.2-1.9v-1C6 15 5.2 19 5.2 19.3a1 1 0 0 1-1 .8 1 1 0 0 1-1-.7A10.2 10.2 0 0 1 5 10.9Z" />
              </svg>
              <p className="text-gray-400 ml-0.5">{comment.parentComment.user.username}</p>
            </>}
            {isHoveredComment && (user && (user.role == "admin" || comment.user.id === user.id)) &&
              <button className="ml-auto" onClick={handleDeleteComment} title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-5 h-5 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </button>
            }
          </div>
          <p className="text-white my-1 whitespace-pre-line">
            {comment.text}
          </p>
          <div className="flex space-x-2 text-sm">
            <LikeAndDislikeButtons user={user} file={file} pagesType={'comment'} comment={comment} />
            <div className="flex">
            <button className="ml-1 text-gray-300 hover:text-white p-0.5 px-1 rounded flex flex-center"
                    onClick={() => setIsReplying(!isReplying)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${isReplying ? 'w-[18px] h-[18px]' : 'w-[16px] h-[16px] pt-0.5'}`}>
                <path
                  d={`${isReplying ? 'M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z' : 'M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z'}`} />
              </svg>
              <p className="pl-0.5">Reply</p>
            </button>
            </div>
            {comment.childCommentsCount > 0 && (
              <div className="flex">
              <button className="ml-1 text-gray-300 hover:text-white flex items-center p-0.5 rounded pr-1"
                      onClick={() => setShowReplies(!showReplies)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={4}
                     stroke="currentColor" className="w-4 h-4">
                  <path d={`${!showReplies ? "m19.5 8.25-7.5 7.5-7.5-7.5" : "m4.5 15.75 7.5-7.5 7.5 7.5"}`} />
                </svg>
                <p className="pl-0.5">{!showReplies ? `${comment.childCommentsCount} replies` : "Collapse replies"}</p>
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isReplying && (
        <div className={`${level ? 'pl-24' : 'pl-12'}`}>
          <InputComment
            user={user}
            file={file}
            commentParent={comment}
            onCancelComment={() => setIsReplying(false)}
            isReplying={isReplying}
          />
        </div>
      )}
      {showReplies && (
        <div>
          {renderReplies(comment.childComments, comment)}
        </div>
      )}
    </div>
  );
};

export default FileComment;