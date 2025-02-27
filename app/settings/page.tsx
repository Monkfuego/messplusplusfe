"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { requestNotificationPermission, scheduleNotification } from "@/lib/notifications"

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [breakfastTime, setBreakfastTime] = useState("07:30")
  const [lunchTime, setLunchTime] = useState("12:30")
  const [dinnerTime, setDinnerTime] = useState("19:30")

  useEffect(() => {
    const checkPermission = async () => {
      const hasPermission = await requestNotificationPermission()
      setNotificationsEnabled(hasPermission)
    }
    checkPermission()
  }, [])

  const handleNotificationToggle = async (checked: boolean) => {
    if (checked) {
      const hasPermission = await requestNotificationPermission()
      if (hasPermission) {
        setNotificationsEnabled(true)
        scheduleAllNotifications()
      }
    } else {
      setNotificationsEnabled(false)
    }
  }

  const scheduleAllNotifications = () => {
    const [breakfastHour, breakfastMinute] = breakfastTime.split(":").map(Number)
    const [lunchHour, lunchMinute] = lunchTime.split(":").map(Number)
    const [dinnerHour, dinnerMinute] = dinnerTime.split(":").map(Number)

    scheduleNotification(breakfastHour, breakfastMinute, "Time for breakfast!", {
      body: "Don't forget to have a healthy breakfast",
    })
    scheduleNotification(lunchHour, lunchMinute, "Time for lunch!", {
      body: "Take a break and enjoy your lunch",
    })
    scheduleNotification(dinnerHour, dinnerMinute, "Time for dinner!", {
      body: "End your day with a nutritious dinner",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Meal Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
            <Label htmlFor="notifications">Enable meal reminders</Label>
          </div>
          {notificationsEnabled && (
            <div className="grid gap-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="breakfast">Breakfast Time</Label>
                <Input
                  id="breakfast"
                  type="time"
                  value={breakfastTime}
                  onChange={(e) => setBreakfastTime(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lunch">Lunch Time</Label>
                <Input id="lunch" type="time" value={lunchTime} onChange={(e) => setLunchTime(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dinner">Dinner Time</Label>
                <Input id="dinner" type="time" value={dinnerTime} onChange={(e) => setDinnerTime(e.target.value)} />
              </div>
              <Button onClick={scheduleAllNotifications}>Update Notification Schedule</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

