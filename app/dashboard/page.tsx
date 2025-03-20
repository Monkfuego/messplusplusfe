"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { MonthlyMenu } from "@/components/monthly-menu"

type User = {
  displayName: string
  email: string
}

type Menu = {
  Breakfast: string
  Lunch: string
  Snack: string
  Dinner: string
}

type Review = {
  id: string
  rating: number
  date: string
  comment: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User>({ displayName: "", email: "" })
  const [todaysMenu, setTodaysMenu] = useState<Menu>({ Breakfast: "", Lunch: "", Snack: "", Dinner: "" })
  const [currentRating, setCurrentRating] = useState(0)
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    try {
      const userData: User = JSON.parse(localStorage.getItem("userData") || "{}")
      const menuData = JSON.parse(localStorage.getItem("menuData") || "{}")
      const storedRating = localStorage.getItem("quickReviewRating")
      const storedReviews: Review[] = JSON.parse(localStorage.getItem("reviews") || "[]")
      
      const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      const monthKey = today.slice(0, 7) // YYYY-MM format

      // Update state safely
      if (userData.displayName && userData.email) setUser(userData)
      setReviews(storedReviews)
      
      const todaysMenuData = menuData?.[monthKey]?.[today] || { Breakfast: "", Lunch: "", Snack: "", Dinner: "" }
      setTodaysMenu(todaysMenuData)

      if (storedRating) {
        setCurrentRating(Number(storedRating))
      }
    } catch (error) {
      console.error("Error loading localStorage data:", error)
    }
  }, [])

  const handleRating = (rating: number) => {
    setCurrentRating(rating)
    localStorage.setItem("quickReviewRating", rating.toString())
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Mess++</h1>
      
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name: </strong>{user.displayName || "N/A"}</p>
          <p><strong>Email: </strong>{user.email || "N/A"}</p>
        </CardContent>
      </Card>

      {/* Today's Menu Card */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(todaysMenu).map(([meal, description]) => (
              <p key={meal}>
                <strong>{meal}: </strong> {description || "Not Available"}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Menu Component */}
      <MonthlyMenu />

      {/* Recent Reviews Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        fill="currentColor"
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
