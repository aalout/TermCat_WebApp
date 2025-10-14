"use client"

import { useRouter } from "next/navigation"
import { navItems } from "@/constants/navItems"
import NavItem from "./NavItem"
import { logoutUser } from "@/package/api/auth/logout-user"

const MobileNav = () => {
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
    <nav className="w-full bg-black xl:hidden h-[60px] rounded-t-[25px] fixed bottom-0 z-[8000] items-center flex">
      <div className="flex w-full justify-around px-[5vw] md:justify-center md:gap-[5vw]">
        {navItems.slice(1, 5).map(({ href, icon, alt, action }, i) => (
          <NavItem key={i} href={href} icon={icon} alt={alt} onClick={action ? actions[action] : undefined} />
        ))}
      </div>
    </nav>
  )
}

export default MobileNav
