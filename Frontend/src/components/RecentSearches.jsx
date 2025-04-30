import { useWeather } from "../context/WeatherContext"

export default function RecentSearches() {
  const { recentSearches, searchCity } = useWeather()

  if (recentSearches.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl dark:bg-gray-800 shadow-md p-4 transition-colors duration-500">
      <div className="flex items-center mb-3">
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
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recent Searches</h2>
      </div>
      <ul className="space-y-2">
        {recentSearches.map((city) => (
          <li key={city} className="flex items-center">
            <button
              onClick={() => searchCity(city)}
              className="flex-1 text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
