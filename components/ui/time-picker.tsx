"use client"

import { useState } from "react"

export function TimePicker({ value, onChange }) {
  const [time, setTime] = useState(value)

  const handleChange = (event) => {
    setTime(event.target.value)
    onChange(event.target.value)
  }

  return <input type="time" value={time} onChange={handleChange} className="border rounded-md p-2" />
}

