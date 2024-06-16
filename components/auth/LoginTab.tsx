'use client'
import { ChangeEvent, FC, useState } from "react";
import PasswordField from "@/components/auth/PasswordField";
import Snackbar from "@/components/auth/snackbar/Snackbar";
import Link from "next/link";

interface PropsAuthForm {
  showSnackbar: string
  setShowSnackbar: (value: string) => void
}

const LoginTab: FC<PropsAuthForm> = ({showSnackbar, setShowSnackbar}) => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  }

  return (
    <>
      <div className="flex flex-col text-gray-400 py-6 relative">
        <input
          type="text"
          name="email"
          className="py-2 pl-2 pr-12 text-base font-medium text-white bg-transparent border-b-2 border-gray-500"
          placeholder="Email"
          value={emailValue}
          onChange={handleChangeEmail}
        />
        {emailValue && (<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
            Email
        </span>)}
      </div>
      <div className='flex flex-col text-gray-200 py-2'>
        <PasswordField handleChangePassword={handleChangePassword} passwordValue={passwordValue}/>
      </div>
      <button type="submit" className='w-full mb-2 mt-10 py-2 border border-amber-50 rounded-lg hover:bg-blue-950 transition-colors'>
        SIGNIN
      </button>
      <Link href={'/password/reset'} className='flex justify-center text-[14px] mt-3 text-gray-300 hover:text-white transition'>
        Forgot Your Password?
      </Link>

      {showSnackbar === 'emptyFields' && <Snackbar bg={'bg-red-900'} message={'There are empty fields.'} setShowSnackbar={setShowSnackbar}/>}
      {showSnackbar === 'errorAuthorize' && <Snackbar bg={'bg-red-900'} message={'Invalid email or password.'} setShowSnackbar={setShowSnackbar}/>}
      {showSnackbar === 'successful' && <Snackbar bg={'bg-green-900'} message={'Authorization was successful.'} setShowSnackbar={setShowSnackbar}/>}

    </>
  )
}

export default LoginTab