import client, { type RequestConfig, type ResponseConfig } from "../axios.client"
import { setClientTokens } from "@/utils/setTokens"

export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  status: number
  accessToken?: string
  refreshToken?: string
  error?: string
}

export async function loginUser({ email, password }: LoginBody): Promise<LoginResponse> {
  const config: RequestConfig<LoginBody> = {
    method: "POST",
    url: "/api/auth/login",
    baseURL: "/",
    data: { email, password },
    headers: { "Content-Type": "application/json" }
  }

  try {
    const response: ResponseConfig<LoginResponse> = await client<LoginResponse, LoginBody>(config)
    const { accessToken, refreshToken } = response.data

    if (!accessToken || !refreshToken) {
      return { status: 400, error: "Invalid tokens received" }
    }

    setClientTokens(accessToken, refreshToken)

    return { status: 200 }
  } catch (error) {
    return {
      status: 401,
      error: error instanceof Error ? error.message : "Login error"
    }
  }
}
