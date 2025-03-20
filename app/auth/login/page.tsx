"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [bgImage, setBgImage] = useState("")

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("authToken")
    const email = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")
    if (token && email && name) {
      router.push(`/dashboard?email=${email}&name=${name}`)
    }

    // Randomly select a background image
    const images = [
     "https://media.discordapp.net/attachments/940932508571287563/1352167155726024784/mh5mess.jpg?ex=67dd074b&is=67dbb5cb&hm=4652ea1787ab7f1d072583ce254efe03855a19cc66d78eeb2b9d72eb3a1484f1&=&format=webp&width=1066&height=800",
     "https://media.discordapp.net/attachments/940932508571287563/1352167156011503656/MH5mess1.jpg?ex=67dd074c&is=67dbb5cc&hm=1dd76eba3d440a14503825837c906074198d082a797446f4157b9e8bf8a397bf&=&format=webp&width=1063&height=800",
     "https://media.discordapp.net/attachments/940932508571287563/1352167156472746014/MH4mess.jpg?ex=67dd074c&is=67dbb5cc&hm=196c9cdbb51bc61dd38ef065941631473d5c8cc74be12c84473d1126c9ad2950&=&format=webp&width=450&height=800",
     "https://media.discordapp.net/attachments/940932508571287563/1352167156820742184/mh4mess1.jpg?ex=67dd074c&is=67dbb5cc&hm=de24bcf37ff1b041fe5061ff0222c91b5bfb1bc0bcd4ba76762d58518c526d4d&=&format=webp&width=450&height=800"
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)]
    setBgImage(randomImage)
  }, [router])

  const handleGoogleLogin = () => {
    window.location.href = "https://mess-plus-plus-backend.onrender.com/auth/google"
  }

  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0">
          <Image 
            src={bgImage}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mircha%20unclear-b3ezX961kEWOTcdUF6lIQCeBNpiC8M.png"
            alt="Mess++"
            width={200}
            height={80}
            className="dark:invert"
          />
        </div>
        <div className="relative z-20 mt-auto bg-black/50 p-4 rounded-lg">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Streamline your dining experience with smart meal planning and nutritional insights."
            </p>
            <footer className="text-sm">VIT AP University</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>Sign in with your VIT AP Google account</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button variant="outline" onClick={handleGoogleLogin} className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
