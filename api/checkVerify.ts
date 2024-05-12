import {cookies} from "next/headers";
import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import {UserDTO} from "@/api/dto/user.dto";

export function checkVerify() {
  const token = cookies().get("_token")?.value
  if (token !== undefined) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY as Secret | GetPublicKeyOrSecret);
    } catch (error) {
      return null
    }
  } else return null
}

export async function checkAdmin() {
  const host = process.env.NEXT_PUBLIC_HOST
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/users/me`, {
    headers: {'Authorization': `Bearer ${token}`}
  })
  const user: UserDTO = await res.json()
  return user.role === 'admin';
}

export async function checkBan() {
  const host = process.env.NEXT_PUBLIC_HOST
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/users/me`, {
    headers: {'Authorization': `Bearer ${token}`}
  })
  const user: UserDTO = await res.json()
  if (user.id) {
    return user.ban
  } else return false
}