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
    "2025-02-26": {
      Breakfast: "Onion Masala Dosa, Coconut Chutney, Sambar, Toasted Bread, Butter, Jam, Coffee, Tea, Milk, NV-Egg Bhurji",
      Lunch: "Chapathi, Chicken Hyderabadi Style (Semi Gravy) / Paneer 65, Bottlegourd Kurma, Jeera Pulao, White Rice, Rasam, Pickle, Salad (Cucumber, Lemon), Onion Raita, Sprouts, Semiya Payasam",
      Snacks: "Bread Pakoda, Chutney, Tea, Coffee",
      Dinner: "Phulka, Dal Tadka, Rice, Aloevera Capsicum Curry, Mix Veg Curry, Raita, White Rice, Rasam, Pickle, Seasonal Fruit"
    },
    "2025-02-27": {
      Breakfast: "Poha, Masala Upma, Coconut Chutney, Sambar, Toasted Bread, Butter, Jam, Coffee, Tea, Milk, NV-Omelette",
      Lunch: "Phulka, Palak Dal, Butter Beans Kara Koottu, Papad, Podi Dosa, Rasam, Tomato Dal, Salad (Carrot, Raddish, Beetroot), Cabbage Channa Curry",
      Snacks: "Fresh Baked Bun, Tomato Ketchup, Tea, Coffee",
      Dinner: "Phulka, Tomato Dal, Idli, Sambar, Groundnut Chutney, Rasam, Curd, Pickle, Seasonal Fruit"
    },
    "2025-02-28": {
      Breakfast: "Vada Pav, Masala Upma, Fried Green Chilli, Coconut Chutney, Pickle, Bread, Butter, Jam, Coffee, Tea, Milk, NV-Boiled Egg",
      Lunch: "Chapathi, Beans Poriyal, Bessibella Bath, Rajma Masala, Potato Chips, White Rice, Tomato Rasam, Pickle, Curd Vadai, Salad (Sprouts, Onion), Lemon Juice, Rabadi",
      Snacks: "Bhaji Pav, Green Chutney, Tomato Chutney, Tea, Coffee",
      Dinner: "Phulka, Rasam, White Rice, Mix Veg Manchurian (Semi Dry), Chana Dal Fry, Pickle, Roti, Salad, Curd, Seasonal Fruit"
    },
    "2025-02-03": {
      Breakfast: "Chole Bhatura, Pongal with coconut chutney, Toasted Bread with Butter and Jam, Tea, Coffee, Milk, NV-Egg Burji",
      Lunch: "Phulka, Chana Masala, Palak Dal, Tomato Rice, White Rice, Papad, Beetroot Poriyal, Rasam, Fresh Coriander Chutney, Salad (Cucumber, Onion, Carrot), Butter Milk",
      Snacks: "Veg Roll with tomato sauce, Tea, Coffee",
      Dinner: "Paneer Butter Masala, Gravy Chicken, Rice, Rasam, Dal, Phulka, Cutlet, Salad, Curd, Seasonal Fruit"
    },
    "2025-02-04": {
      Breakfast: "Aloo Bonda, Green Chutney, Mint Masala Dosa, Sambar, Coffee, Tea, Milk, Bread, Butter, Jam, NV-Boiled Egg",
      Lunch: "Chapathi, Bessibella Bath, Rajma Masala, Potato Chips, Thattari Channa, White Rice, Tomato Rasam, Pickle, Carrot and Beans Poriyal, Curd Vadai, Salad (Beetroot & Cucumber), Lemon Juice, Gulab Jamun",
      Snacks: "Veg Cutlet (2 pcs) with tomato sauce & Ketchup, Tea, Coffee",
      Dinner: "Phulka, Mushroom Biryani, Veg Kurma, Baby Corn Masala, Rice, Dal Fry, Rasam, Sambar, Tomato Dal, Raita, Cucumber Salad, Pickle, Seasonal Fruit"
    }
  }
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

