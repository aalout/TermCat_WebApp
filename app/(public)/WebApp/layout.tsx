"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { refreshToken } from "@/package/api/auth/refresh-token"

export default function ProfileLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

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
            setIsChecking(false)
          } else {
            console.error("Failed to refresh token")
            router.push("/login")
          }
        } catch (error) {
          console.error("Error during token refresh:", error)
          router.push("/login")
        }
      } else {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [router])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    )
  }

  return <>{children}</>
}
