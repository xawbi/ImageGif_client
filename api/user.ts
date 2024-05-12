'use server'
import {cookies} from "next/headers";
import { notFound } from "next/navigation";

const host = process.env.NEXT_PUBLIC_HOST

export async function getUser() {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/users/me`, {
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

export async function getUserPublic(userId: number) {
  const res = await fetch(`${host}/users/public/${userId}`, {
    method: 'GET'
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
    notFound()
  } else {
    return res.json()
  }
}