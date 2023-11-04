import {UserDTO} from "@/api/dto/user.dto";

export interface AvatarDto {
  id: number
  fileName: string
  size: number
  user: UserDTO
  x: string
  y: string
  width: string
  height: string
  createAt: string
  updateAt: string
}