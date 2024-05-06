"use client";
import React, { FC, useEffect, useState } from "react";
import { FileDTO } from "@/api/dto/file.dto";
import Image from "next/image";
import { updateUserRestricted } from "@/api/file";
import { useStore } from "@/store/useStore";
import { useModalProfilePost } from "@/store/useModalProfilePost";
import { UserDTO } from "@/api/dto/user.dto";
import { useDelBanLoad } from "@/store/useDelBanLoad";

interface ProfileLayoutProps {
  user: UserDTO;
}

const PostModal: FC<ProfileLayoutProps> = ({ user }) => {
  const modalState = useStore(useModalProfilePost, (state) => state);
  const [postName, setPostName] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const file = modalState?.file;
  const checkModal = modalState?.checkModal;
  const fileUrl = file && process.env.NEXT_PUBLIC_HOST + "/uploads/" + `${file.user?.id}/` + file.fileName;
  const downloadFileUrl = file && process.env.NEXT_PUBLIC_HOST + "/public/download/" + `${file.user?.id}/` + file.fileName;
  const { setBlock } = useDelBanLoad()

  const handleRestricted = async (fileId: number | undefined) => {
    if (postName.trim().length !== 0 && fileId) {
      const obj = {
        postName: postName.trim(),
        postDescription: postDescription.trim().length == 0 ? null : postDescription.trim()
      };

      await updateUserRestricted(fileId, obj);
      setBlock()
      closeModal();
    }
  };

  const closeModal = () => {
    modalState?.setPostModal({ postModal: false, file: {} as FileDTO, checkModal: "" });
    setPostName("");
    setPostDescription("");
  };

  useEffect(() => {
    (modalState?.postModal && checkModal !== "admin") ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
  }, [modalState?.postModal, checkModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostName(e.target.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(e.target.value);
  };

  return (
    <>
      {modalState?.postModal &&
        <>
          <div className="fixed inset-0 bg-black opacity-70 z-20"
               onClick={closeModal} />
          <div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 ${checkModal && 'w-full lg:w-[610px] xl:w-[700px]'} -translate-y-1/2 z-30 overflow-auto ${(checkModal === "" || checkModal === "admin") && `${checkModal !== 'admin' && 'border-2'} bg-black border-gray-500 w-[360px] lg:w-[410px] xl:w-[500px] rounded-2xl p-2`}`}>
            {checkModal == "" &&
              <input
                type="text"
                onChange={handleInputChange}
                value={postName}
                maxLength={40}
                placeholder="Enter image name"
                className="w-full px-2 pt-2 border border-gray-300 rounded focus:outline-none bg-black border-none"
              />
            }
            <div
              className={`relative group transform ${(checkModal === "" || checkModal === "admin") && "bg-gradient-to-b from-[#000007] via-[#000007] to-[#00000f] my-4"}`}>
              {checkModal === "admin" &&
                <div className="whitespace-pre-line break-words mb-2">
                  <h2>{file?.postName}</h2>
                </div>
              }
              {file && fileUrl &&
                <Image
                  width={file.width}
                  height={file.height}
                  src={fileUrl}
                  alt={`${file.fileName}`}
                  loading="lazy"
                  className={`object-contain w-full ${checkModal == "" ? "max-h-[60svh]" : "max-h-[80svh] min-h-[30svh]"}`}
                  onClick={() => checkModal != "" && closeModal()}
                />
              }
              {checkModal !== "admin" ?
                <a
                  className="absolute p-1 hover:text-fuchsia-600 text-[#B3B3B3] truncate overflow-hidden whitespace-nowrap bottom-1 right-1 bg-black text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500"
                  href={downloadFileUrl}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor"
                       className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
                : file?.postDescription &&
                <div className="whitespace-pre-line break-words overflow-auto max-h-[200px] mt-3">
                  <p>{file?.postDescription}</p>
                </div>
              }
            </div>

            {checkModal === "" &&
              <>
              <textarea
                placeholder="Image description..."
                onChange={handleTextareaChange}
                value={postDescription}
                className="w-full h-[13svh] px-2 border border-gray-300 rounded resize-none focus:outline-none bg-black border-none"
              />

                <div className="flex justify-around">
                  <button className="w-full font-medium py-2 pt-1 hover:text-fuchsia-600 transition"
                          onClick={closeModal}>Close
                  </button>
                  <button disabled={postName.trim().length <= 0}
                          className={`w-full font-medium text-gray-400 py-2 pt-1 ${postName.trim().length > 0 && "hover:text-green-500 transition text-green-400"}`}
                          onClick={() => handleRestricted(file?.id)}>Send
                  </button>
                </div>
              </>
            }
          </div>
        </>
      }
    </>
  );
};

export default PostModal;