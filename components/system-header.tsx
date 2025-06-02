"use client"

import { useState, useEffect } from "react"
import { Bell, Clock, Wifi, WifiOff } from "lucide-react"

export default function SystemHeader() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      clearInterval(timer)
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])

  const formattedTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
  const formattedDate = currentTime.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })

  return (
    <header className="bg-gray-900 border-b border-green-900/30 p-2 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-green-500 font-bold text-lg mr-4">SERVER CONTROL CENTER</div>
        <div className="text-green-600 text-xs hidden md:block">v1.0.0</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center text-green-500">
          {isOnline ? <Wifi className="w-4 h-4 mr-1" /> : <WifiOff className="w-4 h-4 mr-1" />}
          <span className="text-xs">{isOnline ? "ONLINE" : "OFFLINE"}</span>
        </div>

        <div className="flex items-center text-green-500">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-xs">{formattedTime}</span>
        </div>

        <div className="text-green-600 text-xs hidden md:block">{formattedDate}</div>

        <button
          // onClick={onNotificationsClick} // Functionality removed
          className="relative text-green-500 hover:text-green-400 transition-colors cursor-default" // Made cursor default
        >
          <Bell className="w-5 h-5" />
          {/* {notificationCount > 0 && ( // Functionality removed
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )} */}
        </button>
      </div>
    </header>
  )
}
