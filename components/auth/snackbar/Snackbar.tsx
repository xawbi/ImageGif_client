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
      <div className={`${bg} fixed bottom-0 left-0 mb-6 ml-6 border pl-4 border-gray-500 rounded shadow flex items-center z-50`}>
        <span className="material-symbols-outlined mr-1">error</span>
        <p className="text-white">{message}</p>
        <button onClick={() => setShowSnackbar('')} className="inline-block pr-4 pl-1.5 py-2">
          <span className="material-symbols-outlined mt-1.5">close</span>
        </button>
      </div>
    </>
  )
}

export default RenderSnackbar