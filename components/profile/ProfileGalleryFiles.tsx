'use client'
import {FC} from 'react'
import UserFiles from "@/components/profile/UserFiles";
import {FileDTO} from "@/api/dto/file.dto";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

interface ProfilePageProps {
  userFiles: FileDTO[]
}

const ProfileGalleryFiles: FC<ProfilePageProps> = ({userFiles}) => {
  return (
    <>
      <div className='px-3 md:px-0'>
        <ResponsiveMasonry
          columnsCountBreakPoints={{300: 1, 550: 2, 750: 3, 900: 4}}
        >
          <Masonry gutter='12px'>
            {userFiles && userFiles.map((file) => {
              return (
                <>
                  <UserFiles file={file}/>
                </>
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  )
}

export default ProfileGalleryFiles