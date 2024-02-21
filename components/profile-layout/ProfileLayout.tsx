"use client";
import Avatars from "@/components/profile-layout/Avatar/Avatar";
import { AvatarDto } from "@/api/dto/avatar.dto";
import Logout from "@/components/profile-layout/Logout";
import BgProfile from "@/components/profile-layout/BgProfile";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserDTO } from "@/api/dto/user.dto";
import { useModalProfilePost } from "@/store/useModalProfilePost";
import { useStore } from "@/store/useStore";
import PostModal from "@/components/profile-layout/PostModal";
import Snackbar from "@/components/auth/snackbar/Snackbar";
import { useShowSnackbar } from "@/store/useShowSnackbar";

interface LayoutProps {
  avatar: AvatarDto;
  user: UserDTO;
  bgId: string | null;
}

const LayoutsInProfile: FC<LayoutProps> = ({ avatar, user, bgId }) => {
  const pathName = usePathname();
  const modalState = useStore(useModalProfilePost, (state) => state);
  const showSnackbar = useStore(useShowSnackbar, (state) => state);
  const { setShowSnackbar } = useShowSnackbar();

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
  ];

  const navItems = [
    { label: "ALL FILES", href: "/profile" },
    { label: "PHOTOS", href: "/profile/photos" },
    { label: "GIFS", href: "/profile/gifs" },
    { label: "PENDING", href: "/profile/pending" },
    { label: "PUBLIC", href: "/profile/public" },
    { label: "FAVORITES", href: "/profile/favorites" }
  ];

  const bgProfileClient = bgId !== null ? bgProfile.find(el => el.id === +bgId)?.bgUrl : "bg-black";

  return (
    <>
      {modalState?.checkModal !== "admin" && <PostModal user={user}/>}
      {(showSnackbar?.showSnackbar === "Max upload size 5mb" || showSnackbar?.showSnackbar === "Invalid file type") &&
        <Snackbar bg={"bg-red-900"} message={showSnackbar?.showSnackbar} setShowSnackbar={setShowSnackbar} />}
      <div
        className={`p-6 pb-4 px-2 lg:px-10 sm:px-6 rounded-sm border-[#202330] ${bgProfileClient} bg-cover bg-no-repeat`}>
        <div className="flex items-center justify-between">
          <div>
            <Avatars avatar={avatar} user={user} />
          </div>
          <div className="flex flex-col items-end">
            <BgProfile />
            <Logout />
          </div>
        </div>
        <ul className="flex rounded-b-2xl mt-4 mb-2 justify-center">
          {navItems.map(link => {
            const isActive = pathName === link.href;
            return (
              <li key={link.label}>
                <Link href={link.href}
                      className={`text-sm text-white ${isActive ? "border-b-2 border-white" : ""} hover:text-gray-200 p-3 rounded-sm`}>
                  {link.label}
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