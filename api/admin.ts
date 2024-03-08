'use server'
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

const host = process.env.NEXT_PUBLIC_HOST

export async function getFilePending(page: number) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/admin/files/pending?page=${page}&per_page=${20}`, {
    method: 'GET',
    next: { revalidate: 36 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function updatePublic(ids: number[]) {
  const token = cookies().get("_token")?.value
  const idsString = ids.join(',');
  const res = await fetch(`${host}/admin/files/updateRestricted?ids=${idsString}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids })
  })
  revalidatePath('/admin')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function updateReject(ids: number[], page: string) {
  const token = cookies().get("_token")?.value
  const idsString = ids.join(',');
  const res = await fetch(`${host}/admin/files/reject?ids=${idsString}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids })
  })
  page === 'admin' ? revalidatePath('/admin') : revalidatePath('/')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function delPublicFile(id: number) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/admin/files/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  revalidatePath('/')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}