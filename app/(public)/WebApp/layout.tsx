"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { refreshToken } from "@/package/api/auth/refresh-token"

export default function ProfileLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get("TermCatAccessToken")
      const refreshTokenCookie = Cookies.get("TermCatRefreshToken")

      if (!refreshTokenCookie) {
        router.push("/login")
        return
      }

      if (!accessToken) {
        try {
          const result = await refreshToken()

          if (result && (result as { status: number }).status === 200) {
            console.log("Access token successfully refreshed")
          } else {
            console.error("Failed to refresh token")
            router.push("/login")
          }
        } catch (error) {
          console.error("Error during token refresh:", error)
          router.push("/login")
        }
      }
    }

    checkAuth()
  }, [router])

  return <>{children}</>
}
