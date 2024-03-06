"use client";
import { FC, useState } from "react";
import { updateUserFavorites } from "@/api/favorite";

interface ProfileLayoutProps {
  openFavorites: boolean | undefined;
}

const CloseFavorites: FC<ProfileLayoutProps> = ({ openFavorites }) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleUpdateUserFavorites = async () => {
    setIsButtonDisabled(true);
    setTimeout(async () => {
      await updateUserFavorites();
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <>
      <button onClick={handleUpdateUserFavorites} disabled={isButtonDisabled}
              className="text-fuchsia-600 bg-gray-900 hover:bg-gray-950 py-[6px] px-2 my-5 rounded-2xl border-2 border-gray-500 lg:text-base text-sm">
        {openFavorites && openFavorites ?
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="inline-block w-5 h-5 mr-1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span>Close Favorites</span>
          </>
          : <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="inline-block w-5 h-5 mr-1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span>Open Favorites</span>
          </>
        }
      </button>
    </>
  );
};

export default CloseFavorites;