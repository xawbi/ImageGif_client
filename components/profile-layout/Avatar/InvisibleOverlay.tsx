import {FC} from 'react'

interface AvatarProps {
  onClick: () => void;
  z: number;
  setIsEditVisible?: (isVisible: boolean) => void
}
const InvisibleOverlay: FC<AvatarProps> = ({onClick, z, setIsEditVisible}) => {
  return (
    <div onMouseEnter={() => setIsEditVisible && setIsEditVisible(true)}
         className={`fixed inset-0 z-${z} ${z >= 15 && 'bg-black opacity-70'}`}
         onClick={onClick}>
    </div>
  )
}

export default InvisibleOverlay