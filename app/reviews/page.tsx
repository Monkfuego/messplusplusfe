"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

type Review = {
  id: number
  rating: number
  comment: string
  date: string
}

export default function Reviews() {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews")
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReview: Review = {
      id: Date.now(),
      rating,
      comment: review,
      date: new Date().toLocaleString(),
    }
    const updatedReviews = [...reviews, newReview]
    setReviews(updatedReviews)
    localStorage.setItem("reviews", JSON.stringify(updatedReviews))
    setRating(0)
    setReview("")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Meal Reviews</h1>
      <Card>
        <CardHeader>
          <CardTitle>Submit a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button key={star} type="button" variant="outline" size="icon" onClick={() => setRating(star)}>
                  <Star className={`h-4 w-4 ${star <= rating ? "fill-primary" : ""}`} />
                </Button>
              ))}
            </div>
            <Textarea
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <Button type="submit">Submit Review</Button>
          </form>
        </CardContent>
      </Card>
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

