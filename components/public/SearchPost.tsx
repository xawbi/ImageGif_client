"use client";
import React, { FC, useEffect, useState } from "react";
import { useDebounce } from "@/components/customHooks";
import { getSearchPost } from "@/api/public";
import { FileDTO } from "@/api/dto/file.dto";
import Image from "next/image";
import Link from "next/link";
import InvisibleOverlay from "@/components/profile-layout/Avatar/InvisibleOverlay";

const SearchPost: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchPostData, setSearchPostData] = useState<FileDTO[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debounce = useDebounce(searchValue);

  const searchPost = async (searchValue: string) => {
    const posts = await getSearchPost(searchValue);
    setSearchPostData(posts);
    setIsOpen(posts.length > 0);
  }

  useEffect(() => {
    searchPost(debounce);
  }, [debounce]);

  const closeSearch = () => {
    setIsOpen(false);
  }

  const handleInputClick = () => {
    if (searchPostData.length > 0 && !isOpen) {
      setIsOpen(true);
    }
  }

  return (
    <>
      <div className="relative inline-block">
        <div className="flex items-center text-white py-1 px-3 rounded border-2 border-gray-500 lg:text-base text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor"
               className="w-5 h-5 mr-1.5">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            maxLength={40}
            placeholder="Enter post name"
            className={`flex-grow px-2 border border-gray-300 focus:outline-none bg-black border-none ${isOpen && 'z-40'}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={handleInputClick}
          />
        </div>
        {searchPostData.length > 0 && isOpen &&
          <>
            {isOpen && <InvisibleOverlay onClick={closeSearch} z={10} />}
            <div
              className="absolute right-0 left-0 mt-1 bg-black border-2 border-gray-500 rounded shadow-lg z-40 w-[110%] py-2"
            >
              <>
                {searchPostData.map((post) => {
                  const fileUrl = process.env.NEXT_PUBLIC_HOST + "/uploads/" + `${post.user.id}/` + post.fileName;
                  return (
                    <Link href={`gallery/${post.id}`} className="flex items-center cursor-pointer hover:bg-blue-950 p-2 pr-3"
                          key={post.id}>
                      <div className="relative w-20 h-12">
                        <Image
                          src={fileUrl}
                          alt={post.postName}
                          className="object-cover max-w-full max-h-full border border-gray-500 rounded"
                          width={post.width}
                          height={post.height}
                        />
                      </div>
                      <p
                        className="inline-block ml-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {post.postName}
                      </p>
                    </Link>
                  )
                })}
              </>
            </div>
          </>
        }
      </div>
    </>
  );
};



export default SearchPost;