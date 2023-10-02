export interface LoginFormDTO {
  email: string
  password: string
}

export interface RegistrationFormDTO {
  username: string
  email: string
  password: string
}

export interface ActivateFormDTO {
  username: string
  email: string
  password: string
  activationCode: string
}

export interface LoginResponseDTO {
  token: string
}

export type ActivateResponseDTO = LoginResponseDTO