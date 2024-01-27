'use client'

interface UserRating {
  postId: number
  userId: number
  like: number
  dislike: number
}

type StateRating = {
  rating: UserRating
}