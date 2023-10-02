import {NextPage} from "next";
import AuthForm from "@/components/auth/AuthForm";
import {notFound, redirect} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";

export default async function AuthPage() {
  if (checkVerify()) redirect('/profile')

  return (
    <>
      <AuthForm />
    </>
  )
}