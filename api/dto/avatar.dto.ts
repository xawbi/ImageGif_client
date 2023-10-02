import {UserDTO} from "@/api/dto/user.dto";

export interface AvatarDto {
  id: number
  fileName: string
  originalName: string
  size: number
  mimetype: string
  user: UserDTO
  x: string
  y: string
  width: string
  height: string
  createAt: string
  updateAt: string
}