import client, { type RequestConfig, type ResponseConfig } from "../axios.client"
import { setClientTokens } from "@/utils/setTokens"

export type RegisterBody = {
  email: string
  password: string
  name: string
}

export type RegisterResponse = {
  accessToken?: string
  refreshToken?: string
  user?: {
    id: string
    email: string
    name: string
  }
}

export type RegisterResult = {
  success: boolean
  data?: RegisterResponse
  error?: string
}

export async function registerUser(email: string, password: string, name: string): Promise<RegisterResult> {
  const config: RequestConfig<RegisterBody> = {
    method: "POST",
    url: "/api/auth/register",
    baseURL: "/",
    data: { email, password, name },
    headers: { "Content-Type": "application/json" }
  }

  try {
    const response: ResponseConfig<RegisterResponse> = await client<RegisterResponse, unknown, RegisterBody>(config)

    if (!response.data || !response.data.accessToken || !response.data.refreshToken) {
      return { success: false, error: "Invalid tokens received" }
    }
    const { accessToken, refreshToken } = response.data
    setClientTokens(accessToken, refreshToken)

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed"
    }
  }
}
