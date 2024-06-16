import Logout from "@/components/profile-layout/Logout";
import { checkBan } from "@/api/checkVerify";
import { notFound, redirect } from "next/navigation";

export default async function BanPage() {
  if (!await checkBan()) redirect('/auth')

  return <>
    <h1>You have been banned for violating the site rules</h1>
    <Logout/>
  </>
}