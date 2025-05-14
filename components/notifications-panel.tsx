"use client"

import { motion } from "framer-motion"
import { useSystem } from "./system-context"
import { X, AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"

export default function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const { notifications, dismissNotification } = useSystem()

  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="absolute top-0 right-0 w-80 h-full bg-gray-900 border-l border-green-900/30 z-10"
    >
      <div className="flex justify-between items-center p-4 border-b border-green-900/30">
        <h2 className="text-green-500 font-bold">Notifications</h2>
        <button onClick={onClose} className="text-green-600 hover:text-green-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-full">
        {notifications.length === 0 ? (
          <div className="text-center text-green-600 py-8">No notifications</div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 border border-green-900/30 rounded-md p-3 relative"
              >
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="absolute top-2 right-2 text-green-600 hover:text-green-500"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <p className="text-green-400 text-sm">{notification.message}</p>
                    <p className="text-green-600 text-xs mt-1">{formatTime(notification.timestamp)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
