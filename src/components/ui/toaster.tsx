"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast } from "@/components/ui/toast"
import { AnimatePresence } from "framer-motion"

export function Toaster() {
  const { message, type, isOpen, hideToast } = useToast()

  return (
    <AnimatePresence>
      {isOpen && (
        <Toast
          message={message}
          type={type}
          onClose={hideToast}
        />
      )}
    </AnimatePresence>
  )
}