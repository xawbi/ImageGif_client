'use client'
import { ChangeEvent, FC, useEffect, useState } from "react";
import {delAvatar, saveAvatar} from "@/api/avatar"
import Cropper from "react-easy-crop";
import {AvatarDto} from "@/api/dto/avatar.dto";
import {UserDTO} from "@/api/dto/user.dto";
import CircleAvatar from "@/components/profile-layout/Avatar/CircleAvatar";
import InvisibleOverlay from "@/components/profile-layout/Avatar/InvisibleOverlay";

interface profileLayoutProps {
  avatar: AvatarDto
  user: UserDTO
}

const Avatars: FC<profileLayoutProps> = ({avatar, user}) => {

  interface CroppedAriaInterface {
    x: number
    y: number
    width: number
    height: number
  }

  const [saveAvatarOpen, setSaveAvatarOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  //crop avatar
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<CroppedAriaInterface | null>(null)

  const openDialog = () => {
    setSaveAvatarOpen(true)
  }

  const closeDialog = () => {
    setSaveAvatarOpen(false)
    setIsEditVisible(false)
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [modalIsOpen])

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl); // Сохраните URL изображения в состоянии
      setModalIsOpen(true); // Откройте модальное окно
    }
  }

  const closeCropModal = () => {
    setModalIsOpen(false)
    setCrop({x: 0, y: 0})
    setZoom(1)
    closeDialog()
  }

  const handleRemoveAvatar = async () => {
    if (avatar && typeof window !== 'undefined' && window.confirm('Are you sure you want to remove this photo?')) {
      await delAvatar(avatar.id);
    }
  }

  return (
    <>
      <div className="flex flex-row">
        <div className='relative rounded-full'>
          <div
            className='relative cursor-pointer border-4 border-gray-500 overflow-hidden rounded-full w-28 h-28 lg:w-40 lg:h-40 sm:w-32 sm:h-32 mr-4'
            onClick={openDialog}
            onMouseEnter={() => setIsEditVisible(true)}
            onMouseLeave={() => setIsEditVisible(false)}
          >
            <CircleAvatar avatarParams={avatar}/>
          </div>
          {isEditVisible &&
            <div
              onMouseEnter={() => setIsEditVisible(true)}
              onMouseLeave={() => setIsEditVisible(false)}
              className="absolute flex items-center bottom-0 right-0 rounded-md p-1 mb-1 lg:mb-2 mr-2 bg-black border-2 border-gray-500 cursor-pointer opacity-100 transition-opacity"
              onClick={openDialog}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                </svg>
                <div className="ml-0.5 lg:text-base text-sm">Edit</div>
            </div>
          }
        </div>
        <span className="text-base sm:text-xl font-medium">{user && user.username}</span>
      </div>
      {saveAvatarOpen && (
        <>
          <InvisibleOverlay onClick={closeDialog} z={14} setIsEditVisible={setIsEditVisible}/>
          <div
            className={`absolute left-34 ${avatar ? 'top-[140px]' : 'top-[162px]'} xl:left-94 ${avatar ? 'xl:top-44' : 'xl:top-[202px]'} lg:left-74 ${avatar ? 'lg:top-44' : 'lg:top-[202px]'} md:left-[246px] sm:left-[166px] ${avatar ? 'sm:top-[156px]' : 'sm:top-[180px]'} lg:text-base text-sm z-[16]`}>
            <form action={saveAvatar} onSubmit={closeCropModal}>
              {avatar ?
                <label htmlFor="avatarInput"
                       className="p-1 px-2 bg-black border-2 border-b-0 border-gray-500 cursor-pointer rounded-t-md hover:bg-blue-950">
                  Upload a photo...
                </label>
                :
                <label htmlFor="avatarInput"
                       className="p-2 bg-black border-2 border-gray-500 cursor-pointer rounded-md hover:bg-blue-950">
                  Upload a photo...
                </label>
              }
              <input
                accept='image/jpeg, image/png, image/gif'
                type="file"
                id="avatarInput"
                name="avatar"
                className="hidden"
                onChange={handleImageUpload}
              />
              {croppedArea &&
                <input
                  type='text'
                  name='avatarParams'
                  style={{display: 'none'}}
                  value={`{"x": ${croppedArea.x}, "y": ${croppedArea.y}, "width": ${croppedArea.width}, "height": ${croppedArea.height}}`}
                  readOnly
                />
              }
              {modalIsOpen && (
                <>
                  <InvisibleOverlay onClick={closeCropModal} z={15} setIsEditVisible={setIsEditVisible}/>
                  <div
                    className="fixed pb-2 bg-black rounded-2xl border-2 border-gray-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    {/*<Image height={400} width={400} src={uploadedImageUrl} className='max-h-[600px] w-auto' alt="Uploaded Avatar" />*/}
                    <div
                      className='relative w-[290px] h-[290px] lg:w-[410px] lg:h-[410px] sm:w-[360px] sm:h-[360px] overflow-hidden bg-black rounded-2xl'>
                      <Cropper
                        image={uploadedImageUrl}
                        crop={crop}
                        zoom={zoom}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropAreaChange={(croppedArea: CroppedAriaInterface) => {
                          setCroppedArea(croppedArea);
                        }}
                      />
                    </div>
                    <div className='mx-2 flex items-baseline justify-between'>
                      <input
                        type="range"
                        id="zoom"
                        name="zoom"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-[94%]"
                      />
                      <output className="text-white text-sm mt-4">{zoom}</output>
                    </div>
                    <div className='mx-2 flex justify-around'>
                      <button className='w-full hover:text-gray-300 transition' onClick={closeCropModal}>Close</button>
                      <button className='w-full hover:text-fuchsia-600 transition' type='submit'>Send</button>
                    </div>
                  </div>
                </>
              )}
            </form>
            {avatar &&
              <div
                onClick={handleRemoveAvatar}
                className="p-1 px-2 bg-black border-2 border-t-0 border-gray-500 cursor-pointer rounded-b-md hover:bg-blue-950">
                Remove photo
              </div>
            }
          </div>
        </>
      )}
    </>
  )
}

export default Avatars