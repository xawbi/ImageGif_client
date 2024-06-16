'use client'
import React, { FC, useState } from "react";

interface PropsRegLogTab {
  handleChangePassword: (event: any) => void
  passwordValue: string
  name?: string
}

const PasswordField: FC<PropsRegLogTab> = ({handleChangePassword, passwordValue, name}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword(!showPassword);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  let passwordObj = {
    name: 'password',
    placeholder: 'Password'
  }
  if (name === 'newPassword') {
    passwordObj.name = 'newPassword'
    passwordObj.placeholder = 'new password'
  } else if (name === 'confirmNewPassword') {
    passwordObj.name = 'confirmNewPassword'
    passwordObj.placeholder = 'confirm new password'
  }

  return (
    <div className="relative">
      <input
        name={passwordObj.name}
        type={showPassword ? 'text' : 'password'}
        className="py-2 px-2 text-base font-medium text-white bg-transparent border-b-2 border-transparent focus:outline-none focus:border-gray-300"
        placeholder={passwordObj.placeholder}
        value={passwordValue}
        onChange={handleChangePassword}
        onKeyDown={handleKeyDown}
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center pr-5 focus:outline-none"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <img alt='aa' src='https://cdn-icons-png.flaticon.com/512/545/545834.png' className='w-5'/>
        ) : (
          <img alt='aa' src='	https://cdn-icons-png.flaticon.com/512/1443/1443042.png' className='w-5'/>
        )}
      </button>
    </div>
  )
}

export default PasswordField