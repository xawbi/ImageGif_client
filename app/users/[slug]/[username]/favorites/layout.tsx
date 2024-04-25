import {ReactNode} from 'react'
import { checkBan } from "@/api/checkVerify";
import { redirect } from "next/navigation";

interface BlogLayoutProps {
  children: ReactNode
}

export default async function ProfileLayout({ children }: BlogLayoutProps) {
  if (await checkBan()) redirect('/ban')
  return (
    <>
      {children}
    </>
  )
}