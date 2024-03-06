import {ReactNode} from 'react'

interface BlogLayoutProps {
  children: ReactNode
}

export default async function ProfileLayout({ children }: BlogLayoutProps) {

  return (
    <>
      {children}
    </>
  )
}