'use client'
import {FC, useState} from "react";

interface PropsRegLogTab {
  handleChangePassword: (event: any) => void
  passwordValue: string
}

const PasswordField: FC<PropsRegLogTab> = ({handleChangePassword, passwordValue}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <input
        name="password"
        type={showPassword ? 'text' : 'password'}
        className="py-2 px-2 text-base font-medium text-white bg-transparent border-b-2 border-transparent focus:outline-none focus:border-gray-300"
        placeholder="Password"
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