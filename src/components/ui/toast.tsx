"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  type?: "default" | "success" | "error"
  onClose?: () => void
}

export function Toast({ message, type = "default", onClose }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg",
        type === "success" && "bg-green-500 text-white",
        type === "error" && "bg-red-500 text-white",
        type === "default" && "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
      )}
    >
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2">
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  )
}