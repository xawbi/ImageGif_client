"use client";
import { ReactNode, useLayoutEffect, useState } from "react";
import Masonry from "react-masonry-css";
import useWindowSize from "@rooks/use-window-size";
import { Skeleton } from "@/components/ui/skeleton";

interface ComponentsProps {
  children: ReactNode;
  filesLength: number | undefined | null;
}

export default function MasonryClient({ children, filesLength }: ComponentsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize()

  useLayoutEffect(() => {
    const loadMasonry = async () => {
      setIsMounted(true)
      setIsLoading(false)
    };

    loadMasonry().then(r => r)
  }, [])

  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1100: 3,
    700: 2,
    400: 1
  }

  const SkeletonBlock = () => {
    const randomSize = Math.floor(Math.random() * 301) + 100;
    const skeletonDivStyle = {
      width: `${randomSize}px`,
      height: `${randomSize}px`
    };

    return (
      <Skeleton className="w-full mb-3">
        <div className="inline-block max-w-[100%]" key={randomSize} style={skeletonDivStyle}></div>
      </Skeleton>
    )
  }

  return (
    <>
      {isLoading && <>
        <div
          className="px-1 colums-1 min-[400px]:columns-2 min-[700px]:columns-3 min-[1100px]:columns-4 min-[1600px]:columns-5 gap-2.5">
          {filesLength && filesLength > 0 ?
            <>
              {Array.from({ length: Math.min(filesLength, 15) }, (_, index) => (
                <SkeletonBlock key={index} />
              ))}
            </>
            : <div>Loading...</div>
          }
        </div>
        <div className="hidden">{children}</div>
      </>}
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
