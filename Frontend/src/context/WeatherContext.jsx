"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define the context
const WeatherContext = createContext(undefined)

export function WeatherProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recentSearches, setRecentSearches] = useState([])
  const [isCelsius, setIsCelsius] = useState(true)

  // Load recent searches from localStorage on initial render
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  }, [recentSearches])

  const searchCity = async (city) => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch weather data")
      }

      const data = await response.json()
      setWeatherData(data)

      // Add to recent searches if not already present
      if (!recentSearches.includes(city)) {
        const updatedSearches = [city, ...recentSearches].slice(0, 5)
        setRecentSearches(updatedSearches)
      }
    } catch (err) {
      setError(err.message || "Failed to fetch weather data")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const toggleUnit = () => {
    setIsCelsius(!isCelsius)
  }

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        searchCity,
        recentSearches,
        isCelsius,
        toggleUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}
