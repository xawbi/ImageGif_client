'use client'
import {FC} from 'react'
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useSession} from "next-auth/react";

type NavLink = {
  label: string
  href: string
}

interface PropsHeader {
  navLinks: NavLink[]
}

const Navigation: FC<PropsHeader> = ({navLinks}) => {
  const pathName = usePathname()

  return (
    <>
      {navLinks.map(link => {
        const isActive = pathName === link.href
        return (
          <li key={link.label}>
            <Link href={link.href}
                  className={`text-white ${isActive ? 'bg-gray-800 border-b-2 border-gray-500' : ''} hover:text-gray-200 text-20px p-4 rounded-sm`}>
              {link.label}
            </Link>
          </li>
        )
      })}
    </>
  )
}

export default Navigation