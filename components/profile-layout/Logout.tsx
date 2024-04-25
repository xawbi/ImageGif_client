'use client'
import {FC} from 'react'
import {logout} from "@/api/auth";
import { useRouter } from "next/navigation";

const Logout: FC = () => {
  const router = useRouter();
  const host = process.env.NEXT_PUBLIC_IMAGEGIF_HOST

  const handleLogout = async () => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to log out?')) {
      await logout()
      router.push(`${host}/auth`)
      location.reload()
    }
  }

  return (
    <>
      <button onClick={handleLogout} className="text-red-700 bg-gray-900 hover:bg-gray-950 py-[6px] px-3 rounded-2xl border-2 border-gray-500 lg:text-base text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-block w-5 h-5 mr-1.5 mb-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        Logout
      </button>
    </>
  )
}

export default Logout