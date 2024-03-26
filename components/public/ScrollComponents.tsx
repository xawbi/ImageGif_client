'use client'
import { FC, ReactNode, useEffect } from "react";

interface PageProps {
  children: ReactNode
}

export const SetScroll: FC<PageProps> = ({ children }) => {

  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [])

  return <>{children}</>;
};