'use client'
import Avatars from "@/components/profile-layout/Avatar/Avatar";
import {AvatarDto} from "@/api/dto/avatar.dto";
import Logout from "@/components/profile-layout/Logout";
import BgProfile from "@/components/profile-layout/BgProfile";
import { FC, useEffect, useState } from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {UserDTO} from "@/api/dto/user.dto";

interface LayoutProps {
  avatar: AvatarDto
  user: UserDTO
}

const LayoutsInProfile: FC<LayoutProps> = ({avatar, user}) => {
  const pathName = usePathname()

  const navItems = [
    {label: 'All files', href: '/profile'},
    {label: 'Photos', href: '/profile/photos'},
    {label: 'Gifs', href: '/profile/gifs'},
    {label: 'Pending', href: '/profile/pending'},
    {label: 'Public', href: '/profile/public'},
  ]

  const [bgProfileId, setBgProfileId] = useState<number | undefined>(undefined);
  const [bgProfileClient, setBgProfileClient] = useState<string>('bg-black');

  useEffect(() => {
      const localBgProfileClient = localStorage.getItem('bgProfileClient');

      if (localBgProfileClient !== null) {
        const localBgProfileClientParsed = JSON.parse(localBgProfileClient);
        const localBgProfileClientSplit = localBgProfileClientParsed.split(',');

        if (localBgProfileClientSplit.length > 0) {
          const parsedId = parseInt(localBgProfileClientSplit[0], 10);
          setBgProfileId(parsedId);
          setBgProfileClient(localBgProfileClientParsed);
        }
      }
  }, []);

  return (
    <>
      <div className={`flex justify-between p-6 pb-4 px-2 lg:px-10 sm:px-6 rounded-sm border-[#202330] ${bgProfileClient} bg-cover bg-no-repeat`}>
        <Avatars avatar={avatar} user={user}/>
        <div className="flex flex-col items-end">
        <BgProfile bgProfileId={bgProfileId} setBgProfileClient={setBgProfileClient} bgProfileClient={bgProfileClient}/>
        <Logout/>
        </div>
      </div>
      <div className='bg-gray-900 py-4 pt-3 rounded-b-2xl mb-4'>
      <ul className='flex items-center justify-center'>
        {navItems.map(link => {
          const isActive = pathName === link.href
          return (
            <li key={link.label}>
              <Link href={link.href}
                className={`text-white text-1xl ${isActive ? 'border-b-2 border-white' : ''} hover:text-gray-200 text-20px p-4 rounded-sm`}>
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
      </div>
    </>
  )
}

export default LayoutsInProfile