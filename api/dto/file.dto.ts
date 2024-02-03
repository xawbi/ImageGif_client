import {UserDTO} from "@/api/dto/user.dto";

export type RatingType = {
  user: { id: number }
  like: number
  dislike: number
}

export interface PostFileDTO {
  postName: string
  postDescription: string | null
}

export interface FileDTO {
  id: number
  fileName: string
  width: number
  height: number
  size: number
  user: UserDTO
  restricted: string
  totalDislike: number[]
  rating: RatingType[]
  reject: boolean
  deleteAt: string | null
  postName: string
  postDescription: string
}