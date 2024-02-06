'use server'
import {cookies} from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { PostFileDTO } from "@/api/dto/file.dto";
import { json } from "stream/consumers";

const host: string | undefined = process.env.NEXT_PUBLIC_HOST

export async function getUserFile(type: string) {
  const token = cookies().get("_token")?.value
  const url = `${host}/files?type=${type}`
  const res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function updateUserRestricted(id: number, obj: PostFileDTO ) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/files/${id}/updateRestricted`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  })
  revalidatePath('/profile')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function delFile(id: number) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/files/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  revalidatePath('/profile')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function revalidateProfile() {
  revalidatePath('profile')
}

export async function getFavorites() {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/favorites`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    next: { tags: ['getFavorites'] },
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function postFavorites(fileId: number) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/favorites/${fileId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  if (res.ok) {
    revalidateTag('getFavorites')
  } else {
    console.error('Ошибка при отправке данных на сервер:', res.status, res.statusText)
  }
}