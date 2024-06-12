import { Skeleton } from "@/components/ui/skeleton";
import DropdownSortBtn from "@/components/DropdownSortBtn";
import React from "react";
import { cookies } from "next/headers";
import ChooseFileBtn from "@/components/profile/UploadFile/ChooseFileBtn";

export default function loading() {
  const selectedSortCookie = cookies().get("selectedSortPublic")?.value

  return (
    <>
      <div className='flex m-2 mx-[5px] justify-between'>
        <DropdownSortBtn selectedSortCookie={selectedSortCookie} pageType='profile'/>
        <ChooseFileBtn/>
      </div>
      <div
        className="px-1 colums-1 min-[400px]:columns-2 min-[700px]:columns-3 min-[1100px]:columns-4 min-[1600px]:columns-5 gap-2.5">
        <Skeleton className="w-full mb-3">
          <div className="inline-block max-w-[100%]" style={{ width: 100, height: 170 }}></div>
        </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 210 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 150 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 220 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 260 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 300 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 280 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 360 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 160 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 270 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 200 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 150 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 340 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 230 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 380 }}></div>
      </Skeleton>
        <Skeleton className="w-full mb-3">
          <div className="inline-block max-w-[100%]" style={{ width: 100, height: 280 }}></div>
        </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 150 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 220 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 230 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 310 }}></div>
      </Skeleton><Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" style={{ width: 100, height: 310 }}></div>
      </Skeleton>
      </div>
    </>
  );
}