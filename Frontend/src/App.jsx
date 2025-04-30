import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import RecentSearches from "./components/RecentSearches"
import UnitToggle from "./components/UnitToggle"
import ThemeToggle from "./components/ThemeToggle"
import { WeatherProvider } from "./context/WeatherContext"

function App() {
  return (
    <WeatherProvider>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-500 ease-in-out">
        <div className="max-w-4xl mx-auto">

          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-700 dark:text-blue-300">
            Weather Dashboard
          </h1>

          <div className="flex flex-col md:flex-row gap-6 transition-colors duration-500 ease-in-out">
            <div className="w-full md:w-1/3 space-y-6">
              <SearchBar />
              <UnitToggle />
              <RecentSearches />
            </div>

            <div className="w-full md:w-2/3 transition-colors duration-500 ease-in-out">
              <WeatherCard />
            </div>
          </div>
        </div>
      </main>
    </WeatherProvider>
  )
}

export default App
