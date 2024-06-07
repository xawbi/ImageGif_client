"use client";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import mainIco from "@/public/mainIco.png";

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
        <Image width={80} height={80} src={mainIco} alt=""
               className="w-[28px]" />
        <span className="ml-1 text-xl">ImageGif</span>
      </Link>
      <ul className="flex items-center">
        {navLinks.map((link, index) => {
          const isActive = pathName === link.href
          return (
            <li key={index} className='flex items-center'>
              <Link href={link.href} onClick={() => setLinkClicked(true)}
                    className={`text-white hover:text-gray-200 p-3 rounded-sm`}>
                <span style={isActive ? { textShadow: '0 1px 8px rgb(172, 28, 175), 1px 1px 8px rgb(172, 28, 175)' } : undefined}>{link.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Navigation;