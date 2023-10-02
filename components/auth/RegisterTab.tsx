'use client'
import {FC, useState} from 'react'
import PasswordField from "@/components/auth/PasswordField";
import Snackbar from "@/components/auth/snackbar/Snackbar";

interface PropsAuthForm {
  activeTab: string
  setActiveTab: (value: string) => void
  showSnackbar: string
  setShowSnackbar: (value: string) => void
}

const RegisterTab: FC<PropsAuthForm> = ({activeTab, setActiveTab, showSnackbar, setShowSnackbar}) => {

  const [emailValue, setEmailValue] = useState('')
  const [usernameValue, setUsernameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [activateCodeValue, setActivateCodeValue] = useState('')

  const handleChangeEmail = (e) => {
    setActiveTab('register')
    setEmailValue(e.target.value);
  }

  const handleChangeUsername = (e) => {
    setActiveTab('register')
    setUsernameValue(e.target.value);
  }

  const handleChangePassword = (e) => {
    setActiveTab('register')
    setPasswordValue(e.target.value);
  }

  const handleChangeActivateCode = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setActivateCodeValue(e.target.value)
    } else return
  }

  return (
    <>
      <div className="flex flex-col text-gray-200 text-gray-400 pt-6 pb-2 relative">
        <input
          type="text"
          name="username"
          className="py-2 pl-2 pr-20 font-medium text-white bg-transparent border-b-2 border-gray-500"
          placeholder="Username"
          value={usernameValue}
          onChange={handleChangeUsername}
        />
        {usernameValue && (<span className="absolute right-2 top-11 transform -translate-y-1/2 text-sm text-gray-500">
            Username
        </span>)}
      </div>
      <div className="flex flex-col text-gray-200 text-gray-400 py-6 relative">
        <input
          type="text"
          name="email"
          className="py-2 pl-2 pr-12 font-medium text-white bg-transparent border-b-2 border-gray-500"
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

      {activeTab === 'active' &&
        <div className="flex flex-col text-gray-200 text-gray-400 pt-6 relative">
          <div className="text-center mb-2">Confirmation code sent to email</div>
          <input
            inputMode="numeric"
            name="activationCode"
            placeholder="Enter code"
            maxLength={6}
            value={activateCodeValue}
            onChange={handleChangeActivateCode}
            className="py-2 m-auto font-medium text-white bg-transparent border-b-2 border-gray-300 focus:outline-none text-center w-24"
          />
        </div>
      }

      <button type="submit" className='w-full mb-2 mt-10 py-2 border border-amber-50 rounded-lg hover:bg-blue-950 transition-colors'>
        {activeTab === 'active' ? 'SIGNUP' : 'SEND CODE'}
      </button>

      {showSnackbar === 'emptyFields' && <Snackbar bg={'bg-red-900'} message={'There are empty fields.'} setShowSnackbar={setShowSnackbar}/>}
      {showSnackbar === 'errorAuthorize' && <Snackbar bg={'bg-red-900'} message={'Invalid email or password.'} setShowSnackbar={setShowSnackbar}/>}
      {showSnackbar === 'successful' && <Snackbar bg={'bg-green-900'} message={'Authorization was successful.'} setShowSnackbar={setShowSnackbar}/>}

    </>
  )
}

export default RegisterTab