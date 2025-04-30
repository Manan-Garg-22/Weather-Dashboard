"use client"

import { useWeather } from "../context/WeatherContext"

export default function UnitToggle() {
  const { isCelsius, toggleUnit } = useWeather()

  return (
    <div className="bg-white rounded-2xl dark:bg-gray-800 shadow-md p-4 transition-colors duration-500">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Temperature Unit</h2>
      <div className="flex items-center">
        <span
          className={`mr-2 ${isCelsius ? "font-bold text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          Celsius (°C)
        </span>
        <button
          onClick={toggleUnit}
          className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{ backgroundColor: isCelsius ? "#cbd5e1" : "#3b82f6" }}
          aria-pressed={!isCelsius}
        >
          <span
            className={`${
              isCelsius ? "translate-x-1" : "translate-x-6"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </button>
        <span
          className={`ml-2 ${!isCelsius ? "font-bold text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          Fahrenheit (°F)
        </span>
      </div>
    </div>
  )
}
