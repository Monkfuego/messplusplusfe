"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [user, setUser] = useState({ name: "", email: "", image: "" })
  const [reviewCount, setReviewCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Fetch user data from localStorage or your auth provider
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    setUser(userData)

    // Get review count from localStorage
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]")
    setReviewCount(reviews.length)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    router.push("/auth/login")
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mircha%20unclear-b3ezX961kEWOTcdUF6lIQCeBNpiC8M.png"
              alt="Mess++"
              width={120}
              height={48}
              className="dark:invert"
            />
          </Link>
          <div className="flex gap-6">
            <Link href="/reviews">
              <Button variant="ghost">Reviews ({reviewCount})</Button>
            </Link>
            <Link href="/nutrition">
              <Button variant="ghost">Nutrition</Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost">Settings</Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} alt={user.name || "User"} />
                  <AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <Icons.logout className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

