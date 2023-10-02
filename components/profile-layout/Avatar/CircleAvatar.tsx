import {FC} from 'react'
import {AvatarDto} from "@/api/dto/avatar.dto";
import Image from "next/image";
import defaultAvatar from "@/public/defautAvatar.png";

interface AvatarProps {
  avatarParams: AvatarDto
}
const CircleAvatar: FC<AvatarProps> = ({avatarParams}) => {
  if (avatarParams !== undefined) {
    const avatarUrl = process.env.NEXT_PUBLIC_HOST + '/avatars/' + `${avatarParams.user.id}/` + avatarParams.fileName
    const scale = 100 / Number(avatarParams.width)
    const x = -avatarParams.x * scale
    const y = -avatarParams.y * scale
    return (
      <Image
        src={avatarUrl}
        alt="aa"
        width={1000}
        height={1000}
        loading={"lazy"}
        className={`pointer-events-none`}
        style={{transform: `translate3d(${x}%, ${y}%, 0) scale3d(${scale},${scale},1)`, transformOrigin: 'top left'}}
      />
    )
  } else return (
    <Image
      src={defaultAvatar}
      fill={true}
      alt="aa"
      className={`pointer-events-none`}
    />
  )
}

export default CircleAvatar