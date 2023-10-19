import Link from "next/link";
import Navigation from "@/components/Navigation";
import {checkAdmin, checkVerify} from "@/api/checkVerify";
import Image from "next/image";

export default async function Header() {
  let navItems = []
  if (checkVerify() && await checkAdmin()) {
    navItems = [
      {label: 'Home', href: '/'},
      {label: 'AdminPanel', href: '/admin'},
      {label: 'Profile', href: '/profile'},
    ]
  } else if (checkVerify()) {
    navItems = [
      {label: 'Home', href: '/'},
      {label: 'Profile', href: '/profile'},
    ]
  } else {
    navItems = [
      {label: 'Home', href: '/'},
      {label: 'Log in', href: '/auth'},
    ]
  }

  return (
    <>
      <header className="bg-[#202330] py-3 px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image width={100} height={100} src="https://cdn-icons-png.flaticon.com/512/1400/1400487.png" alt="" className="w-8"/>
          <span className="ml-2 text-xl">ImageGif</span>
        </Link>
        <ul className="flex items-center">
          <Navigation navLinks={navItems}/>
        </ul>
      </header>
    </>
  )
}