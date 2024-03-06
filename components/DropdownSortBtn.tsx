"use client";
import React, { FC, useEffect, useState } from "react";
import InvisibleOverlay from "@/components/profile-layout/Avatar/InvisibleOverlay";
import { revalidateUserFiles } from "@/api/file";
import { revalidatePublicFiles, revalidateUserPublicFiles } from "@/api/public";

interface PageProps {
  pageType: string;
  selectedSortCookie: string | undefined;
}

const DropdownSortBtn: FC<PageProps> = ({ selectedSortCookie, pageType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(selectedSortCookie ? selectedSortCookie : "Newest");
  let cookieUserPublic = "";
  if (pageType === "public") cookieUserPublic = "selectedSortPublic";
  else if (pageType === "profile") cookieUserPublic = "selectedSort";
  else if (pageType === "profilePublic") cookieUserPublic = "selectedProfilePublic";

  useEffect(() => {
    const keyValue = document.cookie.match("(^|;) ?" + `${cookieUserPublic}` + "=([^;]*)(;|$)");
    if (keyValue) {
      setSelectedSort(keyValue[2]);
    }
  }, [pageType, cookieUserPublic]);

  function setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    if (document) document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  const handleSortClick = async (sort: string) => {
    if (sort === "random" || sort !== selectedSort) {
      setSelectedSort(sort);
      setCookie(`${cookieUserPublic}`, sort, 30);
      if (pageType === "public") await revalidatePublicFiles();
      else if (pageType === "profile") await revalidateUserFiles();
      else if (pageType === "profilePublic") await revalidateUserPublicFiles();
    }
    setIsOpen(false);
  };

  const closeSort = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", closeSort);
  }, []);

  return (
    <>
      {isOpen && <InvisibleOverlay onClick={closeSort} z={10} />}
      <div className="relative inline-block">
        <button
          className="border-2 border-gray-500 text-white hover:bg-blue-950 py-1 px-2 lg:text-base rounded cursor-pointer inline-flex"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedSort.charAt(0).toUpperCase() + selectedSort.slice(1)}
          <svg
            className="w-4 h-4 ml-1 mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            )}
          </svg>
        </button>
        {isOpen && (
          <div
            className="absolute right-0 left-0 mt-1 bg-black border-2 border-gray-500 rounded shadow-lg z-40"
          >
            <button
              className="block w-full text-left py-1 px-4 lg:text-base cursor-pointer bg-black hover:bg-blue-950"
              onClick={() => handleSortClick("newest")}
            >
              Newest
            </button>
            <button
              className="block w-full text-left py-1 px-4 lg:text-base cursor-pointer bg-black hover:bg-blue-950"
              onClick={() => handleSortClick("oldest")}
            >
              Oldest
            </button>
            {pageType === "public" || pageType === "profilePublic" &&
              <button
                className="block w-full text-left py-1 px-4 lg:text-base cursor-pointer bg-black hover:bg-blue-950"
                onClick={() => handleSortClick("popular")}
              >
                Popular
              </button>
            }
            {pageType === "public" &&
              <button
                className="block w-full text-left py-1 px-4 lg:text-base cursor-pointer bg-black hover:bg-blue-950"
                onClick={() => handleSortClick("random")}
              >
                Random
              </button>
            }
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownSortBtn;
