"use client";
import { ReactNode, useLayoutEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Skeleton } from "@/components/ui/skeleton";

interface ComponentsProps {
  children: ReactNode;
  filesLength: number | undefined | null;
}

export default function MasonryClient({ children, filesLength }: ComponentsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  };

  return (
    <>
      {isLoading && <>
        <div
          className="px-1 colums-1 min-[400px]:columns-2 min-[700px]:columns-3 min-[1100px]:columns-4 min-[1600px]:columns-5 gap-2.5">
          {filesLength && filesLength > 0 ?
            <>
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
              {filesLength === 25 &&
                <>
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
                </>
              }
            </>
            : <div>Loading...</div>
          }
        </div>
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
