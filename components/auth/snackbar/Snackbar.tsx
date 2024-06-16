'use client'
import { FC, useEffect } from "react";

interface PropsLogRegTab {
  bg: string
  message: string
  setShowSnackbar: (value: string) => void
}

const RenderSnackbar: FC<PropsLogRegTab> = ({bg, message, setShowSnackbar}) => {

  useEffect(() => {
    if (message.trim().length > 0) {
      const timer = setTimeout(() => {
        setShowSnackbar('')
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, setShowSnackbar]);

  return (
    <>
      <div className={`${bg} fixed bottom-6 left-6 py-1 pr-2 pl-2.5 border border-gray-500 rounded shadow flex items-center z-50`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             strokeWidth={1.5} className="w-7 h-7 pr-1">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <p className="text-white">{message}</p>
        <button onClick={() => setShowSnackbar('')} className="inline-block py-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default RenderSnackbar