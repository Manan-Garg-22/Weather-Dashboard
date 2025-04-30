export default function LoadingIndicator() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-gray-600 dark:text-gray-300">Loading weather data...</span>
    </div>
  )
}
