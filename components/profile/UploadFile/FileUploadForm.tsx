"use client";
import React, { FC, useEffect, useState } from "react";
import CustomFileSelector from "./CustomFileSelector";
import ImagePreview from "./ImagePreview";
import { revalidateProfile, revalidateUserFiles } from "@/api/file";
import { useShowSnackbar } from "@/store/useShowSnackbar";

interface ChooseFileBtnProps {
  handleCloseUploadForm: () => void;
}

const FileUploadForm: FC<ChooseFileBtnProps> = ({ handleCloseUploadForm }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [dragVisible, setDragVisible] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { setShowSnackbar } = useShowSnackbar()

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length + files.length > 10) {
        alert("Maximum number of downloads - 10");
      } else {
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setDragVisible(false);
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const selectedFiles: File[] = Array.from(e.dataTransfer.files);
      if (selectedFiles.length + files.length > 10) {
        alert("Maximum number of downloads - 10");
      } else {
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setDragVisible(false);
      }
    }
    setDrag(false);
  };

  useEffect(() => {
    if (files.length === 0) {
      setDragVisible(true);
    } else {
      setDragVisible(false);
    }
  }, [files]);

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const getCookie = (cookieName: string) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return null;
  };

  async function uploadFilesSequentially(files: File[], token: string | null, host: string | undefined) {
    setUploading(true);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const formData = new FormData();
          formData.append("file", file, encodeURIComponent(file.name));
          const res = await fetch(`${host}/files`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: formData
          });
          if (res.ok) {
            const data = await res.json();
            console.log(`File ${i + 1} uploaded successfully. Response:`, data);
          } else {
            console.error(`Error uploading file ${i + 1}:`, res.status, res.statusText);
            res.statusText === 'Payload Too Large' ? setShowSnackbar('Max upload size 5mb') : setShowSnackbar('Invalid file type')
            handleCloseUploadForm();
          }
        } catch (error) {
          console.error(`Error uploading file ${i + 1}:`, error);
        }
      }
      setUploading(false);
      handleCloseUploadForm();
      await revalidateUserFiles();
  }

  async function uploadFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const host = process.env.NEXT_PUBLIC_HOST;
    const token = getCookie("_token");
    if (files.length === 0) return
    try {
      await uploadFilesSequentially(files, token, host);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <form encType="multipart/form-data" onSubmit={uploadFile} className="w-full flex flex-col items-center">
        <CustomFileSelector
          accept="image/png, image/jpeg, image/gif, image/webp, image/tif, image/bmp"
          onChange={handleFileSelected}
          dragVisible={dragVisible}
        />
        <ImagePreview handleRemoveFile={handleRemoveFile} files={files} />
        {dragVisible ?
          <>
            <label htmlFor="fileInput" className="cursor-pointer">
              <div
                className={`py-16 w-54 lg:w-72 lg:py-24 lg:text-lg text-center border-dashed border-2 border-blue-600 ${drag && "border-fuchsia-600"}`}
                onDragStart={e => dragStartHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDrop={drag ? (e) => handleDrop(e) : undefined}
              >
                {drag ? "Add files" : "Drag files here"} Add files
              </div>
            </label>
          </>
          : <button disabled={uploading && true} type="submit"
                    className={`text-blue-500 ${uploading && "text-gray-500"} mt-4 hover:bg-[#202333] py-2 px-3 c border-2 border-gray-500 lg:text-base rounded-2xl text-sm`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="inline-block w-5 h-5 mr-1.5 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload file
          </button>
        }
      </form>
    </>
  )
}

export default FileUploadForm;