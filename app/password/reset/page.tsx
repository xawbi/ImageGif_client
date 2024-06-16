import {redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";
import ResetPassword from "@/components/auth/Password/ResetPassword/ResetPassword";

export default async function ResetPage() {
  if (checkVerify()) redirect('/profile')

  return (
    <>
      <ResetPassword/>
    </>
  )
}