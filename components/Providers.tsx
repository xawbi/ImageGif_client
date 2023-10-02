'use client'
import {FC, ReactNode} from 'react'
import {SessionProvider} from "next-auth/react";

const Providers: FC = ({children}: {children: ReactNode}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Providers