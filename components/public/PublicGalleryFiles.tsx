'use client'
import { FC, useEffect } from "react";
import {FileDTO} from "@/api/dto/file.dto";
import {UserDTO} from "@/api/dto/user.dto";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import PublicFiles from "@/components/public/PublicFiles";

interface HomePageProps {
  filesPublic: FileDTO[]
  user: UserDTO
}

const PublicGalleryFiles: FC<HomePageProps> = ({filesPublic, user}) => {

  return (
    <>
      <div className='py-5 px-3 md:px-0'>
        <ResponsiveMasonry
          columnsCountBreakPoints={{300: 1, 550: 2, 750: 3, 900: 4}}
        >
          <Masonry gutter='12px'>
            {filesPublic && filesPublic.map((file) =>
              <PublicFiles key={file.id} file={file} user={user}/>
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  )
}

export default PublicGalleryFiles