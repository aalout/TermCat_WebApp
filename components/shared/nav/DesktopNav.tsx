"use client"

import { useRouter } from "next/navigation"
import NavItem from "./NavItem"
import { navItems } from "@/constants/navItems"
import { logoutUser } from "@/package/api/auth/logout-user"

const DesktopNav = () => {
  const router = useRouter()
  const actions: Record<string, () => void> = {
    newDialog: async () => {
      router.push(`/WebApp/dialogs/create`)
    },
    logout: async () => {
      await logoutUser()
      window.location.reload()
    }
  }

  return (
    <aside className="fixed h-screen w-[6%] items-center hidden xl:flex z-[9000]">
      <nav className="w-full bg-PrimaryBlack rounded-[100px] py-[48px] px-[24px] flex flex-col gap-y-[70px]">
        <div className="flex flex-col items-center gap-y-[40px]">
          {navItems.map(({ href, icon, alt, action }, i) => (
            <NavItem key={i} href={href} icon={icon} alt={alt} onClick={action ? actions[action] : undefined} />
          ))}
        </div>
      </nav>
    </aside>
  )
}

export default DesktopNav
