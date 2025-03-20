"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const mealsOfDay: (keyof MenuData["2025-02"]["2025-02-26"])[] = ["Breakfast", "Lunch", "Snacks", "Dinner"]

type MenuData = {
  [key: string]: {
    [key: string]: {
      Breakfast: string
      Lunch: string
      Snacks: string
      Dinner: string
    }
  }
}

// This would typically come from an API or database
const sampleMenuData: MenuData = {
  "2025-03": {
    "2025-03-01": {
      Breakfast: "Mysore Bonda(3pcs), Carrot idly, sambar, Groundnut chutney, Bread, Butter, Jam, Tea, Coffee Powder, Milk, NV-Egg Bhurji",
      Lunch: "Phulka, Tomato Dal, Lemon Rice, White Rice, Rasam, Kadai veg, bindi poriyal, Fresh Chutney, Papad, Buttermilk, Salad, Sweet-Ravva Laddu/Gulab jamun (alternate)",
      Snacks: "Bread Pakoda, Sauce, Ginger Tea, coffee",
      Dinner: "Dal Punjabi, Roti, Veg Fried Rice, gobi Manchurian (3pcs), White Rice, Sambar, Pickle, Milk, Coffee Powder, Fruits, curd,",
    },
    "2025-03-02": {
      Breakfast: "Aloo Paratha (2pcs medium size), Uggani, mango pickle, Ground Nut Chutney, brown Bread, Butter, Jam, Black Coffee Powder, Milk, NV-Boiled Egg",
      Lunch: "(Basmati Rice) Chicken Dum Biryani [NV]/Paneer Dum vegetable Biryani [VEG]. Gravy(Chicken GRAVY NV/MIRCHI KA SALAN VEG), Phulka, white Rice, Dal Fry. Onion Raitha, ONIONS, Nannari sharbath, Ice cream Bar or cone ice cream",
      Snacks: "Pani Poori, Onions, Masala Tea, coffee",
      Dinner: "Phulka, chukka kura pappu, dum aloo capsicum curry, Coconut chutney, Sambhar, curd rice, White rice, Fruits, Coffee Powder, Milk, Mango pickle",
    },
    "2025-03-03": {
      Breakfast: "chole Bhature, pongal, Ground nut chutney, Bread Butter Jam, Tea, Coffee Powder, Milk, NV-Masala Omlette",
      Lunch: "chapathi, mudha pappu, White Rice, Nizami Veg, Pachi Pulusu, Curd, Podi, Ghee, Thovaigal, Mango Pickle, Salad, Chala Mirapakai, Sweet - Ravva Keasri(Dry fruits)",
      Snacks: "Masala puri, Sauce, TEA coffee",
      Dinner: "Chapathi, Kadai Paneer/ Mughalai Chicken, Pudina Rice, White Rice, Dal Tadka, Rasam, Curd, Fruits, Pickle, Milk, Coffee Powder, ONIONS",
    },
    "2025-03-04": {
      Breakfast: "Masala Dosa, Poha, Coconut Chutney, Sambar, Brown bread Butter Jam, Tea, Coffee Powder, Milk,",
      Lunch: "Chapathi, Besibilla bath, Rajma Masala, Dal Fry, Mix Veg Porigal (Cabbage+beans+carrot), White Rice, tomato Rasam, Tomato chutney Lemon Water, Curd Vada, potato chips, Salad",
      Snacks: "Masala Boiled Peanuts, Tea, coffee",
      Dinner: "chapathi, white rice, Veg Kurma, Veg Biryani, sambar, keerai kootu, Raitha, Pickle, Coffee Powder, milk, Fruits, NV-Chetinad EGG masala Curry",
    },
    "2025-03-05": {
      Breakfast: "Idli, Vada 3 medium size, Sambar, Ground nut Chutney, Bread Butter Jam, Coffee Powder, Tea, Milk., NV-Masala Omlette",
      Lunch: "Chicken 65/ Paneer 65, Paneer finger [alternative week], Veg Chatpata, Chapathi, Bhagara Rice, Dosakaya pappu, Rasam, White Rice, Buttermilk, ONIONS",
      Snacks: "Onion pakoda chutney tea, coffee",
      Dinner: "chapathi white rice, Sambar, Tomato Pappu, Aloo Matar Khurma, Curd Rice, Coffee Powder, Milk, fruit custard",
    },
    "2025-03-06": {
      Breakfast: "Poori, Potato Masala Bhaji, Rava Upma, Groundnut Chutney, bread Butter Jam, Tea, Coffee Powder, Milk, NV-Boiled Egg",
      Lunch: "Phulka, mix veg sambar, Kadi Pakoda, Ivy gourd fry 65/Chilli potato (alternative), Papula podi ghee, Carrot and Beans Porigal, White Rice, rasam Papad, lemon water, Salad, Carrot Halwa/Bread",
      Snacks: "Papdi Chat, TEA, coffee",
      Dinner: "Phulka, Kaakarkaya fry(bitter gourd oil fry), Amaranthus Dal, Veg Mix Curry, Sambar, curd, White Rice, green chilly Pickle, Milk, Coffee Powder, Fruits",
    },
    "2025-03-07": {
      Breakfast: "Wheat upma, paav bhaji, Coconut Chutney, bread Butter Jam, Tea, Coffee Powder, Milk, NV-Egg Podimas",
      Lunch: "Phulka, soga masala, veg pulao, White Rice,, Raw Banana Porigal, Snake Guard Koottu, sambar Fresh Chutney Butter Milk,,Salad",
      Snacks: "Masala Vada 2 (Alternative), Chutney, TEA, coffee",
      Dinner: "phulka, white rice, butter chicken/ Panner Butter Masala [7 pcs], Coriander pulao, Kaddu dal, rasam, Fruits, Pickle, Coffee Powder and milk, Raitha, ONIONS",
    },
    "2025-03-08": {
      Breakfast: "Mysore Bonda, Multigrain dosa, Groundnut Chutney, Sambar, bread Butter Jam, Tea, Coffee Powder, Milk,",
      Lunch: "Phulka, Sambar, Yangi Bath, aloo 65, carrot Aloo masala, Rasam, White Rice, fryums, Salad (Boiled chana with onion and tomato) Sweet-Coconut ladoo, buttermilk",
      Snacks: "Onion Pakoda/Mirchi Bhajji(alternative) Ground Nut",
      Dinner: "Dal Fry, Methi Roti, Veg Pulao, Veg Khofta, White Rice, Sambar, Rasam, Pickle, Milk, Coffee Powder, Raitha, Fruits,",
    },
    "2025-03-09": {
      Breakfast: "Onion masala stuffed paratha (2pcs medium size), Uggani, mango pickle, Chutney, brown Bread, Butter, Jam, Tea, Coffee Powder, Milk, NV-Boiled egg",
      Lunch: "[Basmati Rice] Chicken Dum Biryani non veg/Paneer Dum vegetable Biryani veg, Mirchi ka salan, Phulka, white Rice, Dal Fry, Onion Raitha, ONIONS, Nannari sharbath, Ice cream Bar or cone ice cream",
      Snacks: "Pani Poori, Onions, Masala Tea, coffee",
      Dinner: "Phulka, Kadai veg, Sambhar, IDLY, coconut chutney, curd rice, White rice, Rasam, Fruits, Coffee Powder, Milk, pickle, Ghee, Podi",
    },
    "2025-03-10": {
      Breakfast: "Chole Bhature, Veg pongal, Ground nut chutney, Bread Butter Jam, Tea, Coffee Powder, Milk, NV-Boiled Egg",
      Lunch: "Phulka, Amaranthus Dal, Aloo Gobi Curry, White Rice, Banana poriyal, Mango Pickle(Avakaya), Radish kara kolambu, fryums, Butter Milk, Kandi podi ghee, Salad, Shahi Roti, Besibilla bath, Rajma Masala, Mix Veg Porigal (Cabbage+beans+carrot), White Rice, tomato Rasam, ONIONS",
      Snacks: "Stuffed Veg roll, Sauce, TEA, coffee",
      Dinner: "Chapathi, Panneer Butter Masala / Chicken Butter Masala, Jeera rice, Dal Tadka, Rasam, White Rice, Curd, Fruits, Pickle, Milk, Coffee Powder, ONIONS",
    },
    "2025-03-11": {
      Breakfast: "Masala Dosa, Vada Paav, Coconut Chutney, Sambar, Toasted bread. Butter Jam, Tea, Coffee Powder, Milk, NV- Egg Bhurji",
      Lunch: "Rasam, Tomato chutney Lemon Water, Curd Vadai, potato chips, Salad",
      Snacks: "Bread Chole, Badam Milk coffee",
      Dinner: "Phulkha, mushroom biriyani, Veg kortha curry, baby corn masala rice, rasam, sambar, Tomato dal, Raitha, pickle, coffee milk FRUIT",
    },
    "2025-03-12": {
      Breakfast: "Idli, Vada(3 pcs medium size), Sambar, Chutney, Brown Bread Butter + Jam, Coffee Powder, Tea, Milk, NY-Egg Podimas",
      Lunch: "Achari Paneer/Andhra Style Chicken Fry, Veg Chatpata, Phulka, Bhagara rice, Dal Makhani, Rasam, White Rice, gongura Chutney, ONIONS, Buttermilk, Rasam",
      Snacks: "Sweet corn tea coffee",
      Dinner: "Chapathi, Soga curry, Dosakaya Dal, Chikudukaya tomato semi gravy. White Rice, sambar, Curd Rice, Milk, Coffee Powder, Pickle, DESSERT -Fruit Custard(minimum 4types fruits)",
    },
    "2025-03-13": {
      Breakfast: "Poori, Potato Masala Bhaji, Semiga upma, Groundnut Chutney, bread Butter Jam, Tea, Coffee Powder, Milk, NV-Boiled egg",
      Lunch: "Phulka, Palak Dal, Majiga pulusu, Nizami veg Papula podi. ghee, Raw Banana Porigal, White Rice rasam, coriander chutney, Papad, lemon water, Salad, JILEBI",
      Snacks: "Vada Paav, Green Chutney, Fried Green Chilli, TEA, coffee",
      Dinner: "IDLY, Roti, chutney, Amarantus Dal, White Rice, Cabbage Deep Fry (165 style), Sambar, Milk, Curd, Coffee Powder, seasonal Fruits, Pickle",
    },
    "2025-03-14": {
      Breakfast: "Onion uthapam 2 nos, Paav Bhaji, Coconut Chutney, Sambar, bread. Butter. Jam, Tea, Coffee Powder, Milk, NV-Egg Podimas",
      Lunch: "Ajwain chapathi, Pudina Rice, white rice, Gutti Vankaga Curry, Beetroot Porigal, sambar, Dal maharani, Butter milk, Dondakaga chutney Salad",
      Snacks: "Banana Bajji 2 nos, chutney, coffee tea",
      Dinner: "Lacha paratha or chapathi 2pcs standard size [alternative week chetinad chicken curry/shahi paneer curry], curd, White rice, Tomato pappu, rasam, Fruits, pickle, Coffee Powder and milk, ONIONS",
    },
    "2025-03-15": {
      Breakfast: "Mysore Bonda(3pcs), Carrot idly, sambar, Groundnut chutney, Bread Butter, Jam, Tea, Coffee Powder, Milk., NV-Egg Bhurji",
      Lunch: "Phulka, Tomato Dal, Lemon Rice, White Rice, Rasam, Kadai veg, bindi porigal, Fresh Chutney, Papad, Buttermilk, Salad, Sweet-Ravva Laddu/Gulab jamun(alternate)",
      Snacks: "Bread Pakoda, Sauce, Ginger Tea, coffee",
      Dinner: "Dal Punjabi, Roti, Veg Fried Rice, gobi Manchurian (3pcs), White Rice, Sambar, Pickle, Milk, Coffee Powder, Fruits, curd,",
    },
    "2025-03-16": {
      Breakfast: "Aloo Paratha (2pcs medium size), Uggani, mango pickle, Ground Nut chutney, brown Bread, Butter, Jam, Black Coffee Powder, Milk, NY-Boiled Egg",
      Lunch: "(Basmati Rice)Chicken Dum Biryani [NV]/Paneer Dum vegetable Biryani [VEG]. Gravy(Chicken GRAVY NV/MIRCHI KA SALAN VEG). Phulka, white Rice, Dal Fry. Onion Raitha, ONIONS, Nannari sharbath, Ice",
      Snacks: "Pani Poori, Onions, Masala Tea, coffee",
      Dinner: "Phulka, chukka kura pappu, dum aloo capsicum curry, Coconut chutney, Sambhar, curd rice, White rice, Fruits, Coffee Powder, Milk, Mango pickle",
    },
    "2025-03-17": {
      Breakfast: "chole Bhature, pongal, Ground nut chutney, Bread Butter Jam, Tea, Coffee Powder, Milk, NV-Masala Omlette",
      Lunch: "chapathi, mudha pappu, White Rice, Nizami Veg, Pachi Pulusu, Curd, Podi, Ghee, Thovaigal, Mango Pickle, Salad, Chala Mirapakai, Sweet - Ravva Keasri(Dry fruits)",
      Snacks: "Masala puri, Sauce, TEA coffee",
      Dinner: "Chapathi, Kadai Paneer/ Mughalai Chicken, Pudina Rice, White Rice, Dal Tadka, Rasam, Curd, Fruits, Pickle, Milk, Coffee Powder, ONIONS",
    },
    "2025-03-18": {
      Breakfast: "Masala Dosa, Poha, Coconut Chutney, Sambar, Brown bread Butter Jam, Tea, Coffee Powder, Milk,",
      Lunch: "Chapathi, Besibilla bath, Rajma Masala, Dal Fry, Mix Veg Porigal (Cabbage+beans+carrot), White Rice, tomato Rasam, Tomato chutney Lemon Water, Curd Vada, potato chips, Salad",
      Snacks: "Masala Boiled Peanuts, Tea, coffee",
      Dinner: "chapathi, white rice, Veg Kurma, Veg Biryani, sambar, keerai kootu, Raitha, Pickle, Coffee Powder, milk, Fruits, NV-Chetinad EGG masala Curry",
    },
    "2025-03-19": {
      Breakfast: "Idli, Vada 3 medium size, Sambar, Ground nut Chutney, Bread Butter Jam, Coffee Powder, Tea, Milk., NV-Masala Omlette",
      Lunch: "Chicken 65/ Paneer 65 [alternative week Veg Chatpata], Chapathi, Bhagara Rice, Dosakaya pappu, Rasam, White Rice, Buttermilk ONIONS",
      Snacks: "Onion pakoda chutney tea, coffee",
      Dinner: "chapathi white rice, Sambar, Tomato Pappu, Aloo Matar Khurma, Curd Rice, Coffee Powder, Milk, fruit custard",
    },
    "2025-03-20": {
      Breakfast: "Poori, Potato Masala Bhaji, Rava Upma, Groundnut Chutney, bread Butter Jam, Tea, Coffee Powder, Milk,, NY-Boiled Egg",
      Lunch: "Phulka, mix veg sambar, Kadi Pakoda, Ivy gourd fry 65/Chilli potato(alternative), Papula podi ghee, Carrot and Beans Porigal, White Rice, rasam Papad, lemon water, Salad, Carrot Halwa/Bread",
      Snacks: "Papdi Chat, TEA.coffee",
      Dinner: "Phulka, Kaakarkaga fry(bitter gourd oil fry), Amaranthus Dal, Veg Mix Curry, Sambar, curd, White Rice, green chilly Pickle, Milk, Coffee Powder, Fruits",
    },
    "2025-03-21": {
      Breakfast: "Onion uthapam 2 nos, Paav Bhaji, Coconut Chutney, Sambar, bread Butter Jam, Tea, Coffee Powder, Milk, NV-Egg Bhurji",
      Lunch: "Phulka, Veg Pulao, White Rice, Gobi 65, Dal Tadka, Rasam, Curd, Fruits, Pickle, Milk, Coffee Powder, ONIONS, Butter milk",
      Snacks: "Samosa 2 nos, chutney, coffee tea",
      Dinner: "Chapathi, white rice, Veg Kurma, Veg Biryani, sambar, keerai kootu, Raitha, Pickle, Coffee Powder, milk, Fruits, NV-Egg Bhurji",
    },
    "2025-03-22": {
      Breakfast: "Mysore Bonda 3pcs, Veg Pongal, sambar, Groundnut chutney, Bread Butter Jam, Tea, Coffee Powder, Milk, NV-Boiled Egg",
      Lunch: "Chapathi, Tomato Dal, Lemon Rice, White Rice, Rasam, Kadai Paneer, bindi porigal, Fresh Chutney, Papad, Buttermilk, Salad, Sweet-Gulab jamun",
      Snacks: "Bread Pakoda, Sauce, Ginger Tea, coffee",
      Dinner: "Dal Makhani, Roti, Veg Fried Rice, gobi Manchurian 3pcs, White Rice, Sambar, Pickle, Milk, Coffee Powder, Fruits, curd,",
    },
    "2025-03-23": {
      Breakfast: "Aloo Paratha 2pcs medium size, Uggani, mango pickle, Ground Nut chutney, brown Bread Butter Jam, Black Coffee Powder, Milk, NV-Egg Bhurji",
      Lunch: "(Basmati Rice)Chicken Dum Biryani [NV]/Paneer Dum vegetable Biryani [VEG], Gravy(Chicken GRAVY NV/MIRCHI KA SALAN VEG), Phulka, white Rice, Dal Fry, Onion Raitha, ONIONS, Nannari sharbath, Ice",
      Snacks: "Pani Poori, Onions, Masala Tea, coffee",
      Dinner: "Phulka, chukka kura pappu, dum aloo capsicum curry, Coconut chutney, Sambhar, curd rice, White rice, Fruits, Coffee Powder, Milk, Mango pickle",
    },
    "2025-03-24": {
      Breakfast: "chole Bhature, pongal, Ground nut chutney, Bread Butter Jam, Tea, Coffee Powder, Milk, NV-Boiled Egg",
      Lunch: "chapathi, mudha pappu, White Rice, Nizami Veg, Pachi Pulusu, Curd, Podi, Ghee, Thovaigal, Mango Pickle, Salad, Chala Mirapakai, Sweet - Double ka meetha",
      Snacks: "Masala puri, Sauce, TEA coffee",
      Dinner: "Chapathi, Kadai Paneer/ Mughalai Chicken, Pudina Rice, White Rice, Dal Tadka, Rasam, Curd, Fruits, Pickle, Milk, Coffee Powder, ONIONS",
    },
    "2025-03-25": {
      Breakfast: "Masala Dosa, Poha, Coconut Chutney, Sambar, Brown bread Butter Jam, Tea, Coffee Powder, Milk, NV-Egg Bhurji",
      Lunch: "Chapathi, Besibilla bath, Rajma Masala, Dal Fry, Mix Veg Porigal (Cabbage+beans+carrot), White Rice, tomato Rasam, Tomato chutney Lemon Water, Curd Vada, potato chips, Salad",
      Snacks: "Masala Boiled Peanuts, Tea, coffee",
      Dinner: "chapathi, white rice, Veg Kurma, Veg Biryani, sambar, keerai kootu, Raitha, Pickle, Coffee Powder, milk, Fruits, NV-Egg Bhurji",
    },
    "2025-03-26": {
      Breakfast: "Idli, Vada 3 medium size, Sambar, Ground nut Chutney, Bread Butter Jam, Coffee Powder, Tea, Milk, NV-Boiled Egg",
      Lunch: "Chicken 65/ Paneer 65 [alternative week Veg Chatpata], Chapathi, Bhagara Rice, Dosakaya pappu, Rasam, White Rice, Buttermilk ONIONS",
      Snacks: "Onion pakoda chutney tea, coffee",
      Dinner: "chapathi white rice, Sambar, Tomato Pappu, Aloo Matar Khurma, Curd Rice, Coffee Powder, Milk, fruit custard",
    },
    "2025-03-27": {
      Breakfast: "Poori, Potato Masala Bhaji, Rava Upma, Groundnut Chutney, bread Butter Jam, Tea, Coffee Powder, Milk, NV-Egg Bhurji",
      Lunch: "Phulka, mix veg sambar, Kadi Pakoda, Ivy gourd fry 65/Chilli potato(alternative), Papula podi ghee, Carrot and Beans Porigal, White Rice, rasam Papad, lemon water, Salad, Carrot Halwa/Bread",
      Snacks: "Papdi Chat, TEA.coffee",
      Dinner: "Phulka, Kaakarkaga fry(bitter gourd oil fry), Amaranthus Dal, Veg Mix Curry, Sambar, curd, White Rice, green chilly Pickle, Milk, Coffee Powder, Fruits",
    },
    "2025-03-28": {
      Breakfast: "Onion uthapam 2 nos, Paav Bhaji, Coconut Chutney, Sambar, bread Butter Jam, Tea, Coffee Powder, Milk, NV-Boiled Egg",
      Lunch: "Phulka, Veg Pulao, White Rice, Gobi 65, Dal Tadka, Rasam, Curd, Fruits, Pickle, Milk, Coffee Powder, ONIONS, Butter milk",
      Snacks: "Samosa 2 nos, chutney, coffee tea",
      Dinner: "Chapathi, white rice, Veg Kurma, Veg Biryani, sambar, keerai kootu, Raitha, Pickle, Coffee Powder, milk, Fruits, NV-Egg Bhurji",
    },
    "2025-03-29": {
      Breakfast: "Mysore Bonda 3pcs, Veg Pongal, sambar, Groundnut chutney, Bread Butter Jam, Tea, Coffee Powder, Milk, NV-Egg Bhurji",
      Lunch: "Chapathi, Tomato Dal, Lemon Rice, White Rice, Rasam, Kadai Paneer, bindi porigal, Fresh Chutney, Papad, Buttermilk, Salad, Sweet-Gulab jamun",
      Snacks: "Bread Pakoda, Sauce, Ginger Tea, coffee",
      Dinner: "Dal Makhani, Roti, Veg Fried Rice, gobi Manchurian 3pcs, White Rice, Sambar, Pickle, Milk, Coffee Powder, Fruits, curd,",
    },
    "2025-03-30": {
      Breakfast: "Aloo Paratha 2pcs medium size, Uggani, mango pickle, Ground Nut chutney, brown Bread Butter Jam, Black Coffee Powder, Milk, NV-Boiled Egg",
      Lunch: "(Basmati Rice)Chicken Dum Biryani [NV]/Paneer Dum vegetable Biryani [VEG], Gravy(Chicken GRAVY NV/MIRCHI KA SALAN VEG), Phulka, white Rice, Dal Fry, Onion Raitha, ONIONS, Nannari sharbath, Ice",
      Snacks: "Pani Poori, Onions, Masala Tea, coffee",
      Dinner: "Phulka, chukka kura pappu, dum aloo capsicum curry, Coconut chutney, Sambhar, curd rice, White rice, Fruits, Coffee Powder, Milk, Mango pickle",
    },
    "2025-03-31": {
      Breakfast: "chole Bhature, pongal, Ground nut chutney, Bread Butter Jam, Tea, Coffee Powder, Milk, NV-Masala Omlette",
      Lunch: "chapathi, mudha pappu, White Rice, Nizami Veg, Pachi Pulusu, Curd, Podi, Ghee, Thovaigal, Mango Pickle, Salad, Chala Mirapakai, Sweet - Double ka meetha",
      Snacks: "Masala puri, Sauce, TEA coffee",
      Dinner: "Chapathi, Kadai Paneer/ Mughalai Chicken, Pudina Rice, White Rice, Dal Tadka, Rasam, Curd, Fruits, Pickle, Milk, Coffee Powder, ONIONS",
    },
  },
};

export function MonthlyMenu() {
  const [currentMonth, setCurrentMonth] = useState("2025-03")

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

