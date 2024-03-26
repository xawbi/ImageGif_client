import { AvatarDto } from "@/api/dto/avatar.dto";

export interface UserDTO {
  id: number
  email: string
  isEmailConfirmed: boolean
  activationCode: string
  username: string
  role: string
  avatar: AvatarDto[]
  openFavorites: boolean
  ban: boolean
  createAt: string
  updateAt: string
}