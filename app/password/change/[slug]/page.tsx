import { notFound, redirect } from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import { checkValidPasswordToken } from "@/api/auth";
import ChangePassword from "@/components/auth/Password/ChangePassword/ChangePassword";

export type Props = {
  params: {
    slug: string
  }
}

export default async function ChangePage({ params: { slug } }: Props) {
  if (checkVerify()) notFound()
  if (!await checkValidPasswordToken(slug)) notFound()

  return (
    <>
      <ChangePassword token={slug}/>
    </>
  )
}