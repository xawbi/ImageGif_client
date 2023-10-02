import axios from "axios"
import { parseCookies } from "nookies"

const axiosWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
})

axiosWithAuth.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const { _token } = parseCookies()
    config.headers.Authorization = 'Bearer ' + _token
  }
  return config
})

export default axiosWithAuth