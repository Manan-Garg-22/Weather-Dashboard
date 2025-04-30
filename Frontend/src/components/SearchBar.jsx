"use client"

import { useState } from "react"
import { useWeather } from "../context/WeatherContext"

export default function SearchBar() {
  const [city, setCity] = useState("")
  const { searchCity } = useWeather()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      searchCity(city.trim())
    }
  }

  return (
    <div className="bg-white rounded-2xl dark:bg-gray-800 shadow-md p-4 transition-colors duration-500">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Search for a city</h2>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-2xl dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          aria-label="City name"
        />
        <button
          type="submit"
          className="bg-blue-600 rounded-r-2xl hover:bg-blue-800 text-white px-3 py-2 transition-colors flex items-center justify-center"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  )
}
