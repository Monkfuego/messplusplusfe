"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Parse the URL parameters
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    const userData = JSON.parse(params.get("userData") || "{}")

    if (token && userData) {
      // Save the token and user data
      localStorage.setItem("authToken", token)
      localStorage.setItem("userData", JSON.stringify(userData))

      // Redirect to dashboard
      router.push("/dashboard")
    } else {
      // Handle error
      console.error("Authentication failed")
      router.push("/auth/login")
    }
  }, [router])

  return <div>Authenticating...</div>
}

