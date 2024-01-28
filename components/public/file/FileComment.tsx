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
import defaultAvatar from "@/public/defautAvatar.png";

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
        <div className="flex-grow bg-gray-900 p-3 py-2 rounded hover:bg-gray-800"
             style={{ overflow: "hidden", wordWrap: "break-word" }}>
          <div className="flex items-center">
            <p className="text-white font-bold mr-2 cursor-pointer">{comment.user.username}</p>
            <p className="text-gray-500 mr-1">{timeAgo} ago</p>
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
          <p className="text-white mb-2 mt-2" style={{ whiteSpace: "pre-line" }}>
            {comment.text}
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <button className="flex items-center text-[#B3B3B3] hover:text-fuchsia-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="inline-block w-[18px] h-[18px]">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
              <span>5</span>
            </button>
            <button className="flex items-center text-[#B3B3B3] hover:text-fuchsia-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="inline-block w-[18px] h-[18px]">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
              </svg>
              <span>12</span>
            </button>
            <button className="ml-1 text-gray-300 hover:text-white p-0.5 px-1 rounded flex flex-center"
                    onClick={() => setIsReplying(!isReplying)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${isReplying ? 'w-[18px] h-[18px]' : 'w-[16px] h-[16px] pt-0.5'}`}>
                <path
                  d={`${isReplying ? 'M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z' : 'M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z'}`} />
              </svg>
              <p className="pl-0.5">Reply</p>
            </button>
            {comment.childCommentsCount > 0 && (
              <button className="ml-1 text-gray-300 hover:text-white flex items-center p-0.5 rounded pr-1"
                      onClick={() => setShowReplies(!showReplies)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={4}
                     stroke="currentColor" className="w-4 h-4">
                  <path d={`${!showReplies ? "m19.5 8.25-7.5 7.5-7.5-7.5" : "m4.5 15.75 7.5-7.5 7.5 7.5"}`} />
                </svg>
                <p className="pl-0.5">{!showReplies ? `${comment.childCommentsCount} replies` : "Collapse replies"}</p>
              </button>
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