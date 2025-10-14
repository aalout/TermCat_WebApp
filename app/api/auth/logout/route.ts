import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import client from "@/package/api/axios.client"

export async function POST() {
  try {
    const cookieStore = await cookies()
    const TermCatAccessToken = cookieStore.get("TermCatAccessToken")?.value

    const response = await client({
      method: "POST",
      url: `/auth/revoke`,
      headers: { accept: `application/json`, Authorization: `Bearer ${TermCatAccessToken}` }
    })

    if (response.status === 200 || response.status === 201) {
      return NextResponse.json({ status: 200 })
    } else {
      console.error("Ошибка при логауте")
    }
  } catch (error) {
    console.error("Ошибка при логауте:", error)

    return NextResponse.json({ error: "Ошибка при выходе из системы" }, { status: 500 })
  }
}
