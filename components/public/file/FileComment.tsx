"use client";
import { FC, useState } from "react";
import { UserDTO } from "@/api/dto/user.dto";
import { CommentType } from "@/api/dto/comment.dto";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { deleteComment } from "@/api/comment";
import InputComment from "@/components/public/file/InputComment";
import { FileDTO } from "@/api/dto/file.dto";
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

  const renderReplies = (comments: CommentType[]) => {
    return comments.map((reply) => (
      <FileComment key={reply.id} comment={reply} user={user} file={file} level={1} />
    ));
  }

  const handleDeleteComment = async () => {
    if (user.role == "admin" || comment.user.id === user.id) {
      await deleteComment(comment.id);
    }
  }

  return (
    <div>
          <div key={comment.id} className={`flex items-start mb-4 pl-${level && level * 12}`} onMouseEnter={() => setIsHoveredComment(true)}
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
                <p className="text-gray-500">{timeAgo} ago</p>
                {isHoveredComment && (user.role == "admin" || comment.user.id === user.id) &&
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
              <div className="flex items-center space-x-2">
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
                <button className="pl-1 text-gray-400 hover:text-white" onClick={() => setIsReplying(!isReplying)}>Reply
                </button>
                {!comment.parentComment && comment.childCommentsCount > 0 && (
                  <button className="pl-1 text-gray-400 hover:text-white" onClick={() => setShowReplies(!showReplies)}>
                    {showReplies ? 'Hide Replies' : `Show ${comment.childCommentsCount} Replies`}
                  </button>
                )}
              </div>
            </div>
          </div>
          {isReplying && (
            <div className={`pl-${level ? 24 : 12}`}>
              <InputComment
                user={user}
                file={file}
                commentParent={comment}
                onCancelComment={() => setIsReplying(false)}
              />
            </div>
          )}
      {showReplies && (
        <div>
          {renderReplies(comment.childComments)}
        </div>
      )}
    </div>
  );
};

export default FileComment;