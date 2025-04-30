import { useWeather } from "../context/WeatherContext"
import LoadingIndicator from "./LoadingIndicator"
import ErrorMessage from "./ErrorMessage"

import rainVideo from "../assets/videos/rain.mp4"
import stormVideo from "../assets/videos/storm.mp4"
import snowVideo from "../assets/videos/snow.mp4"
import atmosphereVideo from "../assets/videos/atmosphere.mp4"
import clearVideo from "../assets/videos/clear.mp4"
import cloudyVideo from "../assets/videos/cloudy.mp4"
import drizzleVideo from "../assets/videos/drizzle.mp4"

export default function WeatherCard() {
  const { weatherData, loading, error, isCelsius } = useWeather()

  if (loading) { return <LoadingIndicator /> }
  if (error) { return <ErrorMessage message={error} /> }
  if (!weatherData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-colors duration-500">
        <p className="text-gray-600 dark:text-gray-300">Search for a city to see the weather information</p>
      </div>
    )
  }
  
  const getWeatherVideo = (main) => {
    switch (main) {
      case "Thunderstorm":
        return stormVideo
      case "Drizzle":
        return drizzleVideo
      case "Rain":
        return rainVideo
      case "Snow":
        return snowVideo
      case "Atmosphere":
        return atmosphereVideo // mist, fog, etc.
      case "Clear":
        return clearVideo
      case "Clouds":
        return cloudyVideo
      default:
        return clearVideo
    }
  }
  // Convert temperature if needed
  const displayTemp = isCelsius ? weatherData.temperature : (weatherData.temperature * 9) / 5 + 32
  const displayFeelsLike = isCelsius ? weatherData.feelsLike : (weatherData.feelsLike * 9) / 5 + 32
  const unitSymbol = isCelsius ? "°C" : "°F"

  return (
    <div className="relative bg-white rounded-2xl dark:bg-gray-800 shadow-md overflow-hidden transition-colors duration-500">
      <div className="relative h-auto">
      <video className="absolute top-0 left-0 w-full h-full object-cover" src={getWeatherVideo(weatherData.main)} autoPlay loop muted playsInline/>
      <div className="relative z-10  text-white transition-colors duration-500">
        <div className="flex justify-between items-center pl-5 pt-3 pb-5">
          <div>
            <h2 className="text-2xl font-bold">
              {weatherData.city}, {weatherData.country}
            </h2>
            <p className="text-lg capitalize">{weatherData.description}</p>
          </div>
          <div className="text-center">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.description}
              className="w-20 h-20"
            />
          </div>
        </div>
        <div className="mt-4 pl-5 pb-5">
          <div className="text-5xl font-bold">
            {Math.round(displayTemp)}
            {unitSymbol}
          </div>
          <div className="text-sm mt-1">
            Feels like: {Math.round(displayFeelsLike)}
            {unitSymbol}
          </div>
        </div>
      </div>
      </div>
      <div className=" relative p-6 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
          </svg>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{weatherData.windSpeed} m/s</p>
          </div>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v6m0 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 9c-3 0-6-3-6-3s3-3 6-3 6 3 6 3-3 3-6 3zm0 0v6"></path>
          </svg>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{weatherData.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
          </svg>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {Math.round(displayTemp)}
              {unitSymbol}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{weatherData.pressure} hPa</p>
          </div>
        </div>
      </div>

    </div>
  )
}
