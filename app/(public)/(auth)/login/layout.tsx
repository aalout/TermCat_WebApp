"use client"

import { ReactNode, useEffect, useRef } from "react"
import Cookies from "js-cookie"
import { refreshToken } from "@/package/api/auth/refresh-token"
import { useRouter } from "next/navigation"

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter()
  const hasChecked = useRef(false)

  useEffect(() => {
    if (hasChecked.current) return

    const checkAuth = async () => {
      const refreshTokenCookie = Cookies.get("TermCatRefreshToken")

      if (refreshTokenCookie) {
        try {
          const result = await refreshToken()

          if (result) {
            router.push("/WebApp")
          }
        } catch (error) {
          console.error("Error during token refresh:", error)
        }
      }
    }

    hasChecked.current = true
    checkAuth()
  }, [router])

  return <>{children}</>
}
