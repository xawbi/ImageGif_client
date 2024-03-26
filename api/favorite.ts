'use server'
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

const host: string | undefined = process.env.NEXT_PUBLIC_HOST

export async function getFavorites(page: number, sort: string | undefined, per_page = 10) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/favorites?sort=${sort}&page=${page}&per_page=${per_page}`, {
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

export async function getFavoritesPublic(userId: number, page: number, per_page = 10) {
  const res = await fetch(`${host}/favorites/public/${userId}?sort=newest&page=${page}&per_page=${per_page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
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

export async function updateUserFavorites() {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/favorites/updateUserFavorites`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  revalidatePath('/profile')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}