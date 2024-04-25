import {ReactNode} from 'react'
import LayoutsInProfile from "@/components/profile-layout/ProfileLayout";
import {AvatarDto} from "@/api/dto/avatar.dto";
import {getAvatar} from "@/api/avatar";
import {UserDTO} from "@/api/dto/user.dto";
import {getUser} from "@/api/user"
import { getBgId } from "@/api/bgProfile";
import { checkBan, checkVerify } from "@/api/checkVerify";
import { redirect } from "next/navigation";
export default async function ProfileLayout({children}: {
  children: ReactNode
}) {
  if (!checkVerify()) redirect('/auth')
  if (await checkBan()) redirect('/ban')

  const avatar: AvatarDto = await getAvatar()
  const user: UserDTO = await getUser()
  const bgId: string | null = await getBgId()

  return (
    <>
      <LayoutsInProfile avatar={avatar} user={user} bgId={bgId}/>
      {children}
    </>
  )
}