'use server'
import {cookies} from "next/headers";

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