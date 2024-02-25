"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { ScriptProps } from "next/script";
import Masonry from "react-masonry-css";
import useWindowSize from "@rooks/use-window-size";
import { useStore } from "@/store/useStore";
import { useScroll } from "@/store/useScroll";

export default function MasonryClient({ children }: ScriptProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  // const scrollPosition = useStore(useScroll, (state) => state.scroll);
  //
  // useEffect(() => {
  //   if (scrollPosition) {
  //     window.scrollTo(0, scrollPosition);
  //   }
  // }, [scrollPosition]);

  useLayoutEffect(() => {
    const loadMasonry = async () => {
      setIsMounted(true);
      setIsLoading(false);
    };

    loadMasonry().then(r => r);
  }, []);

  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1100: 3,
    700: 2,
    400: 1
  }

  return (
    <>
      {isLoading && <>
        <p>Loading...</p>
        <div className="hidden">{children}</div>
      </>
      }
      {isMounted &&
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {children}
        </Masonry>
      }
    </>
  );
}
