'use client'
import { FC, ReactNode, useEffect } from "react";
import { useScroll } from "@/store/useScroll";
import { useStore } from "@/store/useStore";
import { updateView } from "@/api/public";

interface PageProps {
  children: ReactNode
}

export const HandleLink: FC<PageProps> = ({ children }) => {
  const setScroll = useScroll(state => state.setScroll)

  const handleScroll = () => {
    if (window) return setScroll(window.scrollY)
  }

  return (
    <>
      <div onClick={handleScroll}>
        {children}
      </div>
    </>
  )
}

export const SetScroll: FC<PageProps> = ({children}) => {
  // const scrollPosition = useStore(useScroll ,(state) => state.scroll)
  //
  // useEffect(() => {
  //   if (scrollPosition) {
  //     window.scrollTo(0, scrollPosition);
  //   }
  // }, [scrollPosition]);

  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [])

  return (
    <>
      {children}
    </>
  )
}