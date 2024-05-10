'use server'
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

const host = process.env.NEXT_PUBLIC_HOST

export async function saveAvatar(form: FormData) {
  const token = cookies().get("_token")?.value;
  const avatar = form.get('avatar');
  const avatarParams = form.get('avatarParams');
  let obj: { [key: string]: any } | null = null;
  typeof avatarParams === "string" && (obj = JSON.parse(avatarParams))
  const formData = new FormData();
  avatar instanceof Blob && formData.append('file', avatar)
  if (obj !== null) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }
  }
  const res = await fetch(`${host}/avatars`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  if (res.ok) {
    const data = await res.json()
    revalidatePath('/profile')
  } else {
    console.error('Ошибка при отправке данных на сервер:', res.status, res.statusText)
  }
}

export async function getAvatar() {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/avatars`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function getAvatarPublic(userId: number) {
  const res = await fetch(`${host}/avatars/public/${userId}`, {
    next: { revalidate: 1 },
    method: 'GET'
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function delAvatar(id: number) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/avatars/${id}/delete`, {
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