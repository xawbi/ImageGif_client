'use server'

import { revalidateTag } from "next/cache";

const host = process.env.NEXT_PUBLIC_HOST

export async function revalidatePublicFiles() {
  revalidateTag('getPublicFiles')
}

export async function revalidateUserPublicFiles() {
  revalidateTag('getUserPublicFiles')
}

export async function updateView(fileId: number) {
  console.log(`${host}/public/file/${fileId}/updateView`)
  const res = await fetch(`${host}/public/file/${fileId}/updateView`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(res)
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function getPublicFiles(type: string, page: number, sort?: string) {
  const res = await fetch(`${host}/public/files?type=${type}&sort=${sort}&page=${page}&per_page=${30}`, {
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

export async function getUserPublicFiles(userId: number, page: number, sort?: string) {
  const res = await fetch(`${host}/public/userFiles/${userId}?sort=${sort}&page=${page}&per_page=${8}`, {
    next: { revalidate: 10, tags: ['getUserPublicFiles'] },
    method: 'GET',
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function getSearchPost(search: string, limit: number = 10) {
  const encodedSearchValue = encodeURIComponent(search)
  const res = await fetch(`${host}/public/searchPosts?postNameAndDesc=${encodedSearchValue}&limit=${limit}`, {
    method: 'POST'
  });
  if (!res.ok) {
    console.error(res.status, res.statusText);
  } else {
    return res.json();
  }
}

export async function getFile(id: number) {
  const res = await fetch(`${host}/public/file/${id}`, {
    method: 'GET',
    next: { revalidate: 0 }
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
    next: { tags: ['getComments'] },
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}