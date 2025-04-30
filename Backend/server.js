const express = require("express")
const axios = require("axios")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())

// API key from environment variables
const API_KEY = process.env.OPENWEATHER_API_KEY

// Weather API endpoint
app.get("/api/weather", async (req, res) => {
  try {
    const { city } = req.query

    if (!city) {
      return res.status(400).json({ message: "City parameter is required" })
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"f44b005206059fcb2199a1e3fb0d5998"}&units=metric`,
    )

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      main: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      feelsLike: response.data.main.feels_like,
      pressure: response.data.main.pressure,
    }

    res.json(weatherData)
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message)

    if (error.response?.status === 404) {
      return res.status(404).json({ message: "City not found. Please check the spelling and try again." })
    }

    res.status(500).json({ message: "Failed to fetch weather data" })
  }
})

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../Frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/build", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
