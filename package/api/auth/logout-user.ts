import client from "../axios.client"
import { deleteTokens } from "@/utils/deleteTokens"

export async function logoutUser() {
  try {
    const response = await client({
      method: "POST",
      url: "/api/auth/logout",
      baseURL: "/",
      headers: { "Content-Type": "application/json" }
    })

    if (response.status === 200) {
      await deleteTokens()
      return { status: 200 }
    }
  } catch (error) {
    return {
      status: 500,
      error: error instanceof Error ? error.message : "Logout error"
    }
  }
}
