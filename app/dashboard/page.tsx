"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { MonthlyMenu } from "@/components/monthly-menu"

export default function Dashboard() {
  const [user, setUser] = useState({ name: "", email: "" })
  const [todaysMenu, setTodaysMenu] = useState({ breakfast: "", lunch: "", dinner: "" })

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const menuData = JSON.parse(localStorage.getItem("menuData") || "{}")
    setTodaysMenu(menuData)
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Mess++</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Today's Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Breakfast:</strong> {todaysMenu.breakfast}
            </p>
            <p>
              <strong>Lunch:</strong> {todaysMenu.lunch}
            </p>
            <p>
              <strong>Dinner:</strong> {todaysMenu.dinner}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button key={rating}>
                <Star className={`h-4 w-4 ${rating <= 3 ? "fill-primary" : ""}`} />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <MonthlyMenu />
    </div>
  )
}

