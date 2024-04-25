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

export async function logout() {
  await cookies().delete('_token')
  revalidatePath('/')
  revalidatePath('/profile')
}
