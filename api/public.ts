'use server'
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import { RatingDto } from "@/api/dto/rating.dto";

const host = process.env.NEXT_PUBLIC_HOST

export async function getPublicFiles() {
  const url = `${host}/public/files`
  const res = await fetch(url, {
    next: { revalidate: 10 },
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