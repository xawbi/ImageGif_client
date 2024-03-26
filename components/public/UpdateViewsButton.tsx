'use client'
import { FC, ReactNode } from "react";
import { updateView } from "@/api/public";

interface PageProps {
  children: ReactNode
  fileId: number
}

const UpdateViewsButton: FC<PageProps> = ({children, fileId}) => {

  const handeClick = async () => {
    await updateView(fileId)
  }

  return (
    <>
      <div onClick={handeClick}>
        {children}
      </div>
    </>
  )
}

export default UpdateViewsButton