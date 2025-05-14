export function Loader() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-20 h-20 border-4 border-t-transparent border-r-green-500 border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute top-4 left-4 w-16 h-16 border-4 border-t-transparent border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin-slower"></div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-500 mb-2">Initializing</h2>
        <p className="text-green-600">Loading Server Control Center...</p>
      </div>
    </div>
  )
}
