'use server'
import { cookies } from "next/headers";
import { RatingDto } from "@/api/dto/rating.dto";

const host: string | undefined = process.env.NEXT_PUBLIC_HOST

export async function postRating(ratingObj: RatingDto) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/rating`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ratingObj)
  })
  if (res.ok) {
    const data = await res.json()
  } else {
    console.error('Ошибка при отправке данных на сервер:', res.status, res.statusText)
  }
}