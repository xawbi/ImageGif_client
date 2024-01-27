import {UserDTO} from "@/api/dto/user.dto";

export type RatingType = {
  user: { id: number }
  like: number
  dislike: number
}

export interface FileDTO {
  id: number
  fileName: string
  width: number
  height: number
  size: number
  user: UserDTO
  restricted: string
  totalLike: number[]
  totalDislike: number[]
  rating: RatingType[]
  reject: boolean
  deleteAt: string | null
}