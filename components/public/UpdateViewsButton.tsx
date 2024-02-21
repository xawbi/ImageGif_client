'use client'
import { FC, ReactNode } from "react";
import { updateView } from "@/api/public";

interface PageProps {
  children: ReactNode
  fileId: number
}

const UpdateViewsButton: FC<PageProps> = ({children, fileId}) => {

  return (
    <>
      <div onClick={async () => await updateView(fileId)}>
        {children}
      </div>
    </>
  )
}

export default UpdateViewsButton