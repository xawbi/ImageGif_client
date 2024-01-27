"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useScroll } from "@/store/useScroll";
import Image from "next/image";

type NavLink = {
  label: string
  href: string
}

interface PropsHeader {
  navLinks: NavLink[];
}

const Navigation: FC<PropsHeader> = ({ navLinks }) => {
  const setScroll = useScroll(state => state.setScroll);
  const pathName = usePathname();

  const handleScroll = () => {
    return setScroll(0);
  };

  return (
    <>
      <Link href="/" className="flex items-center" onClick={handleScroll}>
        <Image width={100} height={100} src="https://cdn-icons-png.flaticon.com/512/1400/1400487.png" alt=""
               className="w-8" />
        <span className="ml-2 text-xl">ImageGif</span>
      </Link>
      <ul className="flex items-center">
        {navLinks.map(link => {
          const isActive = pathName === link.href;
          return (
            <li key={link.label}>
              <Link href={link.href} onClick={handleScroll}
                    className={`text-white ${isActive ? "bg-gray-800 border-b-2 border-gray-500" : ""} hover:text-gray-200 text-20px p-4 rounded-sm`}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  )
}

export default Navigation;