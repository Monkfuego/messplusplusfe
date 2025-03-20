"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", calories: 2400 },
  { name: "Tue", calories: 2210 },
  { name: "Wed", calories: 2290 },
  { name: "Thu", calories: 2000 },
  { name: "Fri", calories: 2181 },
  { name: "Sat", calories: 2500 },
  { name: "Sun", calories: 2100 },
]

const foodItems = [
  {
    name: "Chole, Bhatura (10 inch)",
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
  {
    name: "Pongal",
    calories: 350,
    protein: "7g",
    totalFat: "14g",
    saturatedFat: "3g",
    cholesterol: "0mg",
    sodium: "500mg",
    carbs: "45g",
    fiber: "5g",
    sugar: "2g",
  },
  {
    "name": "Coconut chutney",
    "calories": 150,
    "protein": "2g",
    "totalFat": "12g",
    "saturatedFat": "8g",
    "cholesterol": "0mg",
    "sodium": "100mg",
    "carbs": "8g",
    "fiber": "4g",
    "sugar": "2g"
  },
  {
    "name": "Toasted Bread",
    "calories": 75,
    "protein": "3g",
    "totalFat": "1g",
    "saturatedFat": "0g",
    "cholesterol": "0mg",
    "sodium": "150mg",
    "carbs": "15g",
    "fiber": "1g",
    "sugar": "2g"
  },
  {
    "name": "Butter",
    "calories": 100,
    "protein": "0g",
    "totalFat": "11g",
    "saturatedFat": "7g",
    "cholesterol": "30mg",
    "sodium": "100mg",
    "carbs": "0g",
    "fiber": "0g",
    "sugar": "0g"
  },
  {
    "name": "Jam",
    "calories": 50,
    "protein": "0g",
    "totalFat": "0g",
    "saturatedFat": "0g",
    "cholesterol": "0mg",
    "sodium": "10mg",
    "carbs": "12g",
    "fiber": "1g",
    "sugar": "10g"
  },
  {
    "name": "Egg Burji",
    "calories": 150,
    "protein": "10g",
    "totalFat": "10g",
    "saturatedFat": "3g",
    "cholesterol": "150mg",
    "sodium": "200mg",
    "carbs": "2g",
    "fiber": "1g",
    "sugar": "1g"
  },
  {
    "name": "Phulka",
    "calories": 70,
    "protein": "2g",
    "totalFat": "1g",
    "saturatedFat": "0g",
    "cholesterol": "0mg",
    "sodium": "100mg",
    "carbs": "15g",
    "fiber": "2g",
    "sugar": "1g"
  },
  {
    "name": "Chana Masala",
    "calories": 200,
    "protein": "10g",
    "totalFat": "8g",
    "saturatedFat": "1g",
    "cholesterol": "0mg",
    "sodium": "400mg",
    "carbs": "25g",
    "fiber": "5g",
    "sugar": "3g"
  },
  {
    "name": "Palak Dal",
    "calories": 150,
    "protein": "8g",
    "totalFat": "5g",
    "saturatedFat": "1g",
    "cholesterol": "0mg",
    "sodium": "300mg",
    "carbs": "20g",
    "fiber": "4g",
    "sugar": "2g"
  }, 
  {
    "name": "Tomato Rice",
    "calories": 250,
    "protein": "5g",
    "totalFat": "10g",
    "saturatedFat": "2g",
    "cholesterol": "0mg",
    "sodium": "400mg",
    "carbs": "35g",
    "fiber": "3g",
    "sugar": "2g"
  },
  {
    "name": "White Rice",
    "calories": 200,
    "protein": "4g",
    "totalFat": "1g",
    "saturatedFat": "0g",
    "cholesterol": "0mg",
    "sodium": "10mg",
    "carbs": "45g",
    "fiber": "1g",
    "sugar": "1g"
  },
  {
    "name": "Papad",
    "calories": 50,
    "protein": "1g",
    "totalFat": "2g",
    "saturatedFat": "0g",
    "cholesterol": "0mg",
    "sodium": "200mg",
    "carbs": "5g",
    "fiber": "1g",
    "sugar": "0g"
  },
  {
    "name": "Beetroot Poriyal",
    "calories": 100,
    "protein": "2g",
    "totalFat": "5g",
    "saturatedFat": "1g",
    "cholesterol": "0mg",
    "sodium": "200mg",
    "carbs": "15g",
    "fiber": "3g",
    "sugar": "2g"
  },
  {
    "name": "Rasam",
    "calories": 50,
    "protein": "1g",
    "totalFat": "2g",
    "saturatedFat": "0g",
    "cholesterol": "0mg",
    "sodium": "300mg",
    "carbs": "8g",
    "fiber": "2g",
    "sugar": "1g"
  },
  {
    "name": "Fresh coriander Chutney",
    "calories": 50,
    "protein": "1g",
    "totalFat": "4g",
    "saturatedFat": "1g",
    "cholesterol": "0mg",
    "sodium": "100mg",
    "carbs": "4g",
    "fiber": "2g",
    "sugar": "1g"
  },
  {
    "name": "Salad(Cucumber, onion, carrot)",
    "calories": 50,
    "protein": "1g",
    "totalFat": "3g",
    "saturatedFat": "0g",
    "cholesterol": "0mg",
    "sodium": "100mg",
    "carbs": "5g",
    "fiber": "2g",
    "sugar": "2g"
  },
  

]

export default function Nutrition() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFoodItems = foodItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Nutrition Tracking</h1>
        <Button onClick={() => window.location.href = "https://symphonious-eclair-35c99f.netlify.app/"}>Get AI Insights with Mess++ AI</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="foodlist">Food List</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calories Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Protein (g)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85</div>
                <p className="text-xs text-muted-foreground">Target: 90g</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbs (g)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">285</div>
                <p className="text-xs text-muted-foreground">Target: 300g</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fat (g)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65</div>
                <p className="text-xs text-muted-foreground">Target: 70g</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="foodlist">
          <Card>
            <CardHeader>
              <CardTitle>Food List</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              <div className="overflow-x-auto">
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
                    {filteredFoodItems.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell className="font-medium">{item.name}</TableCell>
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
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Based on your eating patterns this week:</p>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Your protein intake is slightly below target</li>
                  <li>Calorie intake has been consistent</li>
                  <li>Consider increasing healthy fat consumption</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Recommended meals for tomorrow:</p>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <h3 className="font-semibold">Breakfast</h3>
                    <p>Oatmeal with fruits and nuts (350 calories)</p>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="font-semibold">Lunch</h3>
                    <p>Grilled chicken salad with quinoa (450 calories)</p>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="font-semibold">Dinner</h3>
                    <p>Fish curry with brown rice (400 calories)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

