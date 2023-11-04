'use client'
import Masonry from "react-masonry-css";
import { ScriptProps } from "next/script";

export default function MasonryClient({ children }: ScriptProps) {

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {children}
      </Masonry>
    </>
  );
};