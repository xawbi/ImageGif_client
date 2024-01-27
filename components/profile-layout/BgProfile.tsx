'use client';
import { FC, useState } from "react";

export const bgProfile = [
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
  { id: 11, bgUrl: `bg-black` }
];

interface ProfileLayoutProps {
  bgProfileId: number | undefined;
  setBgProfileClient: (bgUrl: string) => any;
  bgProfileClient: any;
}

const BgProfile: FC<ProfileLayoutProps> = ({ bgProfileId, setBgProfileClient, bgProfileClient }) => {
  const lastBgProfile = bgProfile.length - 1;

  const initialBg = () => {
    if (bgProfileId && bgProfileId < lastBgProfile) {
      return bgProfileId + 1;
    } else if (bgProfileId === lastBgProfile) {
      return 0;
    } else return 0;
  };

  const [currentBgIndex, setCurrentBgIndex] = useState(() => initialBg());

  const handleUpdateBg = () => {
    setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgProfile.length);
    const selectedBg = bgProfile.find((bg) => bg.id === currentBgIndex);
    if (selectedBg !== undefined) {
      setBgProfileClient(`${selectedBg.id}, ${selectedBg.bgUrl}`);
      const newBgProfileClient = `${selectedBg.id}, ${selectedBg.bgUrl}`;
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        localStorage.setItem('bgProfileClient', JSON.stringify(newBgProfileClient));
      }
    }
  };

  return (
    <>
      <button onClick={handleUpdateBg}
              className="text-fuchsia-700 hover:bg-[#202333] py-2 px-3 rounded-2xl border-2 border-gray-500 lg:text-base text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="inline-block w-5 h-5 mr-1.5 mb-1">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
        Change bg..
      </button>
    </>
  );
};

export default BgProfile;