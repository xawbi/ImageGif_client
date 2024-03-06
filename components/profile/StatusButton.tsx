"use client";
import { FC } from "react";
import { delFile } from "@/api/file";
import { FileDTO } from "@/api/dto/file.dto";
import { useModalProfilePost } from "@/store/useModalProfilePost";
import Link from "next/link";

interface UserFileProps {
  file: FileDTO;
  favorites?: string;
}

const StatusButton: FC<UserFileProps> = ({ file, favorites }) => {
  const setPostModal = useModalProfilePost(state => state.setPostModal);

  const handleRemoveFile = async () => {
    if (file) {
      if (typeof window !== "undefined" && window.confirm("Are you sure you want to remove this file?")) {
        await delFile(file.id);
      }
    }
  }

  return (
    <>
      {file.restricted !== "public" ?
        <div onClick={() => setPostModal && setPostModal({ postModal: true, file: file, checkModal: "user" })}
             className="absolute w-full h-full z-10" />
        : <Link href="" as={`/gallery/${file.id}`} scroll={true} className="absolute w-full h-full z-10" passHref />
      }
      {!favorites &&
        <>
          {file.restricted !== "public" &&
            <button onClick={handleRemoveFile}
                    className="absolute truncate overflow-hidden whitespace-nowrap top-1 left-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6 mb-1 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </button>
          }
          {!file.reject && <>
            <button disabled={file.restricted !== "private" && true}
                    onClick={() => setPostModal && setPostModal({ postModal: true, file: file })}
                    className={`absolute truncate overflow-hidden whitespace-nowrap top-1 right-1 bg-black text-white text-center p-1 pt-[5px] px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rounded border-2 border-gray-500 ${file.restricted === "pending" && "text-yellow-500"}`}>
              {file.restricted === "private" &&
                <>
                  <div className="hover:text-fuchsia-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="inline-block w-6 h-6 mr-1 mb-1">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <p className="inline-block">Post</p>
                  </div>
                </>
              } {file.restricted === "public" &&
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6 mb-1 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            } {file.restricted === "pending" &&
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="inline-block w-6 h-6 mr-1 mb-1">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="inline-block">Pend..</p>
              </>
            }
            </button>
          </>
          }
        </>
      }
    </>
  );
};

export default StatusButton;