"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const mealsOfDay = ["Breakfast", "Lunch", "Dinner"]

type MenuData = {
  [key: string]: {
    [key: string]: string
  }
}

// This would typically come from an API or database
const sampleMenuData: MenuData = {
  "2025-02": {
    "2025-02-01": {
      Breakfast: "Idli, Sambar",
      Lunch: "Rice, Dal, Vegetable Curry",
      Dinner: "Chapati, Paneer Butter Masala",
    },
    // ... more days
  },
  "2025-01": {
    "2025-01-01": {
      Breakfast: "Dosa, Chutney",
      Lunch: "Rice, Sambar, Potato Fry",
      Dinner: "Pulao, Raita",
    },
    // ... more days
  },
  // ... more months
}

export function MonthlyMenu() {
  const [currentMonth, setCurrentMonth] = useState("2025-02")

  const prevMonth = () => {
    const [year, month] = currentMonth.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 2, 1)
    setCurrentMonth(date.toISOString().slice(0, 7))
  }

  const nextMonth = () => {
    const [year, month] = currentMonth.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month), 1)
    setCurrentMonth(date.toISOString().slice(0, 7))
  }

  const generateMonthDays = () => {
    const [year, month] = currentMonth.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1)
    const days = []
    while (date.getMonth() === Number.parseInt(month) - 1) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  const monthDays = generateMonthDays()

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Monthly Menu</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={currentMonth} onValueChange={(value) => setCurrentMonth(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(sampleMenuData).map((month) => (
                <SelectItem key={month} value={month}>
                  {new Date(month).toLocaleString("default", { month: "long", year: "numeric" })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                {daysOfWeek.map((day) => (
                  <TableHead key={day}>{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mealsOfDay.map((meal) => (
                <TableRow key={meal}>
                  <TableCell className="font-medium">{meal}</TableCell>
                  {monthDays.map((day) => {
                    const dateString = day.toISOString().split("T")[0]
                    return (
                      <TableCell key={dateString} className="p-2">
                        <div className="text-xs">{sampleMenuData[currentMonth]?.[dateString]?.[meal] || "-"}</div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

