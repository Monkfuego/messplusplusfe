"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const nutritionData = [
  {
    item: "Chole, Bhatura (10 inch)",
    calories: 523,
    protein: "15g",
    totalFat: "28g",
    saturatedFat: "5g",
    cholesterol: "0mg",
    sodium: "725mg",
    carbs: "56g",
    fiber: "10g",
    sugar: "8g",
  },
  // ... add all the items from your list
]

export function NutritionTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = nutritionData.filter((item) => item.item.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search food items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Food Item</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Protein</TableHead>
              <TableHead>Total Fat</TableHead>
              <TableHead>Carbs</TableHead>
              <TableHead>Fiber</TableHead>
              <TableHead>Sugar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.item}>
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell>{item.calories}</TableCell>
                <TableCell>{item.protein}</TableCell>
                <TableCell>{item.totalFat}</TableCell>
                <TableCell>{item.carbs}</TableCell>
                <TableCell>{item.fiber}</TableCell>
                <TableCell>{item.sugar}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

