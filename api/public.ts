'use server'

import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

const host = process.env.NEXT_PUBLIC_HOST

export async function revalidatePublicFiles() {
  revalidateTag('getPublicFiles')
}

export async function revalidateUserPublicFiles() {
  revalidateTag('getUserPublicFiles')
}

export async function updateView(fileId: number) {
  const res = await fetch(`${host}/public/file/${fileId}/updateView`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function getPublicFiles(userId: string = '', allType: string = '', sort: string = '', page: number, per_page = 100) {
  const res = await fetch(`${host}/public/files?userId=${userId}&all=${allType}&sort=${sort}&page=${page}&per_page=${per_page}`, {
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

export async function getUserPublicFiles(userId: number, page: number, sort: string | undefined, per_page = 100) {
  const res = await fetch(`${host}/public/files/${userId}?sort=${sort}&page=${page}&per_page=${per_page}`, {
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
  const encodedSearchValue = encodeURIComponent(search);
  const url = `${host}/public/searchPosts?postNameAndDesc=${encodedSearchValue}&limit=${limit}`;
  const res = await fetch(url, {
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
    console.error(res.status, res.statusText);
    notFound()
  } else {
    return res.json();
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

export async function getPublicComments (fileId: number, page: number = 1, per_page: number = 16) {
  const res = await fetch(`${host}/public/${fileId}/comments?page=${page}&per_page=${per_page}`, {
    method: 'GET',
    next: { tags: ['getComments'] },
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function getPublicCommentsLength (fileId: number) {
  const res = await fetch(`${host}/public/${fileId}/commentsLength`, {
    method: 'GET',
    next: { tags: ['getComments'] },
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}