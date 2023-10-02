'use client'
import {FC, FormEventHandler, useEffect, useState} from 'react'
import LoginTab from "@/components/auth/LoginTab"
import RegisterTab from "@/components/auth/RegisterTab"
import {setCookie} from "nookies";
import {ActivateFormDTO, LoginFormDTO, RegistrationFormDTO} from "@/api/dto/auth.dto";
import * as Api from '@/api'
import {redirect, useRouter} from "next/navigation";
import {checkVerify} from "@/api/checkVerify";

const AuthForm: FC = () => {

  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [showSnackbar, setShowSnackbar] = useState('')

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  const handleTabChange = (tab) => {
    if (activeTab !== tab)
    setActiveTab(tab)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username: string | null = formData.get('username') as string
    const email: string | null = formData.get('email') as string
    const password: string | null = formData.get('password') as string
    const activationCode: string | null = formData.get('activationCode') as string

    if (activeTab === 'login' && (!email || !password)) {
      setShowSnackbar('emptyFields')
      return;
    } else if (activeTab === 'register' && (!username || !email || !password)) {
      setShowSnackbar('emptyFields')
      return;
    } else if (activeTab === 'activate' && (!username || !email || !password || !activationCode)) {
      setShowSnackbar('emptyFields')
      return;
    }

    if (activeTab === 'login' && formData.get('email') != '' && formData.get('password') != '') {
      const LoginObj: LoginFormDTO = {
        email: email,
        password: password
      }
      try {
        const {token} = await Api.auth.login(LoginObj)
        setCookie(null, "_token", token, {
          path: "/"
        })
        setShowSnackbar('successful')
        location.reload()
      } catch (e) {
        console.log(e)
        setShowSnackbar('errorAuthorize')
      }
    } else if (activeTab === 'register' && formData.get('username') != '' && formData.get('email') != '' && formData.get('password') != '') {
      const RegisterObj: RegistrationFormDTO = {
        username: username,
        email: email,
        password: password
      }
      try {
        await Api.auth.register(RegisterObj)
        setActiveTab('active')
      } catch (e) {
        console.log(e)
        setShowSnackbar('errorAuthorize')
      }
    } else if (activeTab === 'active' && formData.get('username') != '' && formData.get('email') != '' && formData.get('password') != '' && formData.get('activationCode') != '') {
      const ActivateObj: ActivateFormDTO = {
        username: username,
        email: email,
        password: password,
        activationCode: activationCode
      }
      try {
        const {token} = await Api.auth.activate(ActivateObj)
        setCookie(null, "_token", token, {
          path: "/"
        })
        setShowSnackbar('successful')
        location.reload()
      } catch (e) {
        console.log(e)
        setShowSnackbar('errorAuthorize')
      }
    }
  }

  return (
    <>
      <div className="w-96 mx-auto flex items-center justify-center mt-10">
        <div className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8 border border-gray-500">
          <div className="flex items-center justify-center">
            <button
              className={`py-2 px-4 text-base font-medium text-white bg-transparent border-b-2 border-transparent ${
                activeTab === "login"
                  ? "border-white border-opacity-80"
                  : "hover:border-gray-200 hover:border-opacity-80 transition"}`}
              onClick={() => handleTabChange("login")}
            >
              Sign in
            </button>
            <button
              disabled={activeTab === 'active' && true}
              className={`py-2 px-4 text-base font-medium text-white bg-transparent border-b-2 border-transparent ${
                activeTab === "register"
                  ? "border-white border-opacity-80"
                  : "hover:border-gray-200 hover:border-opacity-80 transition"}`}
              onClick={() => handleTabChange("register")}
            >
              Sign up
            </button>
          </div>
          <form onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} onSubmit={handleSubmit} className="p-2">
            {activeTab === "login"
              ? <LoginTab showSnackbar={showSnackbar} setShowSnackbar={setShowSnackbar}/>
              : <RegisterTab showSnackbar={showSnackbar} setShowSnackbar={setShowSnackbar} activeTab={activeTab} setActiveTab={setActiveTab}/>}
          </form>
        </div>
      </div>
    </>
  )
}

export default AuthForm