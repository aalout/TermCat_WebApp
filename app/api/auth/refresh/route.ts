import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import axios from "axios"

export async function POST() {
  try {
    const cookieStore = await cookies()
    const TermCatRefreshToken = cookieStore.get("TermCatRefreshToken")?.value

    const response = await axios.post(`${process.env.BASE_API_URL}/auth/refresh`, { refreshToken: TermCatRefreshToken })

    const { accessToken } = response.data

    return NextResponse.json({
      accessToken
    })
  } catch (error) {
    console.error("Ошибка при логауте:", error)

    return NextResponse.json({ error: "Ошибка при выходе из системы" }, { status: 500 })
  }
}
