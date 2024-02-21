'use server'

import { revalidateTag } from "next/cache";

const host = process.env.NEXT_PUBLIC_HOST

export async function revalidatePublicFiles() {
  revalidateTag('getPublicFiles')
}

export async function updateView(fileId: number) {
  console.log(`${host}/public/file/${fileId}/updateView`)
  const res = await fetch(`${host}/public/file/${fileId}/updateView`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  console.log(res)
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function getPublicFiles(type: string, sort?: string) {
  const res = await fetch(`${host}/public/files?type=${type}&sort=${sort}`, {
    next: { revalidate: 10, tags: ['getPublicFiles'] },
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function getFile(id: number) {
  const url = `${host}/public/file/${id}`
  const res = await fetch(url, {
    next: { revalidate: 0 },
    method: 'GET'
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function getPublicFileRating (fileId: number) {
  const res = await fetch(`${host}/public/${fileId}/fileRating`, {
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

export async function getPublicComments (fileId: number) {
  const res = await fetch(`${host}/public/${fileId}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['getComments'] },
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}