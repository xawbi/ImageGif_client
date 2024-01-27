'use server'
import { cookies } from "next/headers";
import { CommentDto } from "@/api/dto/comment.dto";
import { revalidatePath, revalidateTag } from "next/cache";
import { tag } from "postcss-selector-parser";

const host = process.env.NEXT_PUBLIC_HOST

export async function postComment(commentObj: CommentDto) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentObj)
  })
  if (res.ok) {
    const data = await res.json()
    revalidateTag('getComments')
    console.log('Данные успешно отправлены на сервер:', data)
  } else {
    console.error('Ошибка при отправке данных на сервер:', res.status, res.statusText)
  }
}

export async function deleteComment(id: number) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/comments/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  // revalidatePath(`${host}/gallery/${fileId}`)
  revalidateTag('getComments')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}