import {UserDTO} from "@/api/dto/user.dto";

export interface FileDTO {
  id: number
  fileName: string
  width: number
  height: number
  size: number
  user: UserDTO
  restricted: string
  totalLike: string
  totalDislike: string
  reject: boolean
  deleteAt: string | null
}