import {cookies, headers} from "next/headers";
import jwt from 'jsonwebtoken'
import {UserDTO} from "@/api/dto/user.dto";

export function checkVerify() {
  const token = cookies().get("_token")?.value
  if (token !== undefined) {
    try {
      return jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    } catch (error) {
      return null; // Возвращаем null в случае ошибки или невалидного токена
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