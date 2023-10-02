'use server'
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

const host = process.env.NEXT_PUBLIC_HOST

export async function getPublicFiles() {
  const url = `${host}/public/files`
  const res = await fetch(`${url}`, {
    next: { revalidate: 36 },
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