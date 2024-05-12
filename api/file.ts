'use server'
import {cookies} from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { PostFileDTO } from "@/api/dto/file.dto";

const host: string | undefined = process.env.NEXT_PUBLIC_HOST

export async function revalidateUserFiles() {
  revalidateTag('getUserFiles')
}

export async function getUserFiles(type: string, page: number, sort?: string, per_page = 100) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/files?type=${type}&sort=${sort}&page=${page}&per_page=${per_page}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
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
  revalidateTag('getUserFiles')
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
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  revalidateTag('getUserFiles')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function revalidateProfile() {
  revalidatePath('profile')
}