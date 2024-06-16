import Link from "next/link";
import Image from "next/image";
import falling_man from "@/public/404/falling_man_for_404_page.webp";

export default function NotFound() {
  return <>
    <div className="flex flex-col items-center">
      <p className="text-[40px] md:text-[50px] font-bold pt-5">404</p>
      <p className='text-[20px] md:text-[30px] mt-[-8px] mb-2'>Not found</p>
      <p>
        <Link href="/" className='bg-white text-black p-1 font-bold rounded-lg hover:bg-black hover:text-white transition'>Go back to Home</Link>
      </p>
      <div
        className="w-full xl:w-1/2 xl:mb-0">
        <Image key="22" src={falling_man} alt="" width={800} height={800}
               className="object-contain w-full max-h-[calc(100svh-220px)]"
               unoptimized={true} />
      </div>
    </div>
  </>;
}