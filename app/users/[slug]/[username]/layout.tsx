import {ReactNode} from 'react'
import LayoutsInProfile from "@/components/profile-layout/ProfileLayout";
import {AvatarDto} from "@/api/dto/avatar.dto";
import { getAvatarPublic } from "@/api/avatar";
import {UserDTO} from "@/api/dto/user.dto";
import { getUserPublic } from "@/api/user";
import { getBgIdPublic } from "@/api/bgProfile";
import { checkBan } from "@/api/checkVerify";
import { redirect } from "next/navigation";

interface BlogLayoutProps {
  children: ReactNode
  params: {
    slug: string
    username: string
  }
}

export default async function ProfileLayout({ children, params: { slug, username } }: BlogLayoutProps) {
  if (await checkBan()) redirect('/ban')
  const avatar: AvatarDto = await getAvatarPublic(+slug)
  const userPublic: UserDTO = await getUserPublic(+slug)
  const bgId: string | null = await getBgIdPublic(+slug)

  return (
    <>
      <LayoutsInProfile avatar={avatar} user={userPublic} bgId={bgId} userPublic={true}/>
      {children}
    </>
  )
}