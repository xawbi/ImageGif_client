"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { UserDTO } from "@/api/dto/user.dto";
import Link from "next/link";
import { postComment } from "@/api/comment";
import { FileDTO } from "@/api/dto/file.dto";
import { CommentDto, CommentType } from "@/api/dto/comment.dto";

interface filePageProps {
  user: UserDTO;
  file: FileDTO;
  commentParent?: CommentType
  onCancelComment?: () => void
}

const InputComment: FC<filePageProps> = ({ user, file, commentParent, onCancelComment }) => {
  const [comment, setComment] = useState("");
  const commentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    const lineBreaks = (newComment.match(/\n/g) || []).length;
    if (lineBreaks <= 5) {
      setComment(newComment);
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const handlePostButtonClick = async () => {
    if (comment.length <= 500) {
      const obj: CommentDto = {
        text: comment.trim(),
        fileId: file.id,
        parentCommentId: commentParent && commentParent.id as number | undefined
      };
      await postComment(obj);
      setComment('')
      onCancelComment && onCancelComment()
      if (commentTextareaRef.current) {
        commentTextareaRef.current.blur();
      }
    }
  };

  const disabled = comment.length > 500 || comment.trim().length == 0

  return (
    <>
      <div className="my-4 relative flex items-start flex-wrap">
        {user ? (
          <>
            <div className="flex w-full items-center">
            <textarea
              ref={commentTextareaRef}
              id="commentTextarea"
              placeholder="Write a comment..."
              className={`w-full p-2 border-2 border-gray-500 rounded bg-gray-950 ${comment.length > 500 && 'text-red-500'}`}
              style={{ whiteSpace: "pre-wrap", resize: "none", overflow: "hidden" }}
              value={comment}
              onChange={handleTextareaChange}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  await handlePostButtonClick();
                }
              }}
            />
              {comment.length > 300 && (
                <div className="absolute bottom-0 right-2 text-gray-400">
                  {comment.length <= 500
                    ? `${comment.length}`
                    : `-${comment.length - 500}`}
                </div>
              )}
              <button
                className={`ml-2 px-2 py-1 bg-emerald-600 text-white rounded-md ${!disabled && 'hover:bg-emerald-800'} ${disabled && 'bg-neutral-600'} h-10`}
                onClick={handlePostButtonClick}
                disabled={disabled}
              >
                Post
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Sign in to leave a comment"
              className="w-full p-2 border-2 border-gray-500 rounded bg-gray-950"
              disabled
            />
            <div className="absolute top-0 right-2 flex items-center h-full">
              <Link href={"/auth"}>
                <button
                  className="ml-2 px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none">
                  Log in
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InputComment;