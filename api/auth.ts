'use server'
import {
  LoginFormDTO,
  LoginResponseDTO,
  RegistrationFormDTO,
  ActivateResponseDTO,
  ActivateFormDTO
} from "@/api/dto/auth.dto";
import axiosWithAuth from "@/api/core/axios";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

const host = process.env.NEXT_PUBLIC_HOST

export const login = async (values: LoginFormDTO): Promise<LoginResponseDTO> => {
  const {data} = await axiosWithAuth.post('/auth/login', values)
  return data
}

export const register = async (values: RegistrationFormDTO) => {
  const {data} = await axiosWithAuth.post('/auth/register', values)
  return data
}

export const activate = async (values: ActivateFormDTO): Promise<ActivateResponseDTO> => {
  const {data} = await axiosWithAuth.post('/auth/register/activate', values)
  return data
}

export type objEmailType = {
  email: string
}

export async function resetPassword(obj: objEmailType) {
  const res = await fetch(`${host}/auth/password/reset`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (res.ok) {
    return 'The email with the password reset link has been sent.'
  } else {
    const errorMessage = await res.json()
    if (typeof errorMessage.message === 'string') {
      return errorMessage.message
    } else return errorMessage.message[0]
  }
}

export type objNewPasswordType = {
  newPassword: string,
  confirmNewPassword: string
}

export async function changePassword(obj: objNewPasswordType, token: string) {
  const res = await fetch(`${host}/auth/password/change/${token}`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (res.ok) {
    return 'Password successfully changed.'
  } else {
    const errorMessage = await res.json()
    if (typeof errorMessage.message === 'string') {
      return errorMessage.message
    } else return errorMessage.message[0]
  }
}

export async function checkValidPasswordToken(token: string) {
  const res = await fetch(`${host}/auth/checkToken/${token}`, {
    method: 'GET'
  })
  if (res.ok) {
    return await res.json()
  } else {
    const errorMessage = await res.json()
    console.log(errorMessage.message)
  }
}

export async function logout() {
  await cookies().delete('_token')
  revalidatePath('/')
  revalidatePath('/profile')
}