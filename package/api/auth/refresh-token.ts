import { AxiosError } from "axios"
import axios from "axios"
import Cookies from "universal-cookie"

export type RefreshTokenResponse = {
  status: number
}

export async function refreshToken(): Promise<RefreshTokenResponse | undefined> {
  try {
    const cookies = new Cookies()
    const refreshTokenValue = cookies.get("TermCatRefreshToken")

    if (!refreshTokenValue) {
      console.error("No refresh token found in cookies")
      return undefined
    }

    const response = await axios.post<{ accessToken: string }>(
      "/api/auth/refresh",
      { refreshToken: refreshTokenValue },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    const { accessToken } = response.data

    if (typeof window !== "undefined") {
      cookies.set("TermCatAccessToken", accessToken, { path: "/", maxAge: 13 * 60 })
    }

    return { status: 200 }
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    console.error("Refresh token error:", axiosError.response?.data || axiosError.message)
    return undefined
  }
}
