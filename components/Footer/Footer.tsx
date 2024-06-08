'use client'
import Image from 'next/image';
import Telegram from "@/public/footerIcon/Telegram.png";
import Vk from "@/public/footerIcon/Vk.png";
import Email from "@/public/footerIcon/Email.png";
import { useEffect, useState } from "react";
import styles from './styles.module.css'

export default function Footer() {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  return (
    <>
      {isAtTop &&
        <footer
          className={`h-10 w-full bg-gray-900 flex items-center sticky bottom-0 z-10 justify-center rounded-t-md ${
            isAtTop && styles.footerEnter
          }`}
        >
          © 2024 ImageGif, Inc │
          <a href="https://t.me/xawbi" target="_blank">
            <Image
              src={Telegram}
              width='25'
              height='25'
              alt="Telegram"
              className='border-[1px] border-white p-[3px] rounded-full ml-1 mr-1'
            />
          </a>
          <a href="https://vk.com/id238979373" target="_blank">
            <Image
              src={Vk}
              width='25'
              height='25'
              alt="VK"
              className='border-[1px] border-white p-[3px] rounded-full ml-1 mr-1'
            />
          </a>
          <a href="mailto:gushin.adam@yandex.ru" target="_blank">
            <Image
              src={Email}
              width='25'
              height='25'
              alt="Email"
              className='border-[1px] border-white p-[3px] rounded-full ml-1'
            />
          </a>
        </footer>
      }
    </>
  )
}