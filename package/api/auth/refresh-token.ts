import { AxiosError } from "axios"
import client from "@/package/api/axios.client"
import Cookies from "universal-cookie"

export type RefreshTokenResponse = {
  status: number
}

export async function refreshToken(): Promise<RefreshTokenResponse | unknown> {
  try {
    const response = await client<{ accessToken: string }>({
      method: "POST",
      url: "/auth/refresh",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const { accessToken } = response.data

    if (typeof window !== "undefined") {
      const cookies = new Cookies()
      cookies.set("accessToken", accessToken, { path: "/", maxAge: 13 * 60 })
    }

    return { status: 200 }
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    console.error("Refresh token error:", axiosError.response?.data || axiosError.message)
    return undefined
  }
}
