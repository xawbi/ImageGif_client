import { UserDTO } from "@/api/dto/user.dto";
import { RatingType } from "@/api/dto/file.dto";

export interface CommentDto {
  text: string
  fileId: number
  parentCommentId?: number
}

export type CommentType = {
  id: number
  text: string
  user: UserDTO
  rating: RatingType[]
  createAt: string
  childComments: CommentType[]
  parentComment: {id: number, user: UserDTO}
  childCommentsCount: number
}