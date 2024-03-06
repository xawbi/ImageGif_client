"use client";
import Avatars from "@/components/profile-layout/Avatar/Avatar";
import { AvatarDto } from "@/api/dto/avatar.dto";
import Logout from "@/components/profile-layout/Logout";
import BgProfile from "@/components/profile-layout/BgProfile";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserDTO } from "@/api/dto/user.dto";
import { useModalProfilePost } from "@/store/useModalProfilePost";
import { useStore } from "@/store/useStore";
import PostModal from "@/components/profile-layout/PostModal";
import Snackbar from "@/components/auth/snackbar/Snackbar";
import { useShowSnackbar } from "@/store/useShowSnackbar";
import CircleAvatar from "@/components/profile-layout/Avatar/CircleAvatar";
import CloseFavorites from "@/components/profile-layout/CloseFavorites";

interface LayoutProps {
  avatar: AvatarDto;
  user: UserDTO;
  bgId: string | null;
  userPublic: boolean
}

const LayoutsInProfile: FC<LayoutProps> = ({ avatar, user, bgId, userPublic }) => {
  const pathName = usePathname()
  const modalState = useStore(useModalProfilePost, (state) => state)
  const showSnackbar = useStore(useShowSnackbar, (state) => state)
  const { setShowSnackbar } = useShowSnackbar()

  const bgProfile = [
    { id: 0, bgUrl: `bg-[url('/bgProfile/0.webp')]` },
    { id: 1, bgUrl: `bg-[url('/bgProfile/1.webp')]` },
    { id: 2, bgUrl: `bg-[url('/bgProfile/2.webp')]` },
    { id: 3, bgUrl: `bg-[url('/bgProfile/3.webp')]` },
    { id: 4, bgUrl: `bg-[url('/bgProfile/4.webp')]` },
    { id: 5, bgUrl: `bg-[url('/bgProfile/5.webp')]` },
    { id: 6, bgUrl: `bg-[url('/bgProfile/6.webp')]` },
    { id: 7, bgUrl: `bg-[url('/bgProfile/7.webp')]` },
    { id: 8, bgUrl: `bg-[url('/bgProfile/8.webp')]` },
    { id: 9, bgUrl: `bg-[url('/bgProfile/9.webp')]` },
    { id: 10, bgUrl: `bg-[url('/bgProfile/10.webp')]` },
    { id: 11, bgUrl: `bg-[url('/bgProfile/11.webp')]` },
    { id: 12, bgUrl: `bg-[url('/bgProfile/12.webp')]` },
    { id: 13, bgUrl: `bg-[url('/bgProfile/13.webp')]` },
    { id: 14, bgUrl: `bg-black` }
  ]

  let navItems = [];
  if (userPublic) {
    navItems = [
      { label: "POSTS", href: `/users/${user.id}/${user.username}` },
      { label: "FAVORITES", href: `/users/${user.id}/${user.username}/favorites` }
    ]
  } else {
    navItems = [
      { label: "ALL", href: "/profile" },
      { label: "PHOTOS", href: "/profile/photos" },
      { label: "GIFS", href: "/profile/gifs" },
      { label: "PENDING", href: "/profile/pending" },
      { label: "PUBLIC", href: "/profile/public" },
      { label: "FAVORITES", href: "/profile/favorites" }
    ]
  }

  const bgProfileClient = bgId !== null ? bgProfile.find(el => el.id === +bgId)?.bgUrl : "bg-black";
  let ifNav = true
  if (userPublic && !user.openFavorites) ifNav = false

  return (
    <>
      {modalState?.checkModal !== "admin" && <PostModal user={user} />}
      {(showSnackbar?.showSnackbar === "Max upload size 5mb" || showSnackbar?.showSnackbar === "Invalid file type") &&
        <Snackbar bg={"bg-red-900"} message={showSnackbar?.showSnackbar} setShowSnackbar={setShowSnackbar} />}
      <div
        className={`p-6 pb-4 px-2 lg:px-10 sm:px-6 rounded-sm border-[#202330] ${bgProfileClient} bg-cover bg-no-repeat`}>
        <div className="flex items-center justify-between">
          {!userPublic ?
            <>
              <div>
                <Avatars avatar={avatar} user={user} />
              </div>
              <div className="flex flex-col items-end">
                <BgProfile />
                <CloseFavorites openFavorites={user && user.openFavorites} />
                <Logout />
              </div>
            </>
            :
            <div className="flex flex-row">
              <div
                className="relative cursor-pointer border-4 border-gray-500 overflow-hidden rounded-full w-28 h-28 lg:w-40 lg:h-40 sm:w-32 sm:h-32 mr-4"
              >
                <CircleAvatar avatarParams={avatar} />
              </div>
              <span className="text-base sm:text-xl font-medium">{user.username}</span>
            </div>
          }
        </div>
        <ul className="flex rounded-b-2xl justify-center flex-wrap">
          {ifNav && navItems.map(link => {
            const isActive = pathName === link.href;
            return (
              <li key={link.label} className="mt-2">
                <Link
                  href={link.href}
                  className={`text-xs min-[500px]:text-sm text-white ${isActive ? "border-b-2 border-white" : ""} hover:text-gray-200 p-3 rounded-sm`}
                >
                  {link.label}
                  {link.label === "FAVORITES" && !userPublic &&
                    <>
                      {user && user.openFavorites ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="inline-block w-4 h-4 mb-0.5 ml-1 stroke-cyan-500">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="inline-block w-4 h-4 mb-0.5 ml-1 stroke-red-600">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                      }
                    </>
                  }
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default LayoutsInProfile;