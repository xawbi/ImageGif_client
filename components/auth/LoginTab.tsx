'use client'
import {FC, useState} from 'react'
import PasswordField from "@/components/auth/PasswordField";
import Snackbar from "@/components/auth/snackbar/Snackbar";

interface PropsAuthForm {
  showSnackbar: string
  setShowSnackbar: (value: string) => void
}

const LoginTab: FC<PropsAuthForm> = ({showSnackbar, setShowSnackbar}) => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const handleChangeEmail = (event) => {
    setEmailValue(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPasswordValue(event.target.value);
  }

  const renderSnackbar = (message: string, bg: string) => {
    return (
      <div className={`${bg} fixed bottom-0 left-0 mb-6 ml-6 border pl-4 border-gray-500 rounded shadow flex items-center`}>
        <span className="material-symbols-outlined mr-1">error</span>
        <p className="text-white">{message}</p>
        <button onClick={() => setShowSnackbar('')} className="inline-block px-4 py-2">
          <span className="material-symbols-outlined mt-1.5">close</span>
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col text-gray-200 text-gray-400 py-6 relative">
        <input
          type="text"
          name="email"
          className="py-2 pl-2 pr-12 text-base font-medium text-white bg-transparent border-b-2 border-gray-500"
          placeholder="Email"
          value={emailValue}
          onChange={handleChangeEmail}
        />
        {emailValue && (<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            Email
        </span>)}
      </div>
      <div className='flex flex-col text-gray-200 py-2'>
        <PasswordField handleChangePassword={handleChangePassword} passwordValue={passwordValue}/>
      </div>
      <button type="submit" className='w-full mb-2 mt-10 py-2 border border-amber-50 rounded-lg hover:bg-blue-950 transition-colors'>
        SIGNIN
      </button>

      {showSnackbar === 'emptyFields' && <Snackbar bg={'bg-red-900'} message={'There are empty fields.'} setShowSnackbar={setShowSnackbar}/>}
      {showSnackbar === 'errorAuthorize' && <Snackbar bg={'bg-red-900'} message={'Invalid email or password.'} setShowSnackbar={setShowSnackbar}/>}
      {showSnackbar === 'successful' && <Snackbar bg={'bg-green-900'} message={'Authorization was successful.'} setShowSnackbar={setShowSnackbar}/>}

    </>
  )
}

export default LoginTab