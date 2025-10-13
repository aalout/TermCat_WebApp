import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import axios from "axios"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtectedRoute = pathname.startsWith("/WebApp")

  const isAuthRoute = pathname.startsWith("/login")

  const refreshToken = request.cookies.get("TermCatRefreshToken")?.value
  const accessToken = request.cookies.get("TermCatAccessToken")?.value

  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isProtectedRoute && refreshToken && !accessToken) {
    try {
      const response = await axios.post<{ accessToken: string }>("/api/auth/refresh", {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (response) {
        const { accessToken } = response.data

        const res = NextResponse.next()
        res.cookies.set("TermCatAccessToken", accessToken, {
          path: "/",
          maxAge: 13 * 60,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax"
        })

        return res
      } else {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    } catch (error) {
      console.error("Middleware token refresh error:", error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  if (isAuthRoute && refreshToken && accessToken) {
    return NextResponse.redirect(new URL("/WebApp", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/WebApp/:path*", "/login"]
}
