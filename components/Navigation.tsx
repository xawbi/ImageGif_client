"use client";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type NavLink = {
  label: string
  href: string
}

interface PropsHeader {
  navLinks: NavLink[];
}

const Navigation: FC<PropsHeader> = ({ navLinks }) => {
  const pathName = usePathname();
  const [linkClicked, setLinkClicked] = useState(false);

  useEffect(() => {
    if (linkClicked) {
      window.scrollTo(0, 0);
      setLinkClicked(false);
    }
  }, [pathName, linkClicked]);

  return (
    <>
      <Link href="/" className="flex items-center" onClick={() => setLinkClicked(true)}>
        <Image width={80} height={80} src="https://cdn-icons-png.flaticon.com/512/1400/1400487.png" alt=""
               className="w-[28px]" />
        <span className="ml-1 text-xl">ImageGif</span>
      </Link>
      <ul className="flex items-center">
        {navLinks.map(link => {
          const isActive = pathName === link.href
          return (
            <li key={link.label} className='flex items-center'>
              <Link href={link.href} onClick={() => setLinkClicked(true)}
                    className={`text-white ${isActive && "bg-gray-800"} hover:text-gray-200 text-20px p-3 rounded-sm`}>
                <span style={isActive ? { textShadow: '0 0.5px 0.5px rgb(162 28 175), 0.5px 0.5px 0px rgb(162 28 175)' } : undefined}>{link.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Navigation;