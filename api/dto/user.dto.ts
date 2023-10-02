export interface UserDTO {
  id: number
  email: string
  isEmailConfirmed: boolean
  activationCode: string
  username: string
  role: string
}