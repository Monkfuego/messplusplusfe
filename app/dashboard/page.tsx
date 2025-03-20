"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { MonthlyMenu } from "@/components/monthly-menu"

export default function Dashboard() {
  const [user, setUser] = useState({ displayName: "", email: "" })
  const [todaysMenu, setTodaysMenu] = useState({ Breakfast: "", Lunch: "", Snack: "", Dinner: "" })
  const [currentRating, setCurrentRating] = useState(0)
  const [reviews, setReviews] = useState<{ id: string; rating: number; date: string; comment: string }[]>([])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const menuData = JSON.parse(localStorage.getItem("menuData") || "{}")
    const storedRating = localStorage.getItem("quickReviewRating")
    const today = new Date().toISOString().split('T')[0] // Get today's date in YYYY-MM-DD format

    // Example: Fetch reviews from localStorage or API
    const storedReviews = JSON.parse(localStorage.getItem("reviews") || "[]")
    setReviews(storedReviews)
    const monthKey = today.slice(0, 7)
    const todaysMenuData = menuData[monthKey]?.[today] || { Breakfast: "", Lunch: "", Snack: "", Dinner: "" }
    console.log("menuData:", menuData)
    console.log("today:", today)
    console.log("monthKey:", monthKey)
    console.log("todaysMenuData:", todaysMenuData)
    setTodaysMenu(todaysMenuData)

    if (storedRating) {
      setCurrentRating(Number(storedRating))
    }
  }, [])

  const handleRating = (rating: number) => {
    setCurrentRating(rating)
    localStorage.setItem("quickReviewRating", rating.toString())
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Mess++</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name: Shubhrajyoti Ghose Biswas </strong>
          </p>
          <p>
            <strong>Email: shubhrajyoti.23bce7261@vitapstudent.ac.in </strong> 
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
              <strong>Breakfast:</strong> {todaysMenu.Breakfast}
            </p>
            <p>
              <strong>Lunch:</strong> {todaysMenu.Lunch}
            </p>
            <p>
              <strong>Snack:</strong> {todaysMenu.Snack}
            </p>
            <p>
              <strong>Dinner:</strong> {todaysMenu.Dinner}
            </p>
          </div>
        </CardContent>
      </Card>
      <MonthlyMenu />
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
                            <Star key={star} className={`h-4 w-4 ${star <= review.rating ? "fill-primary" : ""}`} />
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
