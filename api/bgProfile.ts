'use server'
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const host = process.env.NEXT_PUBLIC_HOST

export async function getBgId() {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/bgProfile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    next: { tags: ['getBgId'] },
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
    return null
  } else {
    return res.json()
  }
}

export async function postBgId() {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/bgProfile`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (res.ok) {
    revalidateTag('getBgId')
    console.log('Данные успешно отправлены на сервер:')
  } else {
    console.error('Ошибка при отправке данных на сервер:', res.status, res.statusText)
  }
}
